const db = require("../models"); // Assurez-vous de mettre le chemin correct vers votre fichier de modèles Sequelize

module.exports = {
    getProfil: async (req, res) => {
        
        try {

            const id_user = req.user;

            // Utilisez le modèle Sequelize User pour rechercher l'utilisateur par ID
            const user = await db.User.findByPk(id_user);

            // Vérifiez si l'utilisateur a été trouvé
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            // Retournez les informations de l'utilisateur au format JSON
            return res.status(200).json({
                success: true,
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    address: user.address,
                    zipcode: user.zipcode,
                    city: user.city,
                    phone: user.phone,
                },
                message: "User profile retrieved successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error. Something went wrong.",
            });
        }
    },
};
