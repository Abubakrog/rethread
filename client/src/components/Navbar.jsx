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
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-stone-900/10">
      {/* Top Eco Announcement Bar */}
      <div className="bg-rethread-900 text-stone-200 text-xs h-8 px-4 flex items-center justify-center gap-2">
        <span className="truncate">Every piece is second-hand or vintage, with an honest condition grade</span>
        <Link to="/shop" className="shrink-0 text-stone-50 underline underline-offset-2 decoration-stone-500 hover:decoration-stone-50 transition-colors">
          New arrivals
        </Link>
      </div>

      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-rethread-700 flex items-center justify-center text-white">
                <Leaf className="w-4 h-4 -rotate-12" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-medium font-display text-rethread-900 block leading-tight">
                  rethread<span className="text-vintage-terracotta">.</span>
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Second-hand and vintage
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-stone-700">
              <Link to="/shop" className="hover:text-rethread-700 transition">
                Shop all
              </Link>
              <Link to="/shop?category=Vintage%20%26%20Rare" className="hover:text-rethread-700 transition">
                Vintage and rare
              </Link>
              <Link to="/shop?gender=Women" className="hover:text-rethread-700 transition">
                Women
              </Link>
              <Link to="/shop?gender=Men" className="hover:text-rethread-700 transition">
                Men
              </Link>
              <Link to="/eco-impact" className="hover:text-rethread-700 transition">
                Eco impact
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
                placeholder="Search"
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
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-rethread-700 hover:bg-rethread-800 text-white text-xs sm:text-sm font-medium shadow-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Sell</span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-1.5 sm:p-2 text-stone-600 hover:text-rethread-700 hover:bg-stone-100 rounded-full transition"
              title="Saved items"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 sm:top-1 sm:right-1 w-4 h-4 sm:w-4 sm:h-4 bg-vintage-terracotta text-white text-[11px] font-medium rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart / Eco-Bag */}
            <Link
              to="/cart"
              className="relative p-1.5 sm:p-2 text-stone-600 hover:text-rethread-700 hover:bg-stone-100 rounded-full transition"
              title="Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {itemsCount > 0 && (
                <span className="absolute top-0 right-0 sm:top-1 sm:right-1 w-4 h-4 sm:w-4 sm:h-4 bg-rethread-700 text-white text-[11px] font-medium rounded-full flex items-center justify-center">
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
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-stone-900/10"
                  />
                  <span className="hidden md:inline text-xs text-stone-700 max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-stone-900/10 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs text-stone-400 font-medium">Signed in as</p>
                      <p className="text-sm font-medium text-stone-800 truncate">{user.name}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-stone-500">
                        <Leaf className="w-3.5 h-3.5 text-rethread-700" />
                        <span className="tabular-nums">{user.ecoPoints || 50} Eco Points</span>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition"
                    >
                      <UserIcon className="w-4 h-4 text-stone-500" />
                      <span>Profile and closet</span>
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition"
                    >
                      <Package className="w-4 h-4 text-stone-500" />
                      <span>Purchases</span>
                    </Link>

                    <Link
                      to="/profile?tab=listings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition"
                    >
                      <Tag className="w-4 h-4 text-stone-500" />
                      <span>Your listings</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-stone-500" />
                        <span>Admin</span>
                      </Link>
                    )}

                    <div className="border-t border-stone-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-block text-xs sm:text-sm font-medium text-stone-700 hover:text-rethread-700 px-3 py-2 rounded-lg hover:bg-stone-100 transition"
              >
                Sign in
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
                placeholder="Search"
                className="w-full pl-9 pr-4 py-2 bg-white text-xs rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-5 top-2.5" />
            </form>

            {/* User status card on mobile */}
            {user ? (
              <div className="mx-2 p-3 bg-white rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-stone-900/10"
                  />
                  <div>
                    <p className="text-xs font-medium text-stone-900 leading-tight">{user.name}</p>
                    <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5 tabular-nums">
                      <Leaf className="w-3.5 h-3.5 text-rethread-700" />
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
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="px-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 bg-stone-900 text-white text-xs font-medium rounded-xl block text-center shadow"
                >
                  Sign in
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
                Shop all
              </Link>
              <Link
                to="/shop?category=Vintage%20%26%20Rare"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-stone-100"
              >
                Vintage and rare
              </Link>
              <Link
                to="/shop?gender=Women"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-stone-100"
              >
                Women
              </Link>
              <Link
                to="/shop?gender=Men"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-stone-100"
              >
                Men
              </Link>
              <Link
                to="/eco-impact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-stone-100"
              >
                Eco impact
              </Link>

              {user && (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl hover:bg-stone-100"
                  >
                    Profile and closet
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl hover:bg-stone-100"
                  >
                    Purchases
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-xl hover:bg-stone-100"
                    >
                      Admin
                    </Link>
                  )}
                </>
              )}

              <Link
                to="/sell"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-3 py-3 bg-rethread-700 text-white font-medium rounded-xl text-center shadow"
              >
                Sell your clothes
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
