// cartController.js
const Cart = require("../model/Cart");
const User = require("../../users/model/User");

module.exports = {
  addItem: async (req, res) => {
    try {
      // Get user and item information from request
      const { userId, item } = req.body;

      // Find the user's cart
      let cart = await Cart.findOne({ user: userId });

      // If the cart doesn't exist, create a new cart
      // If the cart doesn't exist, create a new cart
      if (!cart) {
        cart = new Cart({
          user: userId,
          items: {
            [item.id]: { ...item, quantity: 1 },
          },
        });
      }

      // Add the item to the cart
      const existingItemIndex = cart.items.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );

      if (existingItemIndex === -1) {
        cart.items.push({ item, quantity: 1 });
      } else {
        cart.items[existingItemIndex].quantity++;
      }

      // Save the cart
      await cart.save();

      res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Error adding item to cart", error });
    }
  },

  updateItem: async (req, res) => {
    try {
      const { userId, itemId, newQuantity } = req.body;

      // Find the user's cart
      let cart = await Cart.findOne({ user: userId });

      // Update the item in the cart
      const existingItem = cart.items.get(itemId);

      if (existingItem && newQuantity > 0) {
        existingItem.quantity = newQuantity;
      }

      // Save the cart
      await cart.save();

      res.status(200).json({ message: "Item updated in cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Error updating item in cart", error });
    }
  },

  removeItem: async (req, res) => {
    try {
      const { userId, itemId } = req.body;

      // Find the user's cart
      let cart = await Cart.findOne({ user: userId });

      // Remove the item from the cart
      cart.items.delete(itemId);

      // Save the cart
      await cart.save();

      res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart", error });
    }
  },
};
