const User = require("../models/User");
const Product = require("../models/Product");

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - id_user
 *         - id_product
 *         - quantity
 *       properties:
 *         id_user:
 *           type: string
 *           description: The ID of the client (user) associated with the wishlist item
 *         id_product:
 *           type: integer
 *           description: The ID of the product associated with the wishlist item
 *         quantity:
 *           type: integer
 *           description: The quantity of product inside the basket
 *       example:
 *         id_user: 'a38edd6b-c662-11ee-8370-42010a400005'
 *         id_product: 2
 *         quantity: 2
 */

module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(
        "Cart",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.TEXT,
                allowNull: false,
                references: {
                    model: User,
                    key: "id",
                },
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Product,
                    key: "id",
                },
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "Baskets", // Nom de votre table dans la base de données
            timestamps: false,
        }
    );

    Cart.associate = (models) => {
        Cart.belongsTo(models.Product, {
            through: "ProductCart",
            as: "products",
            foreignKey: "product_id",
            other_key: "id_product",
        }); // Cart appartient à Product
    };

    return Cart;
};
