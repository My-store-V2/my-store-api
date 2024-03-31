const db = require("../models");
const askRefundMail = require("../utils/askRefundMail");

module.exports = {
    //création de commande
    createOrder: async (req, res) => {
        try {
            const body = req.body;
            const id_user = req.user;
            // mode de livraison (livraison à domicile ou retrait en magasin)
            // adresse de livraison (si livraison à domicile)
            // liste des produits à commander
            const delivery_address = "";
            const delivery_city = "";
            const delivery_zipcode = 0;
            const delivery_mode = body.delivery_mode;
            if (delivery_mode == "delivery" && delivery_mode != "pickup") {
                delivery_address = body.delivery_address;
                delivery_city = body.delivery_city;
                delivery_zipcode = body.delivery_zipcode;
            }
            const tab_product_id = body.products;
            var tab_product = [];
            if (!delivery_mode) {
                return res.status(400).json({
                    success: false,
                    message: "Delivery mode is required.",
                });
            }
            if (
                delivery_mode == "delivery" &&
                (!delivery_address || !delivery_city || !delivery_zipcode)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Delivery address is required.",
                });
            }
            if (!tab_product_id) {
                return res.status(400).json({
                    success: false,
                    message: "Products are required.",
                });
            }

            // Check if the product already exists in the database
            for (product_id of tab_product_id) {
                const productExists = await db.Product.findOne({
                    where: { id: product_id },
                });
                if (!productExists) {
                    return res.status(400).json({
                        success: false,
                        message: "Product does not exist.",
                    });
                }
                tab_product.push(productExists);
            }

            if (!tab_product || tab_product.length == 0) {
                return res.status(400).json({
                    success: false,
                    message: "Product does not exist.",
                });
            }

            const status = "pending";
            var total_price = tab_product.reduce(
                (acc, product) => acc + product.price,
                0
            );

            // Create the order
            const order = await db.Orders.create({
                order_date: new Date(),
                delivery_mode: delivery_mode,
                delivery_address: delivery_address,
                delivery_city: delivery_city,
                delivery_zipcode: delivery_zipcode,
                total_price: total_price,
                status: status,
                user_id: id_user,
            });

            // Create the order details
            for (product of tab_product) {
                await db.OrderDetails.create({
                    order_id: order.id,
                    product_id: product.id,
                    quantity: 1,
                    unit_price: product.price,
                });
            }

            // Return a 201 status code with the order details
            res.status(201).json({
                success: true,
                message: "Order successfully created.",
                order: order,
            });
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
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

            const ordersInfo = await db.Orders.findAll({
                where: { id: orderId },
            });

            const finalResult = {
                results: orderDetails,
                orders: ordersInfo,
                success: true,
                message: "Order details retrieved successfully",
            };

            return res.status(200).json(finalResult);
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
