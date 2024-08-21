import express from 'express';
import { getProducts, addProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/add', addProduct); // Admin only

export default router;
