import express from 'express';
import {
  toggleSavedItem,
  getSavedItems,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/wishlist', protect, getSavedItems);
router.post('/wishlist/:id', protect, toggleSavedItem);
router.route('/').get(protect, admin, getAllUsers);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;
