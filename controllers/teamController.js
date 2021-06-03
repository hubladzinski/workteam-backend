const Team = require("../models/team");
const passport = require("passport");
require("../src/passport");

exports.get_teams = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let teams_list = await Team.find().exec();
      res.send(teams_list);
    } catch (err) {
      return next(err);
    }
  },
];

exports.get_team = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let team = await Team.find({ id: req.body.id }).exec();
      res.send(team);
    } catch (err) {
      return next(err);
    }
  },
];
