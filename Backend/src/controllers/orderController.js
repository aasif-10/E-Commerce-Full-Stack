const orderModel = require("../model/order-model");
const { sendOrderEmail } = require("../services/email-service");

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("user");
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.json({ message: "Orders found", orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id).populate("user");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order found", order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.createOrder = async (req, res) => {
  try {
    const { products, totalPrice, paymentId, address, status } = req.body;
    if (
      !products ||
      totalPrice === undefined ||
      !paymentId ||
      !address ||
      !status
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const order = await orderModel.create({
      user: req.user._id,
      products,
      totalPrice,
      status,
      paymentId,
      address,
    });

    const result = await sendOrderEmail(
      req.user.email,
      order._id,
      req.user.name,
    );
    if (!result) {
      return res
        .status(500)
        .json({ message: "Failed to send order confirmation email" });
    }
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();
    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getAllOrderByUser = async (req, res) => {
  const id = req.user._id;
  const order = await orderModel.find({ user: id });
  if (!order) {
    return res.status(404).json({ message: "No orders found for this user" });
  }
  res.status(200).json({ orders: order });
};
