const productModel = require("../model/product-model");
const cloudinary = require("../config/cloudinary-config");
const streamifier = require("streamifier");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products) {
      return res.status(404).json({ error: "No products found" });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const { name, desc, price, originalPrice, category, stock, tag, rating, reviews, sizes, material, sku } = req.body;
    if (
      !name ||
      !desc ||
      !category ||
      !sku
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (Number(price) < 0 || Number(stock) < 0) {
      return res
        .status(400)
        .json({ message: "Price and stock must be non-negative" });
    }

    let imageUrl = "";

    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
      const result = await streamUpload(req);
      imageUrl = result.secure_url;
    }

    const product = await productModel.create({
      name,
      desc,
      price,
      originalPrice,
      category,
      stock,
      imageUrl,
      tag,
      rating,
      reviews,
      sizes,
      material,
      sku,
    });

    res.status(201).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, desc, price, originalPrice, category, stock, tag, rating, reviews, sizes, material, sku } = req.body;

    let imageUrl = "";
    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
      const result = await streamUpload(req);
      imageUrl = result.secure_url;
    }

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name ?? product.name;
    product.desc = desc ?? product.desc;
    product.price = price ?? product.price;
    product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;
    product.tag = tag !== undefined ? tag : product.tag;
    product.rating = rating ?? product.rating;
    product.reviews = reviews ?? product.reviews;
    product.sizes = sizes ?? product.sizes;
    product.material = material ?? product.material;
    product.sku = sku ?? product.sku;
    if (imageUrl) {
      product.imageUrl = imageUrl;
    }
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const deletedProduct = await productModel.deleteOne({ _id: id });
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
