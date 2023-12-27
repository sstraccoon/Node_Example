const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  age: {
    type: Number,
    require: true,
  },
  married: {
    type: Boolean,
    require: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
