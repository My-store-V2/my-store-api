const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");

router.post("/", cartController.addCart);

router.get("/", cartController.getCart);

router.delete("/:productId", cartController.deleteCartItem);

module.exports = router;
