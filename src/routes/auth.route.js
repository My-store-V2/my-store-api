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
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRegistrationResponse'
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
 *     UserRegistration:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         address:
 *           type: string
 *         zipcode:
 *           type: integer
 *         city:
 *           type: string
 *         phone:
 *           type: string
 *         admin:
 *           type: boolean
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistrationResponse:
 *       type: object
 *       properties:
 *         results:
 *           type: string
 *         success:
 *           type: boolean
 *         token:
 *           type: string
 *         message:
 *           type: string
 *       required:
 *         - results
 *         - success
 *         - token
 *         - message
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
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       201:
 *         description: User successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Unauthorized
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
 *     UserLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         token:
 *           type: string
 *       required:
 *         - success
 *         - message
 *         - token
 */

router.post('/login', AuthController.login);

module.exports = router;
