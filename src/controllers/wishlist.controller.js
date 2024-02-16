const db = require("../models"); // Assuming your models are in the '../models' directory

module.exports = {
  addProductToWishlist: async (req, res) => {
    
    const { id_user, id_product } = req.body;

    try {
      // Validate the required fields
      if (!id_user || !id_product) {
        return res.status(400).json({
          success: false,
          message: "id_user and id_product are required fields",
        });
      }

      // Vérifier si l'utilisateur existe
      const user = await db.User.findByPk(id_user);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Vérifier si le produit existe
      const product = await db.Product.findByPk(id_product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Check if the wishlist item already exists
      const existingWishlistItem = await db.Wishlist.findOne({
        attributes: ["id_user", "id_product"],
        where: { id_user, id_product },
      });

      if (existingWishlistItem) {
        return res.status(400).json({
          success: false,
          message: "Product is already in the wishlist",
        });
      }

      // Create a new wishlist item
      const newWishlistItem = await db.Wishlist.create(
        {
            id_user,
            id_product,
        },
        {
            fields: ["id_user", "id_product"],
        }
      );

      return res.status(201).json({
        success: true,
        wishlistItem: newWishlistItem,
        message: "Wishlist item added successfully",
      });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
  },
  // controller to get a specific wishlist by id
  getWishlist: async (req, res) => {

     // Supposons que l'ID de l'utilisateur est passé en tant que paramètre dans l'URL
     const userId = req.params.id; 

    try {

     // Validate the required fields
     if (!userId) {
      return res.status(400).json({
        success: false,
        message: "id_user is required field",
      });
    }

    // Utilisez le modèle Sequelize User pour rechercher l'utilisateur par ID
    const user = await db.User.findByPk(userId);

    // Vérifiez si l'utilisateur a été trouvé
    if (!user) {
        return res.status(404).json({
        success: false,
        message: "User not found",
        });
    }

    const wishlist = await db.Wishlist.findByPk(userId, {
      include: [
        {
          model: db.Product,
          attributes: ['id', 'name', 'price'],
          through: { attributes: [] },
          as: 'products',
        },
      ],
    });

    return res.status(200).json({
      success: true,
      wishlist: wishlist,
      message: "Wishlist retrieved successfully",
    });

  
    } catch (err) {
        // if an error occurs, return a 500 status code with the error message
        res.status(500).json({ message: err.message });
    }
  },
};
