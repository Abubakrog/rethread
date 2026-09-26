import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import connectDB from '../config/db.js';

dotenv.config();

const users = [
  {
    name: 'Rethread Admin',
    email: 'admin@rethread.eco',
    password: 'password123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bio: 'Platform curator & sustainable fashion advocate at Rethread.',
    city: 'Bengaluru',
    ecoPoints: 450,
  },
  {
    name: 'Aarav Mehta',
    email: 'aarav@rethread.eco',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'Vintage archivist & streetwear collector. Selling gems from the 90s and 2000s.',
    city: 'Mumbai',
    ecoPoints: 280,
  },
  {
    name: 'Priya Sharma',
    email: 'priya@rethread.eco',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    bio: 'Minimalist closet declutterer. Loving linen, indie knits, and slow living.',
    city: 'Delhi',
    ecoPoints: 190,
  },
];

const sampleProducts = [
  {
    title: "Vintage 90s Levi's 501 Straight Leg Denim",
    description: "Authentic 1990s vintage Levi's 501 jeans in a washed light blue indigo. Features classic button fly, copper rivets, and a perfectly natural vintage fade that modern jeans cannot replicate.",
    story: "Discovered at a thrift fair in Pondicherry 3 years ago. Beautifully worn in with zero tears. Passing it on to someone who cherishes genuine 90s denim.",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Denim & Jeans",
    gender: "Unisex",
    size: "M",
    condition: "Gently Used",
    brand: "Levi's",
    material: "100% Rigid Cotton Denim",
    color: "Light Indigo Wash",
    price: 1499,
    originalPrice: 4999,
    waterSavedLitres: 7600,
    co2OffsetKg: 8.5,
    isFeatured: true,
    rating: 4.9,
    numReviews: 4,
  },
  {
    title: "Retro Corduroy Overshirt in Rust Terracotta",
    description: "Heavyweight chunky corduroy overshirt with dual flap chest pockets and tortoiseshell buttons. Ideal for layering over plain white tees during crisp evenings.",
    story: "Worn during two road trips across Himachal. Super cozy and durable, looks great layered over hoodies or shirts.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Jackets & Coats",
    gender: "Men",
    size: "L",
    condition: "Like New",
    brand: "Urban Outfitter Thrift",
    material: "100% Cotton Corduroy",
    color: "Rust Brown",
    price: 1199,
    originalPrice: 3499,
    waterSavedLitres: 5200,
    co2OffsetKg: 6.2,
    isFeatured: true,
    rating: 4.8,
    numReviews: 2,
  },
  {
    title: "Hand-Knitted Chunky Cable Knit Sweater",
    description: "Thick, warm, cream-colored wool cable knit jumper with ribbed cuffs and collar. Relaxed dropped shoulders for that classic effortless thrift silhouette.",
    story: "Handcrafted pure wool jumper kept in pristine condition. Super warm and soft against the skin, no pilling.",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Sweaters & Knits",
    gender: "Unisex",
    size: "L",
    condition: "Like New",
    brand: "Handmade Artisanal",
    material: "Pure Wool Blend",
    color: "Oatmeal Cream",
    price: 1350,
    originalPrice: 4200,
    waterSavedLitres: 3800,
    co2OffsetKg: 7.1,
    isFeatured: true,
    rating: 5.0,
    numReviews: 5,
  },
  {
    title: "Boho Floral Prairie Midi Dress with Puff Sleeves",
    description: "Whimsical botanical print midi dress featuring sweet puff sleeves, sweetheart neckline, and a breathable flowy tier. Made from eco-friendly rayon modal.",
    story: "Bought for a friend's outdoor garden wedding and only worn twice. Freshly laundered and looking for more sunny brunches.",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Dresses & Skirts",
    gender: "Women",
    size: "S",
    condition: "Like New",
    brand: "Zara Woman",
    material: "100% Eco Viscose",
    color: "Olive Sage & Florals",
    price: 899,
    originalPrice: 2990,
    waterSavedLitres: 2900,
    co2OffsetKg: 4.8,
    isFeatured: true,
    rating: 4.7,
    numReviews: 3,
  },
  {
    title: "Vintage Carhartt Duck Canvas Work Jacket",
    description: "Original distressed workwear jacket with heavy brass zipper, corduroy collar, and blanket lining. Authentic patina with subtle distressing that collectors hunt for.",
    story: "Imported vintage piece. Extremely sturdy, windproof, and gets better with every wear.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Jackets & Coats",
    gender: "Unisex",
    size: "XL",
    condition: "Vintage Distressed",
    brand: "Carhartt",
    material: "12oz Heavyweight Duck Canvas",
    color: "Camel Tan",
    price: 2699,
    originalPrice: 9500,
    waterSavedLitres: 8900,
    co2OffsetKg: 14.5,
    isFeatured: true,
    rating: 5.0,
    numReviews: 6,
  },
  {
    title: "Y2K Baggy Multi-Pocket Cargo Trousers",
    description: "Relaxed wide-leg cargo pants featuring 6 utilitarian pockets, adjustable ankle drawstrings, and contrast topstitching. High waist fit.",
    story: "Worn throughout college festivals. Very comfortable, perfect for skate / streetwear aesthetics.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Pants & Trousers",
    gender: "Unisex",
    size: "M",
    condition: "Gently Used",
    brand: "Dickies Vintage",
    material: "Cotton Ripstop",
    color: "Army Olive Green",
    price: 999,
    originalPrice: 2800,
    waterSavedLitres: 3400,
    co2OffsetKg: 5.2,
    isFeatured: true,
    rating: 4.6,
    numReviews: 2,
  },
  {
    title: "90s Acid Wash Oversized Graphic Tee",
    description: "Washed charcoal grey vintage band tee with distressed collar and cracked retro graphic print. Soft broken-in single-stitch drape.",
    story: "One of my all-time favorite thrift pickups from a flea market in Colaba.",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Tops & T-Shirts",
    gender: "Unisex",
    size: "L",
    condition: "Gently Used",
    brand: "Vintage Band Merch",
    material: "100% Combed Cotton",
    color: "Acid Wash Charcoal",
    price: 649,
    originalPrice: 1999,
    waterSavedLitres: 2600,
    co2OffsetKg: 3.1,
    isFeatured: false,
    rating: 4.8,
    numReviews: 3,
  },
  {
    title: "Pure Mulberry Silk Printed Button-Down Shirt",
    description: "Featherlight 100% vintage silk shirt with ornate baroque floral print, mother of pearl buttons, and fluid relaxed drape. Luxurious second-hand find.",
    story: "Belonged to my uncle in the 90s, kept safely in a cedar chest. In immaculate condition.",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Tops & T-Shirts",
    gender: "Men",
    size: "M",
    condition: "Brand New with Tags",
    brand: "Tommy Hilfiger Vintage",
    material: "100% Mulberry Silk",
    color: "Gold & Navy",
    price: 1799,
    originalPrice: 6500,
    waterSavedLitres: 4200,
    co2OffsetKg: 5.8,
    isFeatured: true,
    rating: 5.0,
    numReviews: 1,
  },
  {
    title: "Distressed Sherpa-Lined Denim Trucker Jacket",
    description: "Classic rugged denim jacket with cozy faux-fur sherpa fleece lining, dual chest pockets, and side welt hand pockets.",
    story: "Ideal companion for winter bike rides and outdoor concerts. Very warm.",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Jackets & Coats",
    gender: "Women",
    size: "M",
    condition: "Gently Used",
    brand: "Wrangler",
    material: "Cotton Denim with Sherpa Lining",
    color: "Medium Blue",
    price: 1899,
    originalPrice: 5999,
    waterSavedLitres: 6700,
    co2OffsetKg: 10.2,
    isFeatured: false,
    rating: 4.7,
    numReviews: 4,
  },
  {
    title: "Pleated Linen High-Waist Trousers",
    description: "Breathable pure linen trousers with front double pleats, wide leg cut, and elastic back waistband for supreme comfort.",
    story: "Worn on a summer trip to Goa. Linen keeps you cool and only gets softer with washing.",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Pants & Trousers",
    gender: "Women",
    size: "S",
    condition: "Like New",
    brand: "Mango Thrift",
    material: "100% Pure Linen",
    color: "Natural Sand Beige",
    price: 1099,
    originalPrice: 3500,
    waterSavedLitres: 3100,
    co2OffsetKg: 3.9,
    isFeatured: false,
    rating: 4.9,
    numReviews: 2,
  },
  {
    title: "Vintage Brown Leather Biker Boots",
    description: "Full-grain distressed brown leather boots with Goodyear welted rubber lug soles. Broken in beautifully without sole wear.",
    story: "Rugged and timeless. Kept conditioned with natural beeswax leather cream.",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Shoes & Accessories",
    gender: "Unisex",
    size: "L",
    condition: "Gently Used",
    brand: "Red Wing Vintage",
    material: "Full Grain Leather",
    color: "Chestnut Brown",
    price: 2499,
    originalPrice: 8999,
    waterSavedLitres: 6100,
    co2OffsetKg: 11.0,
    isFeatured: false,
    rating: 4.9,
    numReviews: 3,
  },
  {
    title: "Embroidered Velvet Festive Kurti / Tunic",
    description: "Rich emerald green velvet tunic adorned with delicate gold zari embroidery on the yoke and sleeves. Perfect festive upcycled statement piece.",
    story: "Worn for one Diwali dinner. Stored in muslin cloth, zero blemishes.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Dresses & Skirts",
    gender: "Women",
    size: "M",
    condition: "Brand New with Tags",
    brand: "Fabindia Heritage",
    material: "Silk Velvet with Zari",
    color: "Emerald Green",
    price: 1650,
    originalPrice: 5200,
    waterSavedLitres: 4500,
    co2OffsetKg: 5.5,
    isFeatured: false,
    rating: 5.0,
    numReviews: 2,
  },
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('[Seeder] Cleared previous database records.');

    // Create users
    const createdUsers = await User.create(users);
    const sellerUser = createdUsers[1]._id; // Aarav Mehta
    const buyerUser = createdUsers[2]._id;  // Priya Sharma

    // Map products with seller ID and sample reviews
    const productsWithSeller = sampleProducts.map((p, index) => {
      return {
        ...p,
        seller: index % 2 === 0 ? sellerUser : createdUsers[0]._id,
        reviews: [
          {
            user: buyerUser,
            name: 'Priya S.',
            rating: 5,
            comment: 'Absolutely stunning condition! Fast delivery and packaged in recycled paper.',
          },
        ],
      };
    });

    await Product.insertMany(productsWithSeller);

    console.log('[Seeder] Successfully imported demo users and thrift clothing catalog!');
    console.log('--- Demo Accounts ---');
    console.log('Admin:  admin@rethread.eco  | password: password123');
    console.log('Seller: aarav@rethread.eco  | password: password123');
    console.log('Buyer:  priya@rethread.eco  | password: password123');
    process.exit();
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('[Seeder] All database records deleted!');
    process.exit();
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
