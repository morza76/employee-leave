const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  userId: { type: String, required: true },
  typeLeave: { type: String, required: true },
  typeRequest: { type: String, required: true },
  startedAt: { type: String, default: Date.now },
  expiredAt: { type: String, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  description: { type: String, required: true },
  status: { type: String, default: "pending" },
  file: { type: String },
});

module.exports = mongoose.model("Leave", leaveSchema);
