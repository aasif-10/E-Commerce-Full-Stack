const mongoose = require("mongoose");
const envConfig = require("./env-config");

mongoose
  .connect(`${envConfig.MONGODB_URI}`)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error connecting database");
    process.exit(1);
  });
