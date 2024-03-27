const db = require("../models");
const askRefundMail = require("../utils/askRefundMail");
module.exports = {
    //controller to get orders of user by authentification
    getOrders: async (req, res) => {
        try {
            const userId = req.user;

            const orders = await db.Orders.findAll({
                where: { user_id: userId },
            });

            if (orders.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No orders found",
                });
            }

            return res.status(200).json({
                success: true,
                results: orders,
                message: "User orders retrieved successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error. Something went wrong.",
            });
        }
    },

    //controller to get details of order by authenfication
    getOrderDetails: async (req, res) => {
        try {
            const userId = req.user;

            const orderId = req.params.id;
            const order = await db.Orders.findByPk(orderId);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }

            if (order.user_id !== userId) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to view this order",
                });
            }

            const orderDetails = await db.Order_Details.findAll({
                where: { order_id: orderId },
                include: [
                    {
                        model: db.Product,
                        as: "products",
                    },
                ],
            });

            return res.status(200).json({
                success: true,
                results: orderDetails,
                message: "Order details retrieved successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error. Something went wrong.",
            });
        }
    },

    updateStatus: async (req, res) => {
        const { newStatus } = req.body;

        const orderId = req.params.id;
        const userId = req.user; // Accès aux informations de l'utilisateur à partir du JWT
        const order = await db.Orders.findByPk(orderId);
        const user = await db.User.findByPk(userId);
        statusLower = newStatus.toLowerCase();
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (order.user_id !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this order",
            });
        }
        // Vérifier si le nouveau statut est valide
        const validStatus = ["payed", "refunded", "refunded on demand"];
        if (!validStatus.includes(statusLower)) {
            return res.status(400).json({ error: "Statut invalide" });
        }

        if (
            order.status === "refunded on demand" &&
            statusLower === "refunded on demand"
        ) {
            return res.status(400).json({
                error: "La commande est déjà en attente de remboursement",
            });
        }

        try {
            if (statusLower === "refunded on demand") {
                await askRefundMail.askRefundMail(res, user.email, orderId);
            }

            await db.Orders.update(
                { status: statusLower },
                { where: { id: orderId } }
            );

            return res.status(200).json({
                message: "Statut de la commande mis à jour avec succès",
            });
        } catch (error) {
            console.error(
                "Erreur lors de la mise à jour du statut de la commande :",
                error
            );
            return res.status(500).json({
                error: "Erreur lors de la mise à jour du statut de la commande",
            });
        }
    },
};
