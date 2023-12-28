const app = require("./app");
const mongoose = require("mongoose");

const { PORT = 3030 } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
