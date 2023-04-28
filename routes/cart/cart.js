// cart.js
var express = require("express");
var router = express.Router();
var cartController = require("./controller/cartController");
var { verifyToken } = require("../../middleware/authorization");

router.post("/add-item", verifyToken, cartController.addItem);
router.post("/update-item", verifyToken, cartController.updateItem);
router.post("/remove-item", verifyToken, cartController.removeItem);

module.exports = router;
