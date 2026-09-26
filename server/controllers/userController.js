import User from '../models/User.js';

// @desc    Toggle item in user's saved/wishlist
// @route   POST /api/users/wishlist/:id
// @access  Private
export const toggleSavedItem = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.id;

    const isSaved = user.savedItems.includes(productId);

    if (isSaved) {
      user.savedItems = user.savedItems.filter(
        (id) => id.toString() !== productId
      );
    } else {
      user.savedItems.push(productId);
    }

    await user.save();
    res.json({
      savedItems: user.savedItems,
      isSaved: !isSaved,
      message: isSaved ? 'Removed from saved items' : 'Saved to your wishlist!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's saved wishlist items
// @route   GET /api/users/wishlist
// @access  Private
export const getSavedItems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'savedItems',
      populate: { path: 'seller', select: 'name avatar city' },
    });
    res.json(user.savedItems || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete admin account' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
