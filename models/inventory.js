const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  name: { type: String },
  picture: { type: String },
  stock: { type: Number },
  price: { type: Number },
  date: { type: Date },
});

module.exports = mongoose.model("Inventory", InventorySchema);
