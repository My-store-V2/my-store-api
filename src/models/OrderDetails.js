const Order = require('./order');
const Product = require('./Product');

/**
* @swagger
 * components:
 *   schemas:
 *      OrderDetails:
 *       type: object
 *       required:
 *         - id
 *         - id_user
 *         - id_product
 *       properties:
 *         id_order:
 *           type: string
 *           description: The ID of the order associated with the OrderDetails item
 *         id_product:
 *           type: integer
 *           description: The ID of the product associated with the  OrderDetails item
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the order
 *         unit_price:
 *           type: integer
 *           description: The unit price of the product in the order
 *       example:
 *         id_order: 1
 *         id_product: 2
 *         quantity: 2
 *         unit_price: 200
    */
/**
 */



module.exports = (sequelize, DataTypes) => {
    // Definition of the Order model
    const OrderDetails = sequelize.define(
        "OrderDetails",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            order_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Order,
                    key: 'id',
                },
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Product,
                    key: 'id',
                },
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            unit_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "Order_Details",
            timestamps: false,
        }
    );
    return OrderDetails;
};