const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uid: { type: String },
  name: { type: String, default: "" },
  tel: { type: String, default: "" },
  email: { type: String, default: "" },
  picture: {
    type: String,
    default:
      "https://images.pexels.com/photos/7473931/pexels-photo-7473931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  admin: { type: Boolean, default: false },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task", default: [] }],
});

module.exports = mongoose.model("User", UserSchema);
