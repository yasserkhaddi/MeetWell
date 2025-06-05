const cron = require("node-cron");
const AppointmentModel = require("../appointmentService/Models/appointmentModel");

const appoint = new AppointmentModel();

function start() {
  cron.schedule("* * * * *", async () => {
    console.log("⏰ Running reminder job...");
    await appoint.sendMessage();
  });
}

module.exports = { start };
