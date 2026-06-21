const userModel = require("../model/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createOtp } = require("../utils/createOtp");
const { callSendEmail } = require("../services/email-service");

module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const userExist = await userModel.findOne({ email }).select("-password");
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = createOtp();
    const result = await callSendEmail(email, otp);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      otp,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!userExist.verified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }

    const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
      },
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error in logout controller:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide both OTP and email",
      });
    }

    const user = await userModel.findOne({ email }).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const userOtp = user.otp;

    if (userOtp !== otp) {
      user.verified = false;
      await user.save();
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.verified = true;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error in verifyOtp controller:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports.getMe = async (req, res) => {
  try {
    const id = req.user._id;

    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getMe controller:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
