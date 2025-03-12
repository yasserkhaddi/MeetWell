const router = require("./Routes/userRoutes");
const app = require("./config/server");
require("dotenv").config();

app.use("/user", router);

const USER_PORT = process.env.USER_PORT;

const port = USER_PORT || 5050;

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
