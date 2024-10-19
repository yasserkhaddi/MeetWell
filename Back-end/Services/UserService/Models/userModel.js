const { users } = require("../../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      throw new Error("Internal server error");
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
      throw new Error("Internal server error");
    }
  }
}

module.exports = UserModel;
