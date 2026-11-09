import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check, Droplets } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import HangTag from './HangTag';

const ProductCard = ({ product }) => {
  const { toggleWishlist, isSaved } = useWishlist();
  const { addToCart, cartItems } = useCart();

  const saved = isSaved(product._id);
  const inCart = cartItems.some((item) => item.product === product._id);
  const isSold = product.status === 'sold';
  const markedDown = product.originalPrice && product.originalPrice > product.price;

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSold && !inCart) addToCart(product);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative flex flex-col">
      {/* Photo */}
      <Link
        to={`/product/${product._id}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-stone-100"
      >
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600'}
          alt={product.title}
          className={`w-full h-full object-cover object-center ${isSold ? 'opacity-50 grayscale' : ''}`}
          loading="lazy"
        />

        <HangTag
          rows={[['Size', product.size], ['Condition', product.condition]]}
          className="absolute top-0 left-3 max-w-[70%]"
        />

        {isSold && (
          <span className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-stone-900 text-white text-[11px] font-medium">
            Sold
          </span>
        )}

        <button
          onClick={handleWishlistClick}
          aria-label={saved ? 'Remove from saved' : 'Save item'}
          aria-pressed={saved}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-white flex items-center justify-center transition-colors"
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-vintage-terracotta text-vintage-terracotta' : ''}`} />
        </button>

        {!isSold && (
          <button
            onClick={handleCartClick}
            disabled={inCart}
            aria-label={inCart ? 'In your bag' : 'Add to bag'}
            title={inCart ? 'In your bag' : 'Add to bag'}
            className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors active:scale-95 ${
              inCart ? 'bg-rethread-700 text-white' : 'bg-white/90 text-stone-700 hover:bg-rethread-700 hover:text-white'
            }`}
          >
            {inCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        )}
      </Link>

      {/* Details */}
      <div className="pt-3 flex-1 flex flex-col">
        <div className="flex items-baseline justify-between gap-2 text-xs text-stone-500">
          <span className="truncate">{product.brand || 'Vintage'}</span>
          <span className="truncate text-right">{product.category}</span>
        </div>

        <Link
          to={`/product/${product._id}`}
          className="mt-1 text-sm font-medium text-stone-900 hover:text-rethread-700 transition-colors line-clamp-1"
        >
          {product.title}
        </Link>

        <div className="mt-2 flex items-baseline justify-between gap-2">
          <span className="flex items-baseline gap-2 tabular-nums">
            <span className={`text-sm font-medium ${markedDown ? 'text-vintage-rust' : 'text-stone-900'}`}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {markedDown && (
              <span className="text-xs text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-stone-500 tabular-nums whitespace-nowrap">
            <Droplets className="w-3.5 h-3.5 text-stone-400" />
            {(product.waterSavedLitres || 2500).toLocaleString('en-IN')} L
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
