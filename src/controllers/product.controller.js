const db = require("../models");

module.exports = {
    // controller to get all products
    getProducts: async (req, res) => {
        try {
            // retrieve all products using Sequelize's findAll() method
            const products = await db.Product.findAll();

            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No products found",
                });
            }

            // return the products in JSON format
            return res.status(200).json({
                results: products,
                success: true,
            });
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // controller to get a specific product by id
    getProduct: async (req, res) => {
        try {
            if (isNaN(req.params.id)) {
                return res.status(400).json({
                    success: false,
                    message: "Bad request. No id provided",
                });
            }

            // retrieve the product with Sequelize's findByPk() method
            const product = await db.Product.findByPk(req.params.id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            // return the product in JSON format
            return res.status(200).json({
                results: product,
                success: true,
            });
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            res.status(500).json({ message: err.message });
        }
    },
};