const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authenticateUser = require("../middlewares/authenticateUser");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the user's shopping cart
 * /api/cart:
 *   post:
 *     summary: Add Product to Cart
 *     description: Add a product to the user's shopping cart or add an quantity of a Product form Cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID of the product to be added to the cart
 *                 example: 3
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product to be added
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *             example:
 *               message: Produit ajouté au panier avec succès
 *       500:
 *         description: Internal Server Error - Failed to add product to cart
 */

router.post("/", authenticateUser, cartController.addCart);

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the user's shopping cart
 * /api/cart:
 *   get:
 *     summary: Get User's Cart
 *     description: Retrieve the user's shopping cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: array
 *                   description: List of items in the user's cart
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                         description: ID of the product in the cart
 *                       quantity:
 *                         type: integer
 *                         description: Quantity of the product in the cart
 *             example:
 *               cart:
 *                 - id : 4
 *                   user_id : "user_id"
 *                   product_id: 6
 *                   quantity: 2
 *                   products :
 *                   - id : 6
 *                     name : "product_name"
 *                     description : "LOREM"
 *                     active : true
 *                     thumbnail :  "/uploads/images/products/thumbn"
 *                     packshot :  "/uploads/images/products/packsh"
 *                     price : 90
 *       500:
 *         description: Internal Server Error - Failed to retrieve user's cart
 */

router.get("/", authenticateUser, cartController.getCart);

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the user's shopping cart
 * /api/cart:
 *   delete:
 *     summary: Delete Product from Cart or remove an quantity of a Product form Cart
 *     description: Delete a product from the user's shopping cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID of the product to be deleted from the cart
 *                 example: 3
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product to be deleted
 *                 example: 3
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *             example:
 *               message: Produit supprimé du panier avec succès
 *       500:
 *         description: Internal Server Error - Failed to delete product from cart
 */

router.delete("/", authenticateUser, cartController.deleteCart);

module.exports = router;
