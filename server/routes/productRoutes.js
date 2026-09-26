import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyListings,
  getFeaturedProducts,
  getEcoMetrics,
  createProductReview,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, createProduct);

router.get('/featured', getFeaturedProducts);
router.get('/eco-impact', getEcoMetrics);
router.get('/my-listings', protect, getMyListings);

router.route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

router.post('/:id/reviews', protect, createProductReview);

export default router;
