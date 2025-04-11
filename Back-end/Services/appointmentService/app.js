const router = require("./Routes/appointmentRoutes");
const app = require("../../config/server");
require("dotenv").config();

app.use("/appoint", router);

const APPOINT_PORT = process.env.APPOINT_PORT;

const port = APPOINT_PORT || 8080;

app.listen(port, "0.0.0.0", () => {
  console.log(`server connected successfuly on ${port}`);
});
