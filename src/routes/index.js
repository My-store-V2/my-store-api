const express = require("express");
const productRoute = require("./product.route");
const authRoute = require('./auth.route');
const wishlistRoute = require('./wishlist.route');

const router = express.Router();

router.use("/products", productRoute);

router.use("/auth", authRoute);

router.use("/wishlist", wishlistRoute);

module.exports = router;