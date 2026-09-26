import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, Heart, Shield, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rethread-600 flex items-center justify-center text-white">
                <Leaf className="w-5 h-5 text-emerald-300 transform -rotate-12" />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight text-stone-100">
                rethread<span className="text-vintage-terracotta">.</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Every garment has a past and deserves a future. Rethread is the conscious marketplace
              to thrift, sell, and extend the lifespan of quality vintage & pre-loved fashion.
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400 pt-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Recycle className="w-4 h-4" /> 100% Circular
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <Sparkles className="w-4 h-4" /> Verified Vintage
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <Shield className="w-4 h-4" /> Buyer Protected
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-100 mb-4">
              Explore Drops
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop?category=Vintage%20%26%20Rare" className="hover:text-emerald-400 transition">
                  Vintage & Rare
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Denim%20%26%20Jeans" className="hover:text-emerald-400 transition">
                  Denim & Levi's
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Jackets%20%26%20Coats" className="hover:text-emerald-400 transition">
                  Jackets & Outerwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Sweaters%20%26%20Knits" className="hover:text-emerald-400 transition">
                  Knitwear & Sweaters
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=Women" className="hover:text-emerald-400 transition">
                  Women's Edit
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=Men" className="hover:text-emerald-400 transition">
                  Men's Edit
                </Link>
              </li>
            </ul>
          </div>

          {/* Sell & Community */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-100 mb-4">
              Community & Sell
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/sell" className="text-emerald-400 font-medium hover:underline">
                  + List an Item for Sale
                </Link>
              </li>
              <li>
                <Link to="/eco-impact" className="hover:text-emerald-400 transition">
                  Eco Impact Counter
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-emerald-400 transition">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-emerald-400 transition">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition">
                  Demo Accounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Eco Pledge & Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-100 mb-4">
              Weekly Thrift Drop
            </h4>
            <p className="text-xs text-stone-400 mb-3">
              Subscribe to get notified when freshly curated vintage pieces land.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Rethread thrift drops!'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 text-xs bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-rethread-600 hover:bg-rethread-500 text-white text-xs font-semibold rounded-lg transition"
              >
                Join the Drop List
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Rethread Marketplace. Built with MERN Stack.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Semester 3 Full Stack Project</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Heart className="w-3.5 h-3.5 fill-emerald-400" /> Circular Fashion
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
