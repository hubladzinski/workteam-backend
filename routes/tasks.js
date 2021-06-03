var express = require("express");
var router = express.Router();

const tasks_controller = require("../controllers/taskController");

router.get("/", tasks_controller.get_tasks);

router.get("/:id", tasks_controller.get_task);

router.post("/", tasks_controller.post_task);

router.put("/", tasks_controller.put_task);

module.exports = router;
