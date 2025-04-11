const router = require("./Routes/userRoutes");
const app = require("../../config/server");
require("dotenv").config();

app.use("/user", router);

const USER_PORT = process.env.USER_PORT;

const port = USER_PORT || 5050;

app.listen(port, "0.0.0.0", () => {
  console.log(`server connected successfuly on ${port}`);
});
