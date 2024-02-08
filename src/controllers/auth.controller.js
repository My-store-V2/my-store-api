const db = require("../models");
const jwtUtils = require('../utils/signJwt');

module.exports = {
    //inscription
    register: async (req, res) => {
        try {
            // create a new User using Sequelize's create() method
            const newUser = await db.User.create(req.body);

            //create new Token
            let userToken = jwtUtils.signJwt({
                id: newUser._id,
                admin: newUser.admin
            })

            // return the new User in JSON format
            if (userToken) {
            return res.status(201).json({
                results: newUser,
                success: true,
                token: userToken,
                message: `User successfully registered`,
            });
            }
        }
        catch (err) {
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
            
            //find a user
            const userLogged = await db.User.findOne({ where: { email } });

            //if no user throw error 
            if (!userLogged) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            //find a password
            const passwordValid = await db.User.findOne({ where: { password } });

            // If the password is not valid, throw an error
            if (!passwordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid password',
                });
            }

            //sign jwt
            let userToken = jwtUtils.signJwt({
                id: userLogged._id,
                admin: userLogged.admin
            })

            // Répondre avec un succès et le jeton généré
            return res.status(201).json({
                success: true,
                message: 'User successfully authenticated',
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