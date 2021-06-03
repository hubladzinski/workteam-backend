const User = require("../models/user");
const passport = require("passport");
require("../src/passport");

exports.get_users = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let users_list = await User.find().exec();
      res.send(users_list);
    } catch (err) {
      return next(err);
    }
  },
];

exports.get_user = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let user = await User.findOne({ _id: req.params.id }).exec();
      res.send(user);
    } catch (err) {
      return next(err);
    }
  },
];

exports.get_user_tasks = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let user = await User.findOne({ _id: req.params.id })
        .populate("tasks")
        .exec();
      res.send(user.tasks);
    } catch (err) {
      return next(err);
    }
  },
];

exports.put_user = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let updatedUser;
      if (req.body.picture != null) {
        updatedUser = await User.updateOne(
          { _id: req.body._id },
          {
            $set: {
              name: req.body.name,
              tel: req.body.tel,
              picture: req.body.picture,
            },
          }
        );
      } else {
        updatedUser = await User.updateOne(
          { _id: req.body._id },
          {
            $set: {
              name: req.body.name,
              tel: req.body.tel,
            },
          }
        );
      }
      res.send({ response: "User info updated", user: updatedUser });
    } catch (err) {
      return next(err);
    }
  },
];
