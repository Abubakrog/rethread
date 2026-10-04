import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  PlusCircle,
  Search,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  Leaf,
  LogOut,
  Package,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { itemsCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?keyword=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Eco Announcement Bar */}
      <div className="bg-rethread-800 text-stone-100 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-medium flex items-center justify-center gap-1.5 sm:gap-2">
        <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="truncate">
          Give pre-loved clothes a fresh life. Save ~2,700L water per item!
        </span>
        <Link to="/shop" className="underline underline-offset-2 hover:text-emerald-300 ml-1 shrink-0 font-semibold">
          Drops &rarr;
        </Link>
      </div>

      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rethread-700 flex items-center justify-center text-white shadow-sm group-hover:bg-rethread-800 transition">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 transform -rotate-12" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold font-display tracking-tight text-rethread-900 block leading-tight">
                  rethread<span className="text-vintage-terracotta">.</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-stone-500 uppercase block font-semibold">
                  Pre-loved & Vintage
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-stone-700">
              <Link to="/shop" className="hover:text-rethread-700 transition">
                Browse All
              </Link>
              <Link to="/shop?category=Vintage%20%26%20Rare" className="hover:text-rethread-700 transition flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Vintage & Rare
              </Link>
              <Link to="/shop?gender=Women" className="hover:text-rethread-700 transition">
                Women
              </Link>
              <Link to="/shop?gender=Men" className="hover:text-rethread-700 transition">
                Men
              </Link>
              <Link to="/eco-impact" className="hover:text-rethread-700 transition text-emerald-800">
                Eco Impact
              </Link>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xs mx-4 lg:mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vintage denim, jackets..."
                className="w-full pl-9 pr-4 py-2 bg-stone-100/90 hover:bg-stone-100 focus:bg-white text-xs sm:text-sm rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rethread-600 transition"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Sell Button */}
            <Link
              to="/sell"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-rethread-700 hover:bg-rethread-800 text-white text-xs sm:text-sm font-medium shadow-sm transition transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
              <span className="hidden xs:inline">Sell</span>
              <span className="hidden sm:inline">Clothes</span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-1.5 sm:p-2 text-stone-600 hover:text-rethread-700 hover:bg-stone-100 rounded-full transition"
              title="Saved items"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-vintage-terracotta text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart / Eco-Bag */}
            <Link
              to="/cart"
              className="relative p-1.5 sm:p-2 text-stone-600 hover:text-rethread-700 hover:bg-stone-100 rounded-full transition"
              title="Eco-Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {itemsCount > 0 && (
                <span className="absolute top-0 right-0 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-rethread-700 text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>

            {/* User Dropdown / Login (Desktop) */}
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-stone-100 border border-stone-200 transition focus:outline-none"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={user.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-rethread-500"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-stone-700 max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 animate-fadeIn"
                  >
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs text-stone-400 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-stone-800 truncate">{user.name}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                        <Leaf className="w-3 h-3 text-emerald-600" />
                        <span>{user.ecoPoints || 50} Eco Points</span>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition"
                    >
                      <UserIcon className="w-4 h-4 text-stone-500" />
                      <span>My Profile & Closet</span>
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition"
                    >
                      <Package className="w-4 h-4 text-stone-500" />
                      <span>My Purchases</span>
                    </Link>

                    <Link
                      to="/profile?tab=listings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition"
                    >
                      <Tag className="w-4 h-4 text-stone-500" />
                      <span>My Listed Clothes</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-amber-700 bg-amber-50/60 hover:bg-amber-100/60 transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <div className="border-t border-stone-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-block text-xs sm:text-sm font-semibold text-stone-700 hover:text-rethread-700 px-3 py-2 rounded-lg hover:bg-stone-100 transition"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-stone-600 hover:text-stone-900 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 py-3 space-y-3 bg-[#FAF7F2]">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-full px-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vintage denim, jackets..."
                className="w-full pl-9 pr-4 py-2 bg-white text-xs rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-5 top-2.5" />
            </form>

            {/* User status card on mobile */}
            {user ? (
              <div className="mx-2 p-3 bg-white rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-rethread-500"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900 leading-tight">{user.name}</p>
                    <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <Leaf className="w-3 h-3 text-emerald-600" />
                      {user.ecoPoints || 50} Eco Points
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="p-1.5 text-stone-400 hover:text-red-500"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="px-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl block text-center shadow"
                >
                  Sign In to Account
                </Link>
              </div>
            )}

            {/* Nav links */}
            <div className="flex flex-col space-y-1 px-2 text-xs font-medium text-stone-700">
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-stone-100"
              >
                Browse All Drops
              </Link>
              <Link
                to="/shop?category=Vintage%20%26%20Rare"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-stone-100 text-amber-800 font-semibold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Vintage & Rare Curated
              </Link>
              <Link
                to="/shop?gender=Women"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-stone-100"
              >
                Women's Thrift
              </Link>
              <Link
                to="/shop?gender=Men"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-stone-100"
              >
                Men's Thrift
              </Link>
              <Link
                to="/eco-impact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-emerald-50 text-emerald-800"
              >
                Eco Impact Tracker
              </Link>

              {user && (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl hover:bg-stone-100"
                  >
                    My Profile & Closet
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl hover:bg-stone-100"
                  >
                    My Purchases
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl bg-amber-50 text-amber-900 font-semibold"
                    >
                      Admin Console
                    </Link>
                  )}
                </>
              )}

              <Link
                to="/sell"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-3 py-2.5 bg-rethread-700 text-white font-semibold rounded-xl text-center shadow"
              >
                + Sell Your Clothes
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
