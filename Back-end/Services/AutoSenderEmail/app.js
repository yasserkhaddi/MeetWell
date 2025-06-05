const app = require("../../config/server");
require("dotenv").config();
const cronJob = require("./confirmationEmail.js");

const AUTO_SENDER_PORT = process.env.AUTO_SENDER_PORT;

const port = AUTO_SENDER_PORT || 7070;

app.listen(port, "0.0.0.0", () => {
  console.log(`server connected successfuly on ${port}`);
});

cronJob.start();
