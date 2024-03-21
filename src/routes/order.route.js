
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const isAuth = require("../middlewares/isAuth");

/**
 * @swagger
 * tags:
*   name: Orders
*   description: API operations related to orders
*   /api/orders:
*   post:
*     summary: Create a new order
*     description: Create a new order with the provided information.
*     tags: [Orders]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order'
*     responses:
*       201:
*         description: Order successfully created  
*         content:
*           application/json:
*             example:
*               success: true
*               message: Order successfully created.     
*       500:
*         description: Internal Server Error
*         content:
*           application/json:
*             example:
*               success: false  
*               message: Internal Server Error
*       400:
*         description: Bad Request
*         content:
*           application/json:
*             example:
*               success: false
*               message: Products are required.
*/

router.post("/", isAuth, orderController.createorder);

module.exports = router;

