const mongoose = require("mongoose");
const config = require("../configs");
const uri = config.database.url;

exports.dbConnect = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("[V] Successfully connected to the database."))
    .catch((err) => {
      console.log("[X] Couldn't connect to the database!", err);
      process.exit();
    });
};
