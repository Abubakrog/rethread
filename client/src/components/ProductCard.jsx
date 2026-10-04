import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Droplets, ShoppingBag, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isSaved } = useWishlist();
  const { addToCart, cartItems } = useCart();

  const saved = isSaved(product._id);
  const inCart = cartItems.some((item) => item.product === product._id);
  const isSold = product.status === 'sold';

  // Calculate discount percentage
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSold && !inCart) {
      addToCart(product);
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-rethread-400 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="relative block aspect-[4/5] overflow-hidden bg-stone-100">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600'}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Sold Overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center p-2 text-center">
            <span className="px-2.5 py-1 bg-stone-900 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md border border-stone-700">
              Sold Out
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start max-w-[70%]">
          {discount && !isSold && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold bg-vintage-terracotta text-white shadow-sm">
              {discount}% OFF
            </span>
          )}
          <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-stone-700 border border-stone-200 shadow-sm truncate">
            {product.condition}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label="Save item"
          className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-sm text-stone-700 hover:text-red-500 hover:bg-white shadow-sm transition"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition ${
              saved ? 'fill-red-500 text-red-500' : 'text-stone-600'
            }`}
          />
        </button>

        {/* Size Badge Bottom Left */}
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-stone-900/80 text-white backdrop-blur-sm">
            {product.size}
          </span>
        </div>

        {/* Quick Add Button Bottom Right */}
        {!isSold && (
          <button
            onClick={handleCartClick}
            disabled={inCart}
            title={inCart ? 'Already in bag' : 'Add to Bag'}
            className={`absolute bottom-2 right-2 p-1.5 sm:p-2 rounded-full shadow-md transition transform ${
              inCart
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-stone-800 hover:bg-rethread-700 hover:text-white group-hover:scale-105'
            }`}
          >
            {inCart ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        )}
      </Link>

      {/* Info Container */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-500 mb-1">
            <span className="font-semibold text-stone-600 truncate max-w-[90px] sm:max-w-[120px]">
              {product.brand || 'Vintage'}
            </span>
            <span className="text-[10px] text-stone-400 truncate max-w-[80px] text-right">{product.category}</span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product._id}`}
            className="block text-xs sm:text-sm font-semibold text-stone-800 hover:text-rethread-700 transition line-clamp-1 mb-1.5"
          >
            {product.title}
          </Link>
        </div>

        <div>
          {/* Eco metric */}
          <div className="flex items-center gap-1 text-[9px] sm:text-[11px] text-emerald-700 font-medium bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded mb-1.5 sm:mb-2.5 w-fit max-w-full">
            <Droplets className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="truncate">{(product.waterSavedLitres || 2500).toLocaleString()}L saved</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 sm:gap-2 pt-1 border-t border-stone-100">
            <span className="text-sm sm:text-base font-bold text-stone-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
