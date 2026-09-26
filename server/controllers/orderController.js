import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      waterSavedTotal,
      co2SavedTotal,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      buyer: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      waterSavedTotal: waterSavedTotal || orderItems.length * 2700,
      co2SavedTotal: co2SavedTotal || orderItems.length * 3.5,
      isPaid: paymentMethod !== 'Cash on Delivery (COD)',
      paidAt: paymentMethod !== 'Cash on Delivery (COD)' ? Date.now() : null,
      paymentResult: {
        id: `MOCK_TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        status: 'Completed',
        update_time: new Date().toISOString(),
        email_address: req.user.email,
      },
    });

    const createdOrder = await order.save();

    // Mark products as sold
    const productIds = orderItems.map((item) => item.product);
    await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { status: 'sold' } }
    );

    // Reward buyer with eco points for saving garments from landfill
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { ecoPoints: orderItems.length * 50 },
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name email phone avatar')
      .populate('orderItems.seller', 'name email city');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check authorization: buyer, seller of an item in order, or admin
    const isBuyer = order.buyer._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    const isSeller = order.orderItems.some(
      (item) => item.seller && item.seller._id.toString() === req.user._id.toString()
    );

    if (!isBuyer && !isAdmin && !isSeller) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id || `TXN_${Date.now()}`,
        status: req.body.status || 'COMPLETED',
        update_time: req.body.update_time || new Date().toISOString(),
        email_address: req.body.email_address || req.user.email,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Processing, Shipped, Delivered)
// @route   PUT /api/orders/:id/status
// @access  Private (Admin or Seller)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = status;
      if (status === 'Delivered') {
        order.deliveredAt = Date.now();
        if (order.paymentMethod === 'Cash on Delivery (COD)') {
          order.isPaid = true;
          order.paidAt = Date.now();
        }
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get orders containing items sold by the logged in seller
// @route   GET /api/orders/seller-orders
// @access  Private
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      'orderItems.seller': req.user._id,
    })
      .populate('buyer', 'name email city')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('buyer', 'id name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
