const { users, days, daysOffArchive } = require("../../../config/db");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");

class AdminModel {
  async verifyAdminPassword(userInfo) {
    try {
      if (!ObjectId.isValid(userInfo._id)) {
        return { status: 400, message: "Invalid user ID format", valid: false };
      }

      const user = await users.findOne({ _id: new ObjectId(userInfo._id) });
      if (!user) {
        return { status: 404, message: "User not found", valid: false };
      }

      const result = await bcrypt.compare(userInfo.password, user.password);

      if (!result) {
        return {
          status: 401,
          message: "Mot de passe ne correspond pas",
          valid: false,
        };
      } else {
        return {
          status: 200,
          message: "Le mot de passe correspond",
          valid: true,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error", valid: false };
    }
  }

  //------------------------------------------------------------------------------------------

  async changeAdminPassword(userId, password) {
    try {
      const findUser = await users.findOne({ _id: new ObjectId(userId) });
      if (!findUser) {
        return { status: 401, message: "Utilisateur ne correspond pas" };
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await users.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { password: hashedPassword } }
        );
        return {
          status: 200,
          message: "Password updates successfully",
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error", valid: false };
    }
  }

  //------------------------------------------------------------------------------------------

  async deleteAccount(userId) {
    try {
      const user = await users.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return { status: 401, message: "Utilisateur ne correspond pas" };
      } else {
        await users.deleteOne({ _id: new ObjectId(userId) });
        return {
          status: 200,
          message: "account deleted successfully",
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error", valid: false };
    }
  }

  //------------------------------------------------------------------------------------------

  async addDisabledDate(dateInfo) {
    const { date, description } = dateInfo;
    try {
      const existingDate = await days.findOne({ date: date });
      if (existingDate) {
        return {
          status: 400,
          message: "This date is already disabled.",
        };
      }

      const newDateOff = {
        date,
        description,
        timeSaved: new Date().toISOString().slice(0, 16).replace("T", " "),
      };
      const result = await days.insertOne(newDateOff);

      if (!result.acknowledged) {
        return { status: 500, message: "Failed to add the disabled date." };
      }

      return {
        status: 200,
        message: "Day-off added successfully.",
      };
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error" };
    }
  }

  //------------------------------------------------------------------------------------------

  async addDisabledDatesRange({ startDate, endDate, description }) {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        return { status: 400, message: "Start date must be before end date." };
      }

      const disabledDates = [];
      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        const isoDate = date.toISOString().slice(0, 10);

        const exists = await days.findOne({ date: isoDate });
        if (!exists) {
          disabledDates.push({
            date: isoDate,
            description,
            timeSaved: new Date().toISOString().slice(0, 16).replace("T", " "),
          });
        }
      }

      if (disabledDates.length === 0) {
        return {
          status: 400,
          message: "All dates in the range are already disabled.",
        };
      }

      const result = await days.insertMany(disabledDates);
      if (!result.acknowledged) {
        return { status: 500, message: "Failed to add disabled dates." };
      }

      return {
        status: 200,
        message: `${result.insertedCount} day(s) off added successfully.`,
      };
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error" };
    }
  }

  //------------------------------------------------------------------------------------------

  async removeDisabledDate(date) {
    try {
      const existingDate = await days.findOne({ date });
      if (!existingDate) {
        return {
          status: 400,
          message: "This date is not disabled.",
        };
      }

      const result = await days.deleteOne({ date });

      if (!result.acknowledged) {
        return { status: 500, message: "Failed to remove the disabled date." };
      }

      return {
        status: 200,
        message: "Date enabled successfully.",
      };
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error" };
    }
  }

  //------------------------------------------------------------------------------------------

  async moveExpiredDays() {
    try {
      const currentDate = new Date().toISOString().slice(0, 10);

      const expiredDays = await days
        .find({ date: { $lt: currentDate } })
        .toArray();

      if (expiredDays.length > 0) {
        await daysOffArchive.insertMany(expiredDays);

        await days.deleteMany({ date: { $lt: currentDate } });

        return {
          status: 200,
          success: true,
          message: `${expiredDays.length} day(s) moved to expiredDays`,
        };
      } else {
        return {
          status: 200,
          success: true,
          message: "No expired days to move",
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, success: false, message: err.message };
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchExpiredDaysOff() {
    try {
      const expiredDaysOff = await daysOffArchive.find().toArray();
      if (expiredDaysOff.length === 0) {
        return {
          status: 404,
          message: "Aucun congé trouvé dans les archives ",
        };
      } else {
        return {
          status: 200,
          message: "Congés trouvés dans les archives:",
          expiredDaysOff,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, success: false, message: err.message };
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchDates() {
    try {
      const day = await days.find().sort({ date: -1 }).toArray();
      if (day.length === 0) {
        return { status: 404, message: "Aucun conjé trouvé " };
      } else {
        return {
          status: 200,
          message: "conjé trouvé:",
          day,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  //------------------------------------------------------------------------------------------

  async upgradeToAdmin(currentUserId, targetUserId) {
    try {
      // Check if the user performing the upgrade is an admin
      const currentUser = await users.findOne({
        _id: new ObjectId(currentUserId),
      });

      if (!currentUser || currentUser.role !== "admin") {
        return {
          status: 403,
          message:
            "Accès refusé : seul un administrateur peut effectuer cette opération.",
        };
      }

      // Check if the target user exists
      const targetUser = await users.findOne({
        _id: new ObjectId(targetUserId),
      });

      if (!targetUser) {
        return {
          status: 400,
          message: "Utilisateur à mettre à jour non trouvé",
        };
      }

      await users.updateOne(
        { _id: new ObjectId(targetUserId) },
        { $set: { isAdmin: true, role: "manager" } }
      );

      return { status: 200, message: "Modification validée" };
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Erreur interne du serveur" };
    }
  }

  //------------------------------------------------------------------------------------------

  async downgradeToUser(userId) {
    try {
      const user = await users.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return { status: 400, message: "Utilisateur non trouvé" };
      }

      if (user.role === "admin") {
        return {
          status: 403,
          message: "le gestionnaire ne peut pas modifier l'administrateur",
        };
      }

      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { isAdmin: false, role: "user" } }
      );

      return { status: 200, message: "Modification validée" };
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Erreur interne du serveur" };
    }
  }
}

module.exports = AdminModel;
