import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rethread-700 flex items-center justify-center text-white">
                <Leaf className="w-4 h-4 -rotate-12" />
              </div>
              <span className="text-2xl font-medium font-display text-stone-100">
                rethread<span className="text-vintage-terracotta">.</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              A marketplace for second-hand and vintage clothes. Buy what someone else has outgrown,
              sell what you no longer wear, and see the water each piece saves.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm text-stone-100 mb-4">
              Shop
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shop?category=Vintage%20%26%20Rare" className="hover:text-white transition">
                  Vintage and rare
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Denim%20%26%20Jeans" className="hover:text-white transition">
                  Denim
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Jackets%20%26%20Coats" className="hover:text-white transition">
                  Jackets and coats
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Sweaters%20%26%20Knits" className="hover:text-white transition">
                  Knitwear
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=Women" className="hover:text-white transition">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=Men" className="hover:text-white transition">
                  Men
                </Link>
              </li>
            </ul>
          </div>

          {/* Sell & Community */}
          <div>
            <h4 className="text-sm text-stone-100 mb-4">
              Sell
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/sell" className="text-stone-100 hover:text-white transition">
                  List an item
                </Link>
              </li>
              <li>
                <Link to="/eco-impact" className="hover:text-white transition">
                  Eco impact
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition">
                  Your listings
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Demo accounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Eco Pledge & Newsletter */}
          <div>
            <h4 className="text-sm text-stone-100 mb-4">
              New arrivals by email
            </h4>
            <p className="text-xs text-stone-400 mb-3">
              One email a week with what was listed.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed. Look out for the first email this week.'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full px-4 py-2 text-xs bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-rethread-400"
              />
              <button
                type="submit"
                className="w-full py-2 bg-rethread-600 hover:bg-rethread-500 text-white text-xs font-medium rounded-lg transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Rethread</p>
          <span>Semester 3 full stack project</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
