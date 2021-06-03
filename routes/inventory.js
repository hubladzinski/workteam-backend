var express = require("express");
var router = express.Router();

const inventory_controller = require("../controllers/inventoryController");

router.get("/", inventory_controller.get_inventory);

router.get("/item", inventory_controller.get_item);

router.post("/", inventory_controller.post_inventory);

router.put("/", inventory_controller.put_inventory);

router.delete("/:id", inventory_controller.delete_inventory);

module.exports = router;
