const pm2 = require("pm2");

pm2.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  const services = [
    {
      name: "Users-service",
      script: "./Services/UserService/app.js",
      watch: true,
    },
    {
      name: "Appointments-service",
      script: "./Services/appointmentService/app.js",
      watch: true,
    },
    {
      name: "Admin-service",
      script: "./Services/AdminService/app.js",
      watch: true,
    },
  ];

  services.forEach((service) => {
    pm2.start(service, (err) => {
      if (err) {
        console.error(`Error starting ${service.name}:`, err);
      } else {
        console.log(`${service.name} is running`);
      }
    });
  });

  // Graceful shutdown on Ctrl+C
  process.on("SIGINT", () => {
    console.log("\nStopping all PM2 services...");
    pm2.stop("all", (err) => {
      if (err) {
        console.error("Error stopping services:", err);
      } else {
        console.log("All services stopped.");
        pm2.disconnect();
        process.exit(0);
      }
    });
  });
});
