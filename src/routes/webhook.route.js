const express = require("express");
const orderWebhook = require("../webhook/order.webhook");

const router = express.Router();

router.post("/validate", orderWebhook.validateOrder);

module.exports = router;
