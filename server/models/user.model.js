const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
