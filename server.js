const app = require("./app");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_HOST)
  .then(() =>
    app.listen(3002, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
