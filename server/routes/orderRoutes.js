import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  getMyOrders,
  getSellerOrders,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);

router.get('/my-orders', protect, getMyOrders);
router.get('/seller-orders', protect, getSellerOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/status', protect, updateOrderStatus);

export default router;
