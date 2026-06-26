const cartModel = require("../model/cart-model");

module.exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;
    if (!productId || quantity == undefined) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer" });
    }

    const userId = req.user._id;
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      await cartModel.create({
        user: userId,
        items: [{ product: productId, quantity, size }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId && item.size === size,
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, size });
      }
      await cart.save();
    }

    return res.status(201).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await cartModel
      .findOne({ user: req.user._id })
      .populate("items.product");

    if (!cartItems) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateCartItem = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    if (!productId || quantity == undefined) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }
    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer" });
    }

    const cartItem = await cartModel.findOne({
      user: req.user._id,
      "items.product": productId,
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    cartItem.items = cartItem.items.map((item, index) => {
      if (item.product.toString() === productId) {
        item.quantity = quantity;
      }
      return item;
    });
    await cartItem.save();
    return res.status(200).json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.removeCartItem = async (req, res) => {
  try {
    const { id: productId } = req.params;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const cartItem = await cartModel.findOne({
      user: req.user._id,
      "items.product": productId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const itemIndex = cartItem.items.findIndex((item, index) => {
      return item.product.toString() === productId;
    });
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    cartItem.items.splice(itemIndex, 1);
    await cartItem.save();
    return res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
