const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String },
  time_start: { type: Date },
  time_end: { type: Date },
  note: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  steps: [
    {
      id: { type: String },
      task: { type: String },
      status: { type: String, default: "" },
      order: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Task", TaskSchema);
