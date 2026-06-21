const express = require("express");
const app = express();
const db = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.send("Backend server running!");
});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

module.exports = app;
