const db = require('../models'); // Assuming your models are in the '../models' directory

exports.addWishlist = async (req, res) => {
  try {
    // Extract data from the request body
    const { id_user, id_product } = req.body;

    // Validate the required fields
    if (!id_user || !id_product) {
      return res.status(400).json({
        success: false,
        message: 'id_user and id_product are required fields',
      });
    }

    // Check if the client and product exist
    const userExists = await db.User.findByPk(id_user);
    const productExists = await db.Product.findByPk(id_product);

    if (!userExists || !productExists) {
      return res.status(404).json({
        success: false,
        message: 'User or Product not found',
      });
    }

    // Check if the wishlist item already exists
    const existingWishlistItem = await db.Wishlist.findOne({
      where: { id_user, id_product },
    });

    if (existingWishlistItem) {
      return res.status(400).json({
        success: false,
        message: 'Wishlist item already exists',
      });
    }

    // Create a new wishlist item
    const newWishlistItem = await db.Wishlist.create({
        id_user,
        id_product,
    });

    return res.status(201).json({
      success: true,
      wishlistItem: newWishlistItem,
      message: 'Wishlist item added successfully',
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
