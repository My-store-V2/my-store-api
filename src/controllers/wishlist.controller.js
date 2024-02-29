const db = require("../models"); // Assuming your models are in the '../models' directory

module.exports = {

  // controller to add a wishlist
  addWishlist: async (req, res) => {

    console.log(req.user, "token decoded");

    try {

      // Extract data from the request body
      const { id_product } = req.body;
      const id_user = req.user;

      // Validate the required fields
      if (!id_product) {
        return res.status(400).json({
          success: false,
          message: "  id_product are required fields",
        });
      }

      // Check if the client and product exist
      const userExists = await db.User.findByPk(id_user);
      const productExists = await db.Product.findByPk(id_product);

      if (!userExists || !productExists) {
        return res.status(404).json({
          success: false,
          message: "User or Product not found",
        });
      }

      // Check if the wishlist item already exists
      const existingWishlistItem = await db.Wishlist.findOne({
        attributes: ["id_user", "id_product"],
        where: { id_user, id_product },
      });

      if (existingWishlistItem) {
        return res.status(409).json({
          success: false,
          message: "Wishlist item already exists",
        });
      }

      // Create a new wishlist item
      const newWishlistItem = await db.Wishlist.create(
        { id_user, id_product },
        {
          fields: ["id_user", "id_product"],
        }
      );

      return res.status(201).json({
        success: true,
        wishlistItem: newWishlistItem,
        message: "Wishlist item added successfully",
      });

    }
    catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // controller to get all wishlists
  getWishlists: async (req, res) => {

    try {

      // retrieve all wishlists using Sequelize's findAll() method
      const wishlists = await db.Wishlist.findAll();

      if (wishlists.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No wishlists found",
        });
      }

      // return the wishlists in JSON format
      return res.status(200).json({
        results: wishlists,
        success: true,
      });

    }
    catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // controller to delete a product of wishlist
  deleteWishlistItem: async (req, res) => {

    try {

      const id_product = req.params.productId;

      // Validate if the user ID and product ID are provided
      if (!id_product) {
        return res.status(400).json({
          success: false,
          message: "Product ID are required",
        });
      }

      // Check if the wishlist item with the given user ID and product ID exists
      const existingWishlistItem = await db.Wishlist.findOne({
        where: {
          id_product: id_product,
        },
      });

      if (!existingWishlistItem) {
        return res.status(404).json({
          success: false,
          message: "Wishlist item not found",
        });
      }

      // Delete the existing wishlist item using Sequelize's destroy() method
      await existingWishlistItem.destroy();

      // Return a success message
      return res.status(200).json({
        success: true,
        message: `Wishlist item : ${id_product} for product is successfully deleted of wishlist`,
      });
    }
    catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};
