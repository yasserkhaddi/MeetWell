const router = require("./Routes/appointmentRoutes");
const app = require("../../config/server");

app.use("/appoint", router);

const port = 8080;

app.listen(port, () => {
  console.log(`server connected successfuly on ${port}`);
});
