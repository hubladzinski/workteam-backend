var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");

router.get("/:id", user_controller.get_user);

router.get("/", user_controller.get_users);

router.get("/tasks/:id", user_controller.get_user_tasks);

router.put("/", user_controller.put_user);

module.exports = router;
