import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ArrowRight,
  Droplets,
  CloudRain,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Leaf,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    subtotal,
    originalTotal,
    totalSavings,
    shippingPrice,
    totalPrice,
    waterSavedTotal,
    co2SavedTotal,
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold font-display text-stone-900">
          Your Eco-Bag is Empty
        </h2>
        <p className="text-sm text-stone-500 mt-2 max-w-sm mx-auto leading-relaxed">
          Pre-loved gems sell out fast since each item is one-of-a-kind. Explore current thrift drops now!
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-rethread-700 hover:bg-rethread-800 text-white font-semibold text-sm rounded-full shadow-md transition"
        >
          <span>Browse Available Drops</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-3xl font-display font-bold text-stone-900">
            Your Thrift Eco-Bag
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {cartItems.length} unique one-of-a-kind piece{cartItems.length > 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-stone-500 hover:text-red-600 transition"
        >
          Empty bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product}
              className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
            >
              <Link
                to={`/product/${item.product}`}
                className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden bg-stone-100 shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </Link>

              <div className="flex-1 space-y-1.5 text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rethread-800">
                  {item.brand || 'Vintage'}
                </span>
                <Link
                  to={`/product/${item.product}`}
                  className="block text-sm sm:text-base font-bold text-stone-900 hover:text-rethread-700 line-clamp-1"
                >
                  {item.title}
                </Link>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-stone-600 pt-1">
                  <span className="px-2 py-0.5 bg-stone-100 rounded text-[11px] font-semibold">
                    Size: {item.size}
                  </span>
                  <span className="px-2 py-0.5 bg-stone-100 rounded text-[11px]">
                    {item.condition}
                  </span>
                  <span className="text-stone-400">• Seller: {item.sellerName}</span>
                </div>

                {/* Eco Metric */}
                <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-emerald-700 font-medium pt-1">
                  <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Saves {(item.waterSavedLitres || 2500).toLocaleString()}L clean water</span>
                </div>
              </div>

              {/* Price & Remove */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                <div className="text-right">
                  <p className="text-lg font-bold text-stone-900">₹{item.price.toLocaleString()}</p>
                  {item.originalPrice > item.price && (
                    <p className="text-xs text-stone-400 line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeFromCart(item.product)}
                  className="text-stone-400 hover:text-red-500 p-1.5 transition"
                  title="Remove from bag"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Eco impact collective bar */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-950">This Order's Environmental Contribution</p>
                <p className="text-[11px] text-emerald-700">
                  You're keeping {cartItems.length} wearable piece{cartItems.length > 1 ? 's' : ''} out of landfills!
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-emerald-900 font-bold">
              <p>{waterSavedTotal.toLocaleString()}L Water Conserved</p>
              <p className="text-[11px] font-medium text-emerald-700">{co2SavedTotal} kg CO₂ Diverted</p>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <h2 className="text-base font-bold font-display text-stone-900">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString()}</span>
              </div>

              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Thrift Savings vs Retail</span>
                  <span>- ₹{totalSavings.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Eco Shipping (Recycled Mailer)</span>
                <span>
                  {shippingPrice === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${shippingPrice}`
                  )}
                </span>
              </div>

              {shippingPrice > 0 && (
                <p className="text-[10px] text-stone-400">
                  Add items worth ₹{999 - subtotal} more for free carbon-neutral shipping!
                </p>
              )}

              <div className="border-t border-stone-200 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-stone-900">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-stone-900">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                  <p className="text-[10px] text-stone-400">Includes all taxes</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-rethread-700 hover:bg-rethread-800 text-white font-bold text-sm rounded-full shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Perks */}
            <div className="pt-2 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
              <p className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-700" /> Dispatched within 24-48 hours
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" /> Buyer protection guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
