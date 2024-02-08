const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/auth.controller');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API operations related to user authentication
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             lastname: "John"
 *             firstname: "Doe"
 *             email: "john.doe@example.com"
 *             password: "securepassword"
 *             address: "123 Main St"
 *             zipcode: 12345
 *             city: "Cityville"
 *             phone: "+1234567890"
 *             admin: false
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             example:
 *               results: "newUser"
 *               success: true
 *               token: "your_generated_token_here"
 *               message: "User successfully registered"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API operations related to user authentication
 * /api/auth/login:
 *   post:
 *     summary: Login to user account
 *     description: Authenticate a user with the provided email and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "john.doe@example.com"
 *             password: "securepassword"
 *     responses:
 *       201:
 *         description: User successfully authenticated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User successfully authenticated"
 *               token: "your_generated_token_here"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid password"
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Internal Server Error"
 */

router.post('/login', AuthController.login);

module.exports = router;
