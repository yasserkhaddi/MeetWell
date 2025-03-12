const pm2 = require("pm2");

pm2.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  // Users Service
  pm2.start(
    {
      name: "Users-service",
      script: "./Services/UserService/app.js",
      watch: true,
    },
    (err, apps) => {
      if (err) {
        console.error("Error starting Users Service:", err);
      } else {
        console.log("Users Service is running");
      }
    }
  );

  // Appointments Service
  pm2.start(
    {
      name: "Appointments-service",
      script: "./Services/appointmentService/app.js",
      watch: true,
    },
    (err, apps) => {
      if (err) {
        console.error("Error starting Appointments Service:", err);
      } else {
        console.log("Appointments Service is running");
      }
    }
  );

  //Admin Service
  pm2.start(
    {
      name: "Admin-service",
      script: "./Services/AdminService/app.js",
      watch: true,
    },
    (err, apps) => {
      if (err) {
        console.error("Error starting Admin Service:", err);
      } else {
        console.log("Admin Service is running");
      }
    }
  );
});
