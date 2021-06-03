const Inventory = require("../models/inventory");
const User = require("../models/user");
const passport = require("passport");
require("../src/passport");

exports.get_inventory = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let inventory = await Inventory.find().exec();
      res.send(inventory);
    } catch (err) {
      return next(err);
    }
  },
];

exports.get_item = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let inventory = await Inventory.find({ id: req.params.id }).exec();
      res.send(inventory);
    } catch (err) {
      return next(err);
    }
  },
];

exports.post_inventory = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    if ((await Inventory.findOne({ title: req.body.name }).exec()) != null) {
      res.status(400).json({
        response: "Such item already exists",
      });
    } else {
      try {
        let inventory = new Inventory({
          name: req.body.name,
          stock: req.body.stock,
          price: req.body.price,
          date: req.body.date,
        });

        let saveInventory = await inventory.save();

        res.status(200).json({
          response: "Item saved sucessfully",
          inventory: saveInventory,
        });
      } catch (err) {
        return next(err);
      }
    }
  },
];

exports.put_inventory = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const inventory = await Inventory.findOne({ name: req.body.name }).exec();
    if (inventory != null && inventory._id != req.body._id) {
      res.status(400).json({
        response: "Such item already exists",
      });
    } else {
      try {
        let updatedInventory;
        if (req.body.picture != null) {
          updatedInventory = await Inventory.updateOne(
            { _id: req.body._id },
            {
              $set: {
                name: req.body.name,
                picture: req.body.picture,
                stock: req.body.stock,
                price: req.body.price,
              },
            }
          );
        } else {
          updatedInventory = await Inventory.updateOne(
            { _id: req.body._id },
            {
              $set: {
                name: req.body.name,
                stock: req.body.stock,
                price: req.body.price,
              },
            }
          );
        }
        res.send({ response: "Item updated", inventory: updatedInventory });
      } catch (err) {
        return next(err);
      }
    }
  },
];

exports.delete_inventory = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let user = await User.findOne({ _id: req.body._id }).exec();
      if (user.admin) {
        let inventory = await Inventory.deleteOne({
          _id: req.params.id,
        }).exec();
        res.send({ response: "Item deleted", inventory });
      } else {
        res.send({
          response: "User without admin permissions",
          admin: user.admin,
        });
      }
    } catch (err) {
      return next(err);
    }
  },
];
