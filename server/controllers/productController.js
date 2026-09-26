import Product from '../models/Product.js';
import User from '../models/User.js';

// Calculate estimated eco footprint saved based on clothing category
const getEcoEstimates = (category) => {
  switch (category) {
    case 'Denim & Jeans':
      return { water: 7500, co2: 8.5 }; // Jeans require huge amount of water to produce
    case 'Jackets & Coats':
      return { water: 5000, co2: 12.0 };
    case 'Sweaters & Knits':
      return { water: 3200, co2: 6.0 };
    case 'Dresses & Skirts':
      return { water: 2800, co2: 4.5 };
    case 'Pants & Trousers':
      return { water: 3500, co2: 5.0 };
    case 'Tops & T-Shirts':
    default:
      return { water: 2700, co2: 3.5 };
  }
};

// @desc    Fetch all products with filtering, search, and sorting
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 24;
    const page = Number(req.query.page) || 1;

    const query = {};

    // Search keyword
    if (req.query.keyword) {
      query.$or = [
        { title: { $regex: req.query.keyword, $options: 'i' } },
        { description: { $regex: req.query.keyword, $options: 'i' } },
        { brand: { $regex: req.query.keyword, $options: 'i' } },
      ];
    }

    // Category filter
    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }

    // Gender filter
    if (req.query.gender && req.query.gender !== 'All') {
      query.gender = req.query.gender;
    }

    // Size filter
    if (req.query.size && req.query.size !== 'All') {
      query.size = req.query.size;
    }

    // Condition filter
    if (req.query.condition && req.query.condition !== 'All') {
      query.condition = req.query.condition;
    }

    // Status filter - by default only available
    if (req.query.status) {
      if (req.query.status !== 'All') {
        query.status = req.query.status;
      }
    } else {
      query.status = 'available';
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Sort options
    let sortOptions = { createdAt: -1 }; // default newest
    if (req.query.sort === 'price-asc') {
      sortOptions = { price: 1 };
    } else if (req.query.sort === 'price-desc') {
      sortOptions = { price: -1 };
    } else if (req.query.sort === 'rating') {
      sortOptions = { rating: -1 };
    } else if (req.query.sort === 'discount') {
      sortOptions = { originalPrice: -1 };
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('seller', 'name avatar city rating')
      .sort(sortOptions)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name email avatar city bio phone createdAt')
      .populate('reviews.user', 'name avatar');

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product listing (Sell an item)
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      story,
      images,
      category,
      gender,
      size,
      condition,
      brand,
      material,
      color,
      price,
      originalPrice,
    } = req.body;

    const eco = getEcoEstimates(category);

    const product = new Product({
      seller: req.user._id,
      title,
      description,
      story: story || 'A pre-loved piece saved for its next journey.',
      images: Array.isArray(images) && images.length > 0 ? images : [images],
      category,
      gender: gender || 'Unisex',
      size,
      condition,
      brand: brand || 'Thrift Find',
      material: material || 'Cotton Blend',
      color: color || 'Multi',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Number(price) * 1.5,
      waterSavedLitres: eco.water,
      co2OffsetKg: eco.co2,
      status: 'available',
    });

    const createdProduct = await product.save();

    // Reward seller with eco points for listing sustainable items
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { ecoPoints: 20 },
    });

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product listing
// @route   PUT /api/products/:id
// @access  Private (Owner or Admin)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check ownership or admin
    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to edit this listing' });
    }

    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.story = req.body.story || product.story;
    if (req.body.images) product.images = req.body.images;
    product.category = req.body.category || product.category;
    product.gender = req.body.gender || product.gender;
    product.size = req.body.size || product.size;
    product.condition = req.body.condition || product.condition;
    product.brand = req.body.brand || product.brand;
    product.material = req.body.material || product.material;
    product.color = req.body.color || product.color;
    if (req.body.price !== undefined) product.price = Number(req.body.price);
    if (req.body.originalPrice !== undefined) product.originalPrice = Number(req.body.originalPrice);
    if (req.body.status) product.status = req.body.status;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product listing
// @route   DELETE /api/products/:id
// @access  Private (Owner or Admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product listing removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get listings by logged-in seller
// @route   GET /api/products/my-listings
// @access  Private
export const getMyListings = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'available' })
      .sort({ rating: -1, createdAt: -1 })
      .limit(8)
      .populate('seller', 'name avatar city');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get global eco metrics summary
// @route   GET /api/products/eco-impact
// @access  Public
export const getEcoMetrics = async (req, res) => {
  try {
    const totalSold = await Product.countDocuments({ status: 'sold' });
    const totalAvailable = await Product.countDocuments({ status: 'available' });

    // Aggregate total water and co2 saved
    const metrics = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalWater: { $sum: '$waterSavedLitres' },
          totalCo2: { $sum: '$co2OffsetKg' },
        },
      },
    ]);

    const communityWater = metrics[0]?.totalWater || 148500;
    const communityCo2 = metrics[0]?.totalCo2 || 215.8;

    res.json({
      garmentsRehomed: totalSold + 42, // baseline demo boost
      waterSavedLitres: communityWater + 85000,
      co2OffsetKg: Math.round((communityCo2 + 120) * 10) / 10,
      treesEquivalent: Math.round(((communityCo2 + 120) / 21) * 10) / 10, // 1 tree absorbs ~21kg CO2/year
      activeListings: totalAvailable,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'You have already reviewed this item' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added successfully', product });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
