const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

// Setting up Database
const DB = process.env.DB.replace("<password>", process.env.PASSWORD_DB);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection successful");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
