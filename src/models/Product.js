/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The auto-generated ID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         active:
 *           type: boolean
 *           description: Whether the product is active or not
 *         thumbnail:
 *           type: string
 *           description: URL or path to the product's thumbnail image
 *         packshot:
 *           type: string
 *           description: URL or path to the product's packshot image
 *         price:
 *           type: number
 *           format: int
 *           description: The price of the product
 *       example:
 *         id: 1
 *         name: "Sample Product"
 *         description: "This is a sample product description."
 *         active: true
 *         thumbnail: "https://example.com/thumbnail.jpg"
 *         packshot: "https://example.com/packshot.jpg"
 *         price: 200
 */

module.exports = (sequelize, DataTypes) => {
    // Definition of the Product model
    const Product = sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            thumbnail: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            packshot: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "Product",
            timestamps: false,
        }
    );

    Product.associate = (models) => {
        Product.belongsToMany(models.Wishlist, {
            through: "WishlistProduct",
            as: "wishlists",
            foreignKey: "id_product",
            otherKey: "id_wishlist",
        });
    };
    Product.associate = (models) => {
        Product.belongsToMany(models.Cart, {
            through: "CartProduct",
            as: "carts",
            foreignKey: "product_id",
            otherKey: "id_cart",
        });
    };
    Product.associate = (models) => {
        Product.belongsToMany(models.OrderDetails, {
            through: "OrderDetailsProduct",
            as: "OrderDetails",
            foreignKey: "product_id",
            otherKey: "id_OrderDetails",
        });
    };

    return Product;
};
