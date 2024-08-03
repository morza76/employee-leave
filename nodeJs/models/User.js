const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minLength: 3 },
  name: { type: String, required: true, unique: true, minLength: 3 },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  personnelId: { type: Number, required: true, default: null },
  position: { type: String, required: true, default: null },
  roles: { type: Object , default: {'User' : 1000} },
  refreshToken: [String],
});

module.exports = mongoose.model("User", userSchema);
