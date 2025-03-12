const router = require("./Routes/adminRoutes");
const app = require("./config/server");
require("dotenv").config();

app.use("/admin", router);
const ADMIN_PORT = process.env.ADMIN_PORT;
const port = ADMIN_PORT || 6060;

app.listen(port, () => {
  console.log(`server connected successfuly on ${port}`);
});
