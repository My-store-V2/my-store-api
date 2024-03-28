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

router.post("/", isAuth, orderController.createOrder);
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
 *                     $ref: '#/components/schemas/OrderDetails'
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

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Mettre à jour le statut de la commande
 *     description: Mettre à jour le statut d'une commande spécifique associée à l'utilisateur authentifié.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la commande à mettre à jour le statut.
 *         schema:
 *           type: integer
 *       - in: body
 *         name: newStatus
 *         description: Informations sur le nouveau statut.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newStatus:
 *                   type: string
 *                   description: Les valeurs autorisées sont payed, refunded, refunded on demand.
 *                   example: "refunded on demand"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newStatus:
 *                 type: string
 *                 example: "refunded on demand"
 *     responses:
 *       '200':
 *         description: Statut de la commande mis à jour avec succès
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Statut de la commande mis à jour avec succès
 *       '400':
 *         description: Requête incorrecte
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Statut invalide fourni
 *       '403':
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Vous n'êtes pas autorisé à mettre à jour le statut de cette commande
 *       '404':
 *         description: Commande introuvable
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Commande non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Erreur interne du serveur. Quelque chose s'est mal passé.
 */

router.put("/:id", isAuth, orderController.updateStatus);

module.exports = router;
