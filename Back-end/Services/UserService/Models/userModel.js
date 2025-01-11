const { users } = require("../../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

class UserModel {
  //registration
  async signUp(userInfo) {
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
        };
        //create new user
        await users.insertOne(newUser);
        return { status: 201, message: "Utilisateur crées avec succès" };
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  //login
  async logIn(userInfo) {
    const { email, password } = userInfo;
    try {
      //find email
      const existingUser = await users.findOne({ email: email });
      if (!existingUser) {
        return {
          status: 401,
          message: "Utilisateur n'exist pas",
          valid: false,
        };
      } else {
        const validPassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!validPassword) {
          return {
            status: 401,
            message: "Mot de passe incorrect",
            valid: false,
          };
        } else {
          const token = jwt.sign({ id: existingUser._id }, "yasserkhaddi2003");
          return {
            status: 201,
            message: "se connecter avec succès",
            token,
            user: existingUser,
            valid: true,
          };
        }
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }
  //edit user
  async edit(userId, userInfo) {
    const { email, nom, prenom, dateDeNaissance } = userInfo;
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
  //verify password

  async verifyPassword(userInfo) {
    try {
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
  //    Adding phone number
  async addPhoneNubmer(userId, userPhone) {
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
    }
  }
}

module.exports = UserModel;
