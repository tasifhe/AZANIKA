"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const router = express_1.default.Router();
// Route to get all products
router.get('/', products_1.getAllProducts);
// Route to get a single product by ID
router.get('/:id', products_1.getProductById);
// Route to create a new product
router.post('/', products_1.createProduct);
// Route to update an existing product
router.put('/:id', products_1.updateProduct);
// Route to delete a product
router.delete('/:id', products_1.deleteProduct);
exports.default = router;
