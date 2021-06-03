const Task = require("../models/task");
const User = require("../models/user");
const passport = require("passport");
require("../src/passport");

exports.get_tasks = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let tasks = await Inventory.find().exec();
      res.send(tasks);
    } catch (err) {
      return next(err);
    }
  },
];

exports.get_task = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let task = await Task.find({ id: req.params.id }).exec();
      res.send(task);
    } catch (err) {
      return next(err);
    }
  },
];

exports.post_task = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let task = new Task({
        title: req.body.title,
        time_start: req.body.time_start,
        time_end: req.body.time_end,
        note: req.body.note,
        users: req.body.users,
        steps: req.body.steps,
      });

      let saveTask = await task.save();

      req.body.users.forEach(async (user_id) => {
        await User.updateOne(
          { _id: user_id },
          { $push: { tasks: saveTask._id } }
        );
      });

      res.status(200).json({
        response: "Task saved sucessfully",
        task: saveTask,
      });
    } catch (err) {
      return next(err);
    }
  },
];

exports.put_task = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const updatedTask = await Task.updateOne(
        { _id: req.body._id },
        {
          $set: {
            steps: req.body.steps,
          },
        }
      );
      res.send({ response: "Task updated", task: updatedTask });
    } catch (err) {
      return next(err);
    }
  },
];
