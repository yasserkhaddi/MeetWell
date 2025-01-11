const users = require("../../../config/db");

class AdminModel {
  //fecth all users
  async fetchUsers() {
    try {
      const allUsers = await users.find().toArray();
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
}
