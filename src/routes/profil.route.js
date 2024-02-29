const express = require("express");

const router = express.Router();
const profilController = require("../controllers/profil.controller");
const isAuth = require("../middlewares/isAuth");

/**
 * @swagger
 * paths:
 *   /api/profil:
 *     get:
 *       summary: Get user profile with token
 *       tags:
 *         - Profil
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
 */

router.get("/", isAuth, profilController.getProfil);

module.exports = router;