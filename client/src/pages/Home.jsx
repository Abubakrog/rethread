import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Leaf,
  ShieldCheck,
  RefreshCw,
  Coins,
  TrendingUp,
} from 'lucide-react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import EcoImpactBanner from '../components/EcoImpactBanner';

const categories = [
  {
    name: 'Vintage & Rare',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80',
    color: 'from-amber-900/60 to-black/80',
  },
  {
    name: 'Denim & Jeans',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80',
    color: 'from-blue-900/60 to-black/80',
  },
  {
    name: 'Jackets & Coats',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80',
    color: 'from-stone-900/60 to-black/80',
  },
  {
    name: 'Sweaters & Knits',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=80',
    color: 'from-emerald-900/60 to-black/80',
  },
  {
    name: 'Dresses & Skirts',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=80',
    color: 'from-rose-900/60 to-black/80',
  },
  {
    name: 'Pants & Trousers',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=80',
    color: 'from-stone-800/60 to-black/80',
  },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/products/featured');
        setFeaturedProducts(data || []);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-vintage-sand/60 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>Circular Fashion Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-stone-900 leading-[1.15]">
                Wear the story. <br />
                <span className="italic font-normal text-rethread-700">Rethread</span> the future.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover authentic 90s vintage, timeless streetwear, and pre-loved garments.
                Each piece gives great clothes another chance while saving thousands of litres of water.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-rethread-700 hover:bg-rethread-800 text-white font-medium text-sm shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Recent Drops</span>
                </Link>

                <Link
                  to="/sell"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 font-medium text-sm border border-stone-300 shadow-sm hover:shadow transition flex items-center justify-center gap-2"
                >
                  <span>Sell Pre-Loved Clothes</span>
                  <ArrowRight className="w-4 h-4 text-stone-500" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-stone-800 font-display">100%</p>
                  <p className="text-xs text-stone-500">Authentic Thrift</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-rethread-700 font-display">2,700L</p>
                  <p className="text-xs text-stone-500">Avg. Water Saved</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-stone-800 font-display">70% Off</p>
                  <p className="text-xs text-stone-500">Retail Prices</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-1 hover:rotate-0 transition duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80"
                    alt="Vintage Levi's Denim"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-vintage-terracotta rounded">
                      Featured Pick
                    </span>
                    <h3 className="text-lg font-bold font-display mt-1">Vintage 90s Levi's 501 Straight</h3>
                    <p className="text-xs text-stone-200">Saved 7,600L water • ₹1,499</p>
                  </div>
                </div>

                {/* Overlaid Floating Pill Badge */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">+50 Eco Points</p>
                    <p className="text-[10px] text-stone-500">Per garment bought or sold</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-stone-800">Fresh Drops Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-rethread-700">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 mt-1">
              Shop by Aesthetic & Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-semibold text-rethread-700 hover:text-rethread-800 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-80 group-hover:opacity-90 transition`} />
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                <span className="text-xs font-bold font-display tracking-wide group-hover:translate-x-0.5 transition">
                  {cat.name}
                </span>
                <span className="text-[10px] text-stone-300 opacity-0 group-hover:opacity-100 transition duration-200">
                  Shop now &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Drops Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Freshly Dropped
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 mt-1">
              Curated One-of-a-Kind Finds
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-semibold text-rethread-700 hover:text-rethread-800 flex items-center gap-1 group"
          >
            <span>Explore All Clothes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-stone-200 animate-pulse aspect-[3/4] rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Eco Impact Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EcoImpactBanner />
      </div>

      {/* Why Rethread Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-rethread-700">
            How It Works
          </span>
          <h2 className="text-3xl font-display font-bold text-stone-900 mt-1">
            Circular Fashion, Made Effortless
          </h2>
          <p className="mt-2 text-stone-600 text-sm">
            We make buying and selling second-hand clothes transparent, reliable, and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-stone-900 mb-2">
              1. Declutter & Sell in Minutes
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Snap a few photos of your pre-loved jacket, jeans, or tees. Share their story, set your price,
              and find them a loving new home.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-stone-900 mb-2">
              2. Verified Quality & Condition
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Every piece carries transparent condition grades (from Brand New With Tags to Distressed Vintage)
              with real fabric measurements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-stone-900 mb-2">
              3. Earn Eco Points & Save
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Score up to 70% off retail prices on designer and vintage brands. Earn Eco Points on every
              purchase to unlock thrift perks.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rethread-800 via-rethread-700 to-rethread-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-300">
              Join the Circular Movement
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Ready to give your unworn clothes a new story?
            </h2>
            <p className="text-stone-300 text-sm">
              List in under 3 minutes. Zero listing fees, instant thrift payout, and immediate positive eco-impact.
            </p>
          </div>

          <Link
            to="/sell"
            className="px-8 py-3.5 bg-vintage-terracotta hover:bg-vintage-rust text-white text-sm font-bold rounded-full shadow-lg transition transform hover:scale-105 whitespace-nowrap"
          >
            Start Selling Now &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
