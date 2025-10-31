"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const supabase_1 = __importDefault(require("../config/supabase"));
// Get all products
const getAllProducts = async (req, res) => {
    try {
        const result = await supabase_1.default.query('SELECT * FROM products ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};
exports.getAllProducts = getAllProducts;
// Get a single product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await supabase_1.default.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};
exports.getProductById = getProductById;
// Create a new product
const createProduct = async (req, res) => {
    const { name, description, price, original_price, category, subcategory, image_url, images, stock, in_stock, featured, rating, review_count, colors, sizes, tags } = req.body;
    try {
        const result = await supabase_1.default.query(`INSERT INTO products (
        name, description, price, original_price, category, subcategory,
        image_url, images, stock, in_stock, featured, rating, review_count,
        colors, sizes, tags
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`, [
            name, description, price, original_price, category, subcategory,
            image_url, images, stock, in_stock, featured, rating, review_count,
            colors, sizes, tags
        ]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};
exports.createProduct = createProduct;
// Update a product by ID
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, original_price, category, subcategory, image_url, images, stock, in_stock, featured, rating, review_count, colors, sizes, tags } = req.body;
    try {
        const result = await supabase_1.default.query(`UPDATE products 
       SET name = $1, description = $2, price = $3, original_price = $4,
           category = $5, subcategory = $6, image_url = $7, images = $8,
           stock = $9, in_stock = $10, featured = $11, rating = $12,
           review_count = $13, colors = $14, sizes = $15, tags = $16,
           updated_at = NOW()
       WHERE id = $17
       RETURNING *`, [
            name, description, price, original_price, category, subcategory,
            image_url, images, stock, in_stock, featured, rating, review_count,
            colors, sizes, tags, id
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};
exports.updateProduct = updateProduct;
// Delete a product by ID
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await supabase_1.default.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
