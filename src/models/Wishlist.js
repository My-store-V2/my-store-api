const User = require("../models/User");
const Product = require("../models/Product");

/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       required:
 *         - id
 *         - id_user
 *         - id_product
 *       properties:
 *         id_user:
 *           type: string
 *           description: The ID of the client (user) associated with the wishlist item
 *         id_product:
 *           type: integer
 *           description: The ID of the product associated with the wishlist item
 *       example:
 *         id_user: 'a38edd6b-c662-11ee-8370-42010a400005'
 *         id_product: 2
 */

module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define(
        "Wishlist",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_user: {
                type: DataTypes.TEXT,
                allowNull: false,
                references: {
                    model: User, // Assuming Client is the Sequelize model for clients
                    key: "id",
                },
            },
            id_product: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Product, // Assuming Product is the Sequelize model for products
                    key: "id",
                },
            },
        },
        {
            tableName: "Wishlist",
            timestamps: false,
        }
    );

    Wishlist.associate = (models) => {
        Wishlist.belongsTo(models.Product, {
            through: "ProductWishlist",
            as: "products",
            foreignKey: "id_product",
            other_key: "id_product",
        }); // Wishlist appartient à Product
    };

    return Wishlist;
};
