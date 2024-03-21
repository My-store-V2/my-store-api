const db = require("../models"); // Assuming your models are in the '../models' directory

module.exports = {
    addCart: async (req, res) => {
        try {
            const { user_id, product_id, quantity } = req.body;

            if (user_id) {
                // Si l'utilisateur est connecté, procédez comme avant
                let cartItem = await db.Cart.findOne({
                    where: { user_id, product_id },
                });

                if (cartItem) {
                    cartItem.quantity += quantity;
                    await cartItem.save();
                } else {
                    await db.Cart.create({
                        user_id,
                        product_id,
                        quantity,
                    });
                }
            }
            return res
                .status(200)
                .json({ message: "Produit ajouté au panier avec succès" });
        } catch (error) {
            console.error("Erreur lors de l'ajout au panier :", error);
            return res.status(500).json({
                message: "Une erreur s'est produite lors de l'ajout au panier",
            });
        }
    },

    getCart: async (req, res) => {
        try {
            const { user_id } = req.body;

            let cartItems;

            if (user_id) {
                // Si l'utilisateur est connecté, récupérez les produits du panier à partir de la base de données
                cartItems = await db.Cart.findAll({
                    where: { user_id },
                    include: [Product], // Inclure les informations sur le produit associé
                });
            }
            return res.status(200).json({ cart: cartItems });
        } catch (error) {
            console.error("Erreur lors de la récupération du panier :", error);
            return res.status(500).json({
                message:
                    "Une erreur s'est produite lors de la récupération du panier",
            });
        }
    },

    deleteCart: async (req, res) => {
        try {
            // Récupérez l'identifiant de l'utilisateur connecté ou tout autre identifiant pertinent
            const userId = req.user.id;

            // Recherchez le panier associé à l'utilisateur connecté
            const cart = await db.Cart.findOneAndDelete({ user: userId });

            if (!cart) {
                return res
                    .status(404)
                    .json({ message: "Le panier n'a pas été trouvé." });
            }

            // Si le panier est supprimé avec succès, retournez une réponse appropriée
            return res
                .status(200)
                .json({ message: "Le panier a été supprimé avec succès." });
        } catch (error) {
            // En cas d'erreur, renvoyez une réponse d'erreur avec le message approprié
            console.error(
                "Une erreur s'est produite lors de la suppression du panier :",
                error
            );
            return res.status(500).json({
                message:
                    "Une erreur s'est produite lors de la suppression du panier.",
            });
        }
    },
};
