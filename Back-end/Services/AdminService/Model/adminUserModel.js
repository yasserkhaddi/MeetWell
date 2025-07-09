const { users } = require("../../../config/db");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const moment = require("moment");

class AdminUserModel {
  //fecth all users
  async fetchUsers() {
    try {
      const allUsers = await users.find({ isAdmin: false }).toArray();
      if (allUsers.length === 0) {
        return { status: 404, message: "Aucun utilisateur trouvé " };
      } else {
        return {
          status: 200,
          message: "Utilisateurs :",
          allUsers,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  //------------------------------------------------------------------------------------------

  async editUser(userId, userInfo) {
    const { email, nom, prenom, dateDeNaissance, PhoneNumber } = userInfo;
    try {
      const user = await users.findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return { status: 400, message: "Utilisateur non trouvé" };
      } else {
        const updateUser = {};

        if (nom) updateUser.nom = nom;
        if (prenom) updateUser.prenom = prenom;
        if (email) updateUser.email = email;
        if (dateDeNaissance) updateUser.dateDeNaissance = dateDeNaissance;
        if (PhoneNumber) updateUser.PhoneNumber = PhoneNumber;
        await users.updateOne(
          { _id: new ObjectId(userId) },
          { $set: updateUser }
        );
        return { status: 200, message: "Modification validée" };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error" };
    }
  }

  //------------------------------------------------------------------------------------------

  async deleteUser(userId) {
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

  async addUserPhoneNubmer(userId, userPhone) {
    try {
      const findUser = await users.findOne({ _id: new ObjectId(userId) });
      if (!findUser) {
        return { status: 401, message: "Utilisateur ne correspond pas" };
      } else {
        await users.updateOne(
          { _id: new ObjectId(userId) },
          { $set: userPhone }
        );
        return {
          status: 200,
          message: "Phone number added successfully",
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error", valid: false };
    }
  }

  //------------------------------------------------------------------------------------------

  async AddUser(userInfo) {
    const { email, password, nom, prenom, dateDeNaissance } = userInfo;
    try {
      //find email
      const existingEmail = await users.findOne({ email: email });

      if (existingEmail) {
        return { status: 400, message: "utilisateur déja exist" };
      } else {
        // crypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
          email,
          nom,
          prenom,
          dateDeNaissance,
          password: hashedPassword,
          isVerified: false,
          isAdmin: false,
          isUser: true,
          isSpammed: false,
          created_at: moment().format("YYYY-MM-DD / HH:mm:ss"),
        };
        await users.insertOne(newUser);
        return { status: 201, message: "Utilisateur crées avec succès" };
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  //------------------------------------------------------------------------------------------

  async fetchAllUSer() {
    try {
      const user = await users.find().sort({ isAdmin: 1 }).toArray();
      return { status: 200, message: "utilidateurs trouvé", users: user };
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error" };
    }
  }
  //------------------------------------------------------------------------------------------

  async editPassword(userId, password) {
    try {
      if (!ObjectId.isValid(userId)) {
        return { status: 400, message: "Invalid user ID format" };
      }

      const userObjectId = new ObjectId(userId);
      const findUser = await users.findOne({ _id: userObjectId });

      if (!findUser) {
        return { status: 404, message: "Utilisateur non trouvé" };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await users.updateOne(
        { _id: userObjectId },
        { $set: { password: hashedPassword } }
      );

      return { status: 200, message: "Mot de passe mis à jour avec succès" };
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Erreur interne du serveur" };
    }
  }
}

module.exports = AdminUserModel;
