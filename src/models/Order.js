const User = require('./User');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The auto-generated ID of the Order
 *         order_date:
 *           type: string
 *           format: date
 *           description: The date of the order
 *         delivery_mode:
 *           type: string
 *           description: The delivery mode of the order
 *         delivery_address:
 *           type: string
 *           description: The delivery address of the order
 *         delivery_city:
 *           type: string
 *           description: The delivery city of the order
 *         delivery_zipcode:
 *           type: string
 *           description: The delivery zipcode of the order
 *         total_price:
 *           type: number
 *           format: int
 *           description: The total price of the order
 *         status:
 *           type: string
 *           description: The status of the order
 *       required:
 *         - order_date
 *         - delivery_mode
 *         - total_price
 *       example:
 *         order_date: "2022-01-01"
 *         delivery_mode: "delivery"
 *         delivery_address: "1234 Main St"
 *         delivery_city: "Anytown"
 *         delivery_zipcode: "12345"

*/

module.exports = (sequelize, DataTypes) => {
    // Definition of the Order model
    const Order = sequelize.define(
        "Order",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            order_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            delivery_mode: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            delivery_address: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            delivery_city: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            delivery_zipcode: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            total_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: 'id'
                },
            },
        },
        {
            tableName: "Orders",
            timestamps: false,
        }
    );
    return Order;
};