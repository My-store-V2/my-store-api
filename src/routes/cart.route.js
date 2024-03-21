const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.post("/", cartController.addCart);

router.get("/", cartController.getCart);

router.delete("/:productId", cartController.deleteCart);

module.exports = router;
