const express = require("express");
const productRoute = require("./product.route");
const authRoute = require('./auth.route');
const wishlistRoute = require('./wishlist.route');
const profilRoute = require("./profil.route");
const orderRoute = require("./order.route");

const router = express.Router();

router.use("/products", productRoute);

router.use("/auth", authRoute);

router.use("/wishlist", wishlistRoute);

router.use("/profil", profilRoute);

router.use("/order", orderRoute);

module.exports = router;