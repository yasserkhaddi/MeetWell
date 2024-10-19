const router = require("./Routes/userRoutes");
const app = require("../../config/server");

app.use("/user", router);

const port = 5050;

app.listen(port, () => {
  console.log(`server connected successfuly on ${port}`);
});
