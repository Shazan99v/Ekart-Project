import Product from "../models/Product.js";

// @desc   Create product
// @route  POST /api/products
// @access Admin

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      brand,

      images,
      features,
      specs,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      brand,

      images,
      features,
      specs,
    });

    const saved = await product.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("Create Product Error:", err);

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

// @desc   Update product
// @route  PUT /api/products/:id
// @access Admin

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      brand,

      images,
      features,
      specs,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.category = category || product.category;
    product.brand = brand || product.brand;

    product.images = images || product.images;
    product.features = features || product.features;
    product.specs = specs || product.specs;

    const updated = await product.save();

    res.json(updated);
  } catch (err) {
    console.error("Update Product Error:", err);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

// @desc   Get all products
// @route  GET /api/products
// @access Public

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (err) {
    console.error("Get Products Error:", err);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

// @desc   Get single product
// @route  GET /api/products/:id
// @access Public

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    console.error("Get Product Error:", err);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

// @desc   Delete product
// @route  DELETE /api/products/:id
// @access Admin

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted",
    });
  } catch (err) {
    console.error("Delete Product Error:", err);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};
