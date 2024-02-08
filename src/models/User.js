/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         firstname:
 *           type: string
 *           description: The firstname of the user
 *         lastname:
 *           type: string
 *           description: The lastname of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *         zipcode:
 *           type: integer
 *           description: The zipcode of the user
 *         city:
 *           type: string
 *           description: The city of the user
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *         admin:
 *           type: boolean
 *           description: admin (optional)
 *       example:
 *         id: "68e27f21-c66c-11ee-8370-42010a400005"
 *         firstname: "John"
 *         lastname: "Doe"
 *         email: "john.doe@example.com"
 *         password: "password123"
 *         address: "123 Main St"
 *         zipcode: "12345"
 *         city: "Cityville"
 *         phone: "555-1234"
 *         admin: false
 */

module.exports = (sequelize, DataTypes) => {
    // Définition du modèle User
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.TEXT,
                primaryKey: true,
            },
            firstname: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            zipcode: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            city: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            phone: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
        },
        {
            tableName: "User",
            timestamps: false,
        }
    );

    return User;
};
