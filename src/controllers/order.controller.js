const db = require("../models");

module.exports = {

    //controller to get orders of user by authentification
    getOrders: async (req, res) => {
        try {

            const userId = req.user;

            const orders = await db.Orders.findAll({ where: { user_id: userId } });

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

            const orderDetails = await db.Order_Details.findAll({ where: { order_id: orderId } });

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
};
