const router = require("./Routes/appointmentRoutes");
const app = require("./config/server");
require("dotenv").config();

app.use("/appoint", router);

const APPOINT_PORT = process.env.APPOINT_PORT;

const port = APPOINT_PORT || 8080;

// const https = require("https");
// const fs = require("fs");
// const path = require("path");

// const options = {
//   key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
//   cert: fs.readFileSync(path.join(__dirname, "localhost-cert.pem")),
// };

// https.createServer(options, app).listen(port, "0.0.0.0", () => {
//   console.log(`server connected successfuly on ${port}`);
// });
app.listen(port, () => {
  console.log(`server connected successfuly on ${port}`);
});
