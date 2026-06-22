const userModel = require("../model/user-model");

module.exports.isAdmin = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await userModel.findById(id);
    if (user.role != "admin") {
      return res
        .status(403)
        .json({ error: "Access denied. User is not an admin." });
    }
    next();
  } catch (error) {
    console.error("Error checking admin role:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
