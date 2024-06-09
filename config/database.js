const mongoose = require("mongoose");

const configureDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/ecommerce-backend")
    .then((res) => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = configureDb;
