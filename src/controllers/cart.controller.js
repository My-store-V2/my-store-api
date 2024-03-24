const db = require("../models"); // Assuming your models are in the '../models' directory

module.exports = {
    addCart: async (req, res) => {
        try {
            const { product_id, quantity } = req.body;
            const user_id = req.user;
            // Si l'utilisateur est connecté, procédez comme avant
            if (user_id) {
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
            } else {
                let guestCart =
                    JSON.parse(localStorage.getItem("guestCart")) || [];

                let existingItem = guestCart.find(
                    (item) => item.product_id === product_id
                );
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    guestCart.push({ product_id, quantity });
                }

                localStorage.setItem("guestCart", JSON.stringify(guestCart));
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
            const user = await db.User.findByPk(req.user);
            let user_id = user.id;
            let cartItems;

            if (user_id) {
                // Si l'utilisateur est connecté, récupérez les produits du panier à partir de la base de données
                cartItems = await db.Cart.findAll({
                    where: { user_id },
                    include: [
                        {
                            model: db.Product,
                            as: "products", // Utilisez l'alias spécifié dans votre association
                        },
                    ], // Inclure les informations sur le produit associé
                });
            } else {
                // Si l'utilisateur est un invité, récupérez le panier à partir de localStorage
                const guestCart =
                    JSON.parse(localStorage.getItem("guestCart")) || [];
                cartItems = guestCart.map((item) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                }));
            }

            // Envoyer les données du panier au client
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
            const { product_id, quantity } = req.body;
            const user_id = req.user;

            if (user_id) {
                let cartItem = await db.Cart.findOne({
                    where: { user_id, product_id },
                });

                if (cartItem) {
                    if (cartItem.quantity > quantity) {
                        cartItem.quantity -= quantity;
                        await cartItem.save();
                    } else {
                        await cartItem.destroy();
                    }
                }
            } else {
                let guestCart =
                    JSON.parse(localStorage.getItem("guestCart")) || [];
                let existingItem = guestCart.find(
                    (item) => item.product_id === product_id
                );

                if (existingItem) {
                    if (existingItem.quantity > quantity) {
                        existingItem.quantity -= quantity;
                    } else {
                        guestCart = guestCart.filter(
                            (item) => item.product_id !== product_id
                        );
                    }
                    localStorage.setItem(
                        "guestCart",
                        JSON.stringify(guestCart)
                    );
                }
            }

            return res
                .status(200)
                .json({ message: "Produit supprimé du panier avec succès" });
        } catch (error) {
            return res.status(500).json({
                message:
                    "Une erreur s'est produite lors de la suppression du produit du panier",
            });
        }
    },
};
