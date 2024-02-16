const express = require("express");

const router = express.Router();
const profilController = require("../controllers/profil.controller");

/**
 * @swagger
 * paths:
 *   /api/profil/{id}:
 *     get:
 *       summary: Get user profile by ID
 *       tags:
 *         - Profil
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the user to get profile information
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: User profile retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UserProfileResponse'
 *         '404':
 *           description: User not found
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: User not found
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               example:
 *                 success: false
 *                 message: Internal Server Error. Something went wrong.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfileResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         user:
 *           $ref: '#/components/schemas/UserProfile'
 *         message:
 *           type: string
 *       required:
 *         - success
 *         - user
 *         - message
 *         
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
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
 *       required:
 *         - id
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 */

router.get("/:id", profilController.getProfil);

module.exports = router;