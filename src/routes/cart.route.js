const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlist.controller");
const isAuth = require("../middlewares/isAuth");

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: API operations related to user wishlists
 * /api/wishlist:
 *   post:
 *     summary: Add a product to the wishlist
 *     description: Add a new product to the user's wishlist.
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WishlistAddition'
 *     responses:
 *       201:
 *         description: Product successfully added to the wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WishlistAdditionSuccessResponse'
 *       400:
 *         description: id_product is required field
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: id_product is required field
 *       404:
 *         description: User or Product not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User or Product not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistAddition:
 *       type: object
 *       properties:
 *         id_product:
 *           type: integer
 *       required:
 *         - id_product
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistAdditionSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the operation was successful.
 *         wishlistItem:
 *           $ref: '#/components/schemas/WishlistItem'
 *           description: Details of the added item in the wishlist.
 *         message:
 *           type: string
 *           description: A message indicating the success of the operation.
 *       required:
 *         - success
 *         - wishlistItem
 *         - message
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistItem:
 *       type: object
 *       properties:
 *         id_product:
 *           type: integer
 *           description: The ID of the product associated with the wishlist item.
 *       required:
 *         - id_product
 */

router.post("/", wishlistController.addWishlist);

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: API operations related to user wishlists
 * /api/wishlist:
 *   get:
 *     summary: Get all wishlists
 *     description: Retrieve all wishlists.
 *     tags: [Wishlist]
 *     responses:
 *       200:
 *         description: Wishlists retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WishlistListResponse'
 *       404:
 *         description: Not found. No wishlists available.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not found. No wishlists available.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         wishlists:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WishlistItem'
 *         message:
 *           type: string
 *       required:
 *         - success
 *         - wishlists
 *         - message
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistItem:
 *       type: object
 *       properties:
 *         id_product:
 *           type: integer
 *       required:
 *         - id_product
 */

router.get("/", wishlistController.getWishlists);

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: API operations related to user wishlists
 * paths:
 *   /api/wishlist/{productId}:
 *     delete:
 *       summary: Remove a product from the user's wishlist
 *       description: Remove a specific product from the user's wishlist based on user ID and product ID.
 *       tags: [Wishlist]
 *       parameters:
 *         - in: path
 *           name: productId
 *           required: true
 *           description: Product ID
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Wishlist item removed successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/WishlistDeletionResponse'
 *         404:
 *           description: Wishlist item not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Wishlist item not found
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistDeletionResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the operation was successful.
 *         message:
 *           type: string
 *           description: A message indicating the result of the operation.
 *       required:
 *         - success
 *         - message
 */

router.delete("/:productId", wishlistController.deleteWishlistItem);

module.exports = router;
