require("dotenv").config();

const app = require("./src/app");
const envConfig = require("./src/config/env-config");

app.listen(envConfig.PORT, () => {
  console.log(`Server is running at ${envConfig.PORT}`);
});
