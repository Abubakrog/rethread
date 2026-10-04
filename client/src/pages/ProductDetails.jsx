import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Droplets,
  CloudRain,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  Star,
  ArrowLeft,
} from 'lucide-react';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isSaved } = useWishlist();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product details:', err);
        toast.error('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-stone-200 animate-pulse aspect-square rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-8 bg-stone-200 animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-stone-200 animate-pulse rounded w-1/4"></div>
            <div className="h-24 bg-stone-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold font-display">Item not found</h2>
        <p className="text-sm text-stone-500 mt-2">This garment may have already found a new home.</p>
        <Link to="/shop" className="mt-4 inline-block px-6 py-2 bg-rethread-700 text-white rounded-full text-xs font-semibold">
          Explore Other Drops
        </Link>
      </div>
    );
  }

  const saved = isSaved(product._id);
  const inCart = cartItems.some((item) => item.product === product._id);
  const isSold = product.status === 'sold';

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleBuyNow = () => {
    if (!inCart) {
      addToCart(product);
    }
    navigate('/checkout');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmittingReview(true);
    try {
      await api.post(`/products/${product._id}/reviews`, { rating, comment });
      toast.success('Thank you for your review! 🌿');
      setComment('');
      // Refresh product
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-4 sm:mb-8 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to drops
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
            {isSold && (
              <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <span className="px-5 py-2 bg-stone-900 text-white font-bold uppercase tracking-widest text-xs sm:text-sm rounded-lg border border-stone-700">
                  Sold Out
                </span>
              </div>
            )}
            {discount && !isSold && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 bg-vintage-terracotta text-white font-bold text-xs rounded-full shadow">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                    selectedImage === idx
                      ? 'border-rethread-700 ring-2 ring-rethread-400'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase actions */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
              <span className="uppercase tracking-widest font-bold text-rethread-800">
                {product.brand || 'Vintage Archive'}
              </span>
              <span className="text-stone-400">{product.gender} • {product.category}</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-display font-bold text-stone-900 leading-snug">
              {product.title}
            </h1>

            {/* Price Box */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mt-3 sm:mt-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm sm:text-base text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount && (
                <span className="text-[11px] sm:text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Thrift price ({discount}% off)
                </span>
              )}
            </div>
          </div>

          {/* Condition & Size Key Specs */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 p-3.5 sm:p-4 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                Condition
              </span>
              <span className="text-xs sm:text-sm font-semibold text-stone-800 flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{product.condition}</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                Size
              </span>
              <span className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5 block truncate">
                {product.size} ({product.gender})
              </span>
            </div>
          </div>

          {/* Eco Impact Diverted Box */}
          <div className="p-3.5 sm:p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-2">
              <Droplets className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Circular Fashion Footprint Saved
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs text-emerald-800">
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                <span className="font-bold text-xs sm:text-sm text-emerald-900">
                  {(product.waterSavedLitres || 2500).toLocaleString()}L
                </span>
                <span className="text-[11px]">Water Saved</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                <span className="font-bold text-xs sm:text-sm text-emerald-900">
                  {product.co2OffsetKg || 3.5} kg
                </span>
                <span className="text-[11px]">CO₂ Diverted</span>
              </div>
            </div>
          </div>

          {/* Action CTAs (Mobile Responsive) */}
          <div className="space-y-3 pt-1">
            {!isSold ? (
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <div className="flex gap-2 flex-1">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={inCart}
                    className={`flex-1 py-3 sm:py-3.5 px-4 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition ${
                      inCart
                        ? 'bg-stone-200 text-stone-700 cursor-default'
                        : 'bg-rethread-700 hover:bg-rethread-800 text-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{inCart ? 'In Eco-Bag' : 'Add to Eco-Bag'}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-3 sm:p-3.5 rounded-full border border-stone-300 hover:border-stone-400 bg-white text-stone-700 shadow-sm transition shrink-0"
                    title="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${saved ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto px-8 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm bg-vintage-terracotta hover:bg-vintage-rust text-white shadow-md transition text-center"
                >
                  Buy Now
                </button>
              </div>
            ) : (
              <div className="p-3.5 bg-stone-100 rounded-2xl text-center text-xs sm:text-sm font-semibold text-stone-600">
                This piece has found a loving new home!
              </div>
            )}
          </div>

          {/* Garment Backstory */}
          <div className="border-t border-stone-200 pt-4 sm:pt-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              The Garment's Story
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic bg-vintage-sand/50 p-3.5 sm:p-4 rounded-2xl border border-stone-200/60">
              "{product.story || 'A cherished closet gem searching for its next chapter.'}"
            </p>
          </div>

          {/* Details & Specs */}
          <div className="border-t border-stone-200 pt-4 sm:pt-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Product Details
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 pt-2">
              <div><strong className="text-stone-800">Material:</strong> {product.material || '100% Cotton'}</div>
              <div><strong className="text-stone-800">Color:</strong> {product.color || 'Multi'}</div>
            </div>
          </div>

          {/* Seller Card */}
          {product.seller && (
            <div className="border-t border-stone-200 pt-4 sm:pt-6">
              <h3 className="text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-2">
                Curated by
              </h3>
              <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <img
                  src={product.seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
                  alt={product.seller.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-rethread-600 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">{product.seller.name}</h4>
                  <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                    {product.seller.city || 'India'}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 justify-end">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>4.9</span>
                  </div>
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold mt-0.5 inline-block">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-200 text-center text-[10px] sm:text-[11px] text-stone-500">
            <div className="flex flex-col items-center">
              <Truck className="w-4 h-4 text-stone-700 mb-1" />
              <span>Eco Packaging</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-stone-700 mb-1" />
              <span>Buyer Protected</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-4 h-4 text-stone-700 mb-1" />
              <span>Verified Thrift</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-stone-200">
        <div className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900 mb-4 sm:mb-6">
            Thrift Community Reviews ({product.reviews?.length || 0})
          </h2>

          {/* Add Review */}
          {user ? (
            <form onSubmit={handleReviewSubmit} className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 mb-6 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-stone-800">Leave a review for this piece</h3>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          star <= rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Your Feedback</label>
                <textarea
                  rows="2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details on fit, fabric feel, or condition..."
                  className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="px-4 py-2 bg-rethread-700 hover:bg-rethread-800 text-white text-xs font-semibold rounded-full shadow"
              >
                {submittingReview ? 'Posting...' : 'Post Review'}
              </button>
            </form>
          ) : (
            <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600 mb-6">
              <Link to="/login" className="font-bold text-rethread-700 underline">
                Sign in
              </Link>{' '}
              to leave a review on thrift items.
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-3">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-2xl border border-stone-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-stone-800">{rev.name}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-400 italic">No reviews yet for this listing.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
