import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Upload single image
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded' });
  }
  const cleanPath = `/${req.file.path.replace(/\\/g, '/')}`;
  res.status(200).json({
    message: 'Image uploaded successfully',
    url: cleanPath,
  });
});

// Upload multiple images
router.post('/multiple', protect, upload.array('images', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No images uploaded' });
  }
  const urls = req.files.map((file) => `/${file.path.replace(/\\/g, '/')}`);
  res.status(200).json({
    message: 'Images uploaded successfully',
    urls,
  });
});

export default router;
