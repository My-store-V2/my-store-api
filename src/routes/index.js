const express = require("express");
const productRoute = require("./product.route");
const authRoute = require("./auth.route");
const wishlistRoute = require("./wishlist.route");
const profilRoute = require("./profil.route");
const orderRoute = require("./order.route");
const cartRoute = require("./cart.route");
const router = express.Router();

router.use("/products", productRoute);

router.use("/auth", authRoute);

router.use("/wishlist", wishlistRoute);

router.use("/profil", profilRoute);

router.use("/orders", orderRoute);

router.use("/cart", cartRoute);

module.exports = router;
