import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please provide product title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    story: {
      type: String,
      default: 'A pre-loved classic looking for its next adventure in your wardrobe.',
    },
    images: {
      type: [String],
      required: [true, 'Please add at least one product photo'],
      validate: [(v) => v.length > 0, 'At least one image is required'],
    },
    category: {
      type: String,
      required: [true, 'Please choose a category'],
      enum: [
        'Tops & T-Shirts',
        'Denim & Jeans',
        'Jackets & Coats',
        'Dresses & Skirts',
        'Sweaters & Knits',
        'Pants & Trousers',
        'Vintage & Rare',
        'Shoes & Accessories',
      ],
    },
    gender: {
      type: String,
      required: true,
      enum: ['Women', 'Men', 'Unisex', 'Kids'],
      default: 'Unisex',
    },
    size: {
      type: String,
      required: [true, 'Please specify size'],
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'],
    },
    condition: {
      type: String,
      required: true,
      enum: ['Brand New with Tags', 'Like New', 'Gently Used', 'Vintage Distressed'],
      default: 'Gently Used',
    },
    brand: {
      type: String,
      default: 'Vintage / Unbranded',
      trim: true,
    },
    material: {
      type: String,
      default: 'Cotton Blend',
    },
    color: {
      type: String,
      default: 'Multi',
    },
    price: {
      type: Number,
      required: [true, 'Please set a price'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['available', 'reserved', 'sold'],
      default: 'available',
    },
    waterSavedLitres: {
      type: Number,
      default: 2500, // Average thrift clothing saves ~2,000-3,000L water
    },
    co2OffsetKg: {
      type: Number,
      default: 3.5, // Average ~3.5kg CO2 diverted per garment
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 4.8,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual discount percentage
productSchema.virtual('discountPercent').get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
