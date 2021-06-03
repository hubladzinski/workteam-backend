var express = require("express");
var router = express.Router();

const teams_controller = require("../controllers/teamController");

router.get("/", teams_controller.get_teams);

router.get("/team", teams_controller.get_team);

module.exports = router;
