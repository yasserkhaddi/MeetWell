const { users } = require("../../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const moment = require("moment");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const SECRET_CODE = process.env.SECRET_CODE;
const FRONT_URL = process.env.FRONT_URL;

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
          isVerified: false,
          isAdmin: false,
          isUser: true,
          role: "user",
          isSpammed: false,
          created_at: moment().format("YYYY-MM-DD / HH:mm:ss"),
        };
        //create new user
        await users.insertOne(newUser);

        //send email
        const token = jwt.sign({ id: newUser._id }, SECRET_CODE, {
          expiresIn: "15m",
        });

        const link = `${FRONT_URL}/email-verification?token=${token}`;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD,
          },
        });

        const templtepath = path.join(
          __dirname,
          "../Utils/templates_html/emailVerification.html"
        );
        let htmlTemplate = fs.readFileSync(templtepath, "utf-8");

        htmlTemplate = htmlTemplate
          .replace(/{{LINK}}/g, link)
          .replace(/{{NOM}}/g, newUser.nom)
          .replace(/{{PRENOM}}/g, newUser.prenom);

        await transporter.sendMail({
          from: '"APPTIQ Support" <support@apptiq.com>',
          to: email,
          subject: "Vérifiez votre adresse email",
          html: htmlTemplate,
        });

        return { status: 201, message: "Utilisateur crées avec succès" };
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  async sendVerificationLink(email) {
    try {
      const user = await users.findOne({ email: email });
      if (!user) {
        return { status: 404, message: "Utilisateur introuvable" };
      }
      const token = jwt.sign({ id: user._id }, SECRET_CODE, {
        expiresIn: "15m",
      });

      const link = `${FRONT_URL}/email-verification?token=${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.GOOGLE_APP_PASSWORD,
        },
      });

      const templtepath = path.join(
        __dirname,
        "../Utils/templates_html/emailVerification.html"
      );
      let htmlTemplate = fs.readFileSync(templtepath, "utf-8");

      htmlTemplate = htmlTemplate
        .replace(/{{LINK}}/g, link)
        .replace(/{{NOM}}/g, user.nom)
        .replace(/{{PRENOM}}/g, user.prenom);

      await transporter.sendMail({
        from: '"APPTIQ Support" <support@apptiq.com>',
        to: email,
        subject: "Vérifiez votre adresse email",
        html: htmlTemplate,
      });
      return {
        status: 200,
        success: true,
        message: "Lien de vérification envoyé avec succès",
      };
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  //email verificatio decodage logic

  async emailVerification(token) {
    if (!token) return res.status(400).json({ message: "Token manquant" });
    try {
      const decoded = jwt.verify(token, SECRET_CODE);

      const user = await users.findOne({ _id: new ObjectId(decoded.id) });
      console.log(user);

      if (!user) {
        return { status: 404, message: "Invalid token" };
      } else {
        const test = await users.updateOne(
          { _id: new ObjectId(decoded.id) },
          { $set: { isVerified: true } }
        );
        const token2 = jwt.sign({ id: user._id }, SECRET_CODE);
        console.log(test);

        return {
          status: 201,
          message: "Se connecter avec succès",
          token2,
          user: {
            ...user,
            isAdmin: user.isAdmin,
            isVerified: true,
          },
          valid: true,
        };
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
      // Find user by email
      const existingUser = await users.findOne({ email: email });
      if (!existingUser) {
        return {
          status: 401,
          message: "Utilisateur n'existe pas",
          valid: false,
        };
      } else {
        // Validate password
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
          // Create JWT token
          const token = jwt.sign({ id: existingUser._id }, SECRET_CODE);

          return {
            status: 201,
            message: "Se connecter avec succès",
            token,
            user: {
              ...existingUser,
              isAdmin: existingUser.isAdmin,
              isVerified: existingUser.isVerified,
            },
            valid: true,
          };
        }
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  // google auth

  async google(userInfo) {
    const { email, nom, prenom, dateDeNaissance } = userInfo;

    try {
      const existingUser = await users.findOne({ email: email });

      if (existingUser) {
        const token = jwt.sign({ id: existingUser._id }, SECRET_CODE);

        return {
          status: 201,
          message: "Se connecter avec succès",
          token,
          user: {
            ...existingUser,
            isAdmin: existingUser.isAdmin,
            isVerified: existingUser.isVerified,
          },
          valid: true,
        };
      } else {
        const newUser = {
          email,
          nom,
          prenom,
          dateDeNaissance,
          isVerified: true,
          isAdmin: false,
          isUser: true,
          role: "user",
          isSpammed: false,
          created_at: moment().format("YYYY-MM-DD / HH:mm:ss"),
        };
        //create new user
        await users.insertOne(newUser);

        const token = jwt.sign({ id: existingUser._id }, SECRET_CODE);

        return {
          status: 201,
          message_one: "Utilisateur crées avec succès",
          message: "Se connecter avec succès",
          token,
          user: {
            ...existingUser,
            isAdmin: existingUser.isAdmin,
          },
          valid: true,
          firstTime: true,
        };
      }
    } catch (err) {
      console.error(err);
      return { status: 400, success: false, message: err.message };
    }
  }

  //searching account
  async searchinAccount(email) {
    try {
      const user = await users.findOne({ email: email });
      if (!user) {
        return {
          status: 401,
          message: "No user found",
        };
      } else {
        return { status: 201, message: "User found", user: { ...user } };
      }
    } catch (error) {
      console.error(error);
      return { status: 400, success: false, message: err.message };
    }
  }

  // //generate email to send
  async generateEmail(email) {
    try {
      const user = await users.findOne({ email: email });

      if (!user) {
        return {
          status: 401,
          message: "No user found",
        };
      } else {
        const token = jwt.sign({ id: user._id }, SECRET_CODE, {
          expiresIn: "15m",
        });

        const link = `${FRONT_URL}/reset-password?token=${token}`;

        //sending email

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.GOOGLE_APP_PASSWORD,
          },
        });

        const templtepath = path.join(
          __dirname,
          "../utils/templates_html/passwordUpdate.html"
        );
        let htmlTemplate = fs.readFileSync(templtepath, "utf-8");

        htmlTemplate = htmlTemplate
          .replace(/{{LINK}}/g, link)
          .replace(/{{NOM}}/g, user.nom)
          .replace(/{{PRENOM}}/g, user.prenom);

        await transporter.sendMail({
          from: '"APPTIQ Support" <support@apptiq.com>',
          to: email,
          subject: "Réinitialisation du mot de passe",
          html: htmlTemplate,
        });
        return { status: 201, message: "reset link sent" };
      }
    } catch (error) {
      console.error(error);
      return { status: 400, success: false, message: error.message };
    }
  }
  // reset password
  async resetPassword(token, password) {
    try {
      const decoded = jwt.verify(token, SECRET_CODE);
      const user = await users.findOne({ _id: new ObjectId(decoded.id) });

      if (!user) {
        console.log("no User");

        return { status: 404, message: "Invalid token" };
      } else {
        console.log("success");

        const hashedPassword = await bcrypt.hash(password, 10);
        await users.updateOne(
          { _id: new ObjectId(decoded.id) },
          { $set: { password: hashedPassword } }
        );

        return { status: 200, message: "Password reset successfully" };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, message: "Internal server error" };
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
      return { status: 500, message: "Internal server error", valid: false };
    }
  }
  // change password
  async changePassword(userId, password) {
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
  // delete account
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
}

module.exports = UserModel;
