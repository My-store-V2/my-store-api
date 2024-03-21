const db = require("../models");

module.exports = {
    //création de commande
    createorder: async (req, res) => {
        try {
            const body = req.body;
            const id_user = req.user;
            // mode de livraison (livraison à domicile ou retrait en magasin)
            // adresse de livraison (si livraison à domicile)
            // liste des produits à commander
            const delivery_address = ""
            const delivery_city = ""
            const delivery_zipcode = 0
            const delivery_mode = body.delivery_mode;
            if (delivery_mode == "delivery" && delivery_mode != "pickup") {
                delivery_address = body.delivery_address;
                delivery_city = body.delivery_city;
                delivery_zipcode = body.delivery_zipcode;
            }
            const tab_product_id = body.products;
            var tab_product = [];
            if (!delivery_mode) {
                return res.status(400).json({ success: false, message: "Delivery mode is required." });
            }
            if (delivery_mode == "delivery" && (!delivery_address || !delivery_city || !delivery_zipcode)) {
                return res.status(400).json({ success: false, message: "Delivery address is required." });
            }
            if (!tab_product_id) {
                return res.status(400).json({ success: false, message: "Products are required." });
            }



            // Check if the product already exists in the database
            console.log(tab_product_id);
            for (product_id of tab_product_id) {
                console.log(product_id);
                const productExists = await db.Product.findOne({ where: { id: product_id } });
                if (!productExists) {
                    return res.status(400).json({ success: false, message: "Product does not exist." });
                }
                tab_product.push(productExists);
            }

            if (!tab_product || tab_product.length == 0) {
                return res.status(400).json({ success: false, message: "Product does not exist." });
            }

            const status = "pending"
            var total_price = tab_product.reduce((acc, product) => acc + product.price, 0);

            // Create the order
            const order = await db.Order.create({
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
                console.log(product)
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
        }
        catch (err) {
            // if an error occurs, return a 500 status code with the error message
            console.log(err);
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
};
