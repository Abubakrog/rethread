import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="pb-6 border-b border-stone-200">
        <h1 className="text-3xl font-display font-bold text-stone-900">
          Saved Thrift Pieces
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          {wishlist.length} pre-loved garment{wishlist.length === 1 ? '' : 's'} saved to your personal rack.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="max-w-md mx-auto py-24 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-display text-stone-800">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-stone-500 mt-2 mb-6">
            Tap the heart on any one-of-a-kind piece to keep an eye on it.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-rethread-700 hover:bg-rethread-800 text-white rounded-full text-xs font-semibold shadow transition"
          >
            <span>Explore Drops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {wishlist.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
