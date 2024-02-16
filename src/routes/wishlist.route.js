const express = require("express");
// const verifyToken = require('../middlewares/verifiyToken');
// const verifyIsAdmin = require('../middlewares/verifyIsAdmin');
const router = express.Router();
const wishlistController = require("../controllers/Wishlist.controller");

/**
 * @swagger
 * paths:
 *   /api/wishlist:
 *     post:
 *       summary: Add a product to the wishlist
 *       tags:
 *         - Wishlist
 *       requestBody:
 *         description: Wishlist item to add
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddProductToWishlistRequest'
 *       responses:
 *         '201':
 *           description: Wishlist item added successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AddProductToWishlistResponse'
 *         '400':
 *           description: Bad request. Ensure the request body is valid.
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: "id_user and id_product are required fields"
 *         '404':
 *           description: Not found. User or product not found.
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: "User not found"
 *         '500':
 *           description: Internal Server Error. Something went wrong.
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: "Internal Server Error"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AddProductToWishlistRequest:
 *       type: object
 *       properties:
 *         id_user:
 *           type: string
 *         id_product:
 *           type: integer
 *       required:
 *         - id_user
 *         - id_product
 *     
 *     AddProductToWishlistResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         wishlistItem:
 *           $ref: '#/components/schemas/WishlistItem'
 *         message:
 *           type: string
 *       required:
 *         - success
 *         - wishlistItem
 *         - message
 *
 *     WishlistItem:
 *       type: object
 *       properties:
 *         id_user:
 *           type: string
 *         id_product:
 *           type: integer
 *       required:
 *         - id_user
 *         - id_product
 */

router.post("/", wishlistController.addProductToWishlist);

router.get('/:id', wishlistController.getWishlist);

module.exports = router;