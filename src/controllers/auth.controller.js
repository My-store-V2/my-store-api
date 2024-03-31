const db = require("../models");
const jwtUtils = require("../utils/signJwt");
const nodemailerJwt = require("../utils/sendConfirmationMail");
const bcrypt = require("bcryptjs");

module.exports = {
    //inscription
    register: async (req, res) => {
        try {
            const {
                firstname,
                lastname,
                email,
                password,
                address,
                zipcode,
                city,
                phone,
            } = req.body;

            // Check if the user already exists in the database
            const userExists = await db.User.findOne({ where: { email } });

            if (userExists) {
                return res
                    .status(400)
                    .json({ success: false, message: "User already exists." });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(password, salt);

            // create a new User using Sequelize's create() method
            const newUser = await await db.User.create({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                address,
                zipcode,
                city,
                phone,
            });

            await nodemailerJwt.sendConfirmationEmail(res, email);
            //create new Token
            let userToken = jwtUtils.signJwt({
                id: newUser._id,
            });

            // return the new User in JSON format
            if (userToken) {
                return res.status(201).json({
                    results: newUser,
                    success: true,
                    token: userToken,
                    message: `User successfully registered`,
                });
            }
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
    //connexion
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            //find the user exists in the database
            const userLogged = await db.User.findOne({ where: { email } });

            //if no user throw error
            if (!userLogged) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            // Check if the password is correct
            const validPassword = await bcrypt.compare(
                password,
                userLogged.password
            );
            if (!validPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Password invalid",
                });
            }

            //sign jwt
            let userToken = jwtUtils.signJwt(userLogged.id);

            // Répondre avec un succès et le jeton généré
            return res.status(201).json({
                success: true,
                message: "User successfully authenticated",
                token: userToken,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
};
