const express = require("express");

const router = express.Router();
const orderController = require("../controllers/order.controller");
const isAuth = require("../middlewares/isAuth");

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get user's orders
 *     description: Retrieve the orders associated with the authenticated user.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Orders'
 *                   description: List of user's orders.
 *                 message:
 *                   type: string
 *                   description: Additional message (optional).
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
 *       '404':
 *         description: No orders found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No orders found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */

router.get("/", isAuth, orderController.getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order details
 *     description: Retrieve the details of a specific order associated with the authenticated user.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve details for.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Details of the specified order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order_Details'
 *                   description: List of order details.
 *       '403':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: You are not authorized to view this order
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */

router.get("/:id", isAuth, orderController.getOrderDetails);

module.exports = router;