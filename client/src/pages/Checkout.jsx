import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Banknote,
  ShieldCheck,
  Truck,
  Leaf,
  Sparkles,
  ArrowRight,
  Lock,
} from 'lucide-react';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const {
    cartItems,
    clearCart,
    subtotal,
    shippingPrice,
    totalPrice,
    waterSavedTotal,
    co2SavedTotal,
  } = useCart();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '9876543210');
  const [street, setStreet] = useState('Flat 402, Green Meadows, 12th Main Road');
  const [city, setCity] = useState(user?.city || 'Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [postalCode, setPostalCode] = useState('560034');
  const [paymentMethod, setPaymentMethod] = useState('Mock Card / Net Banking');
  const [submitting, setSubmitting] = useState(false);

  // Demo auto-fill
  const handleAutoFill = () => {
    setFullName('Priya Sharma');
    setPhone('9876543210');
    setStreet('14, Indiranagar 100ft Road');
    setCity('Bengaluru');
    setState('Karnataka');
    setPostalCode('560038');
    toast.success('Address auto-filled for testing!');
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return navigate('/shop');
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          product: item.product,
          title: item.title,
          image: item.image,
          price: item.price,
          size: item.size,
          condition: item.condition,
          seller: item.seller,
        })),
        shippingAddress: {
          fullName,
          phone,
          street,
          city,
          state,
          postalCode,
          country: 'India',
        },
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice,
        totalPrice,
        waterSavedTotal,
        co2SavedTotal,
      };

      const { data } = await api.post('/orders', orderPayload);
      clearCart();
      await refreshUser();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not process order');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold font-display">No items in cart</h2>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 px-6 py-2.5 bg-rethread-700 text-white rounded-full text-xs font-semibold"
        >
          Explore Drops
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" /> Secure Checkout
          </span>
          <h1 className="text-3xl font-display font-bold text-stone-900 mt-1">
            Complete Your Eco-Order
          </h1>
        </div>

        <button
          type="button"
          onClick={handleAutoFill}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Demo Autofill Address</span>
        </button>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
        {/* Shipping Form & Payment Method */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-rethread-700" /> Shipping Destination
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Recipient full name"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bengaluru"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-stone-700 block mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="House/Apartment no., building, street area"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">PIN / Postal Code *</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal Code"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
                />
              </div>
            </div>
          </div>

          {/* Payment Selection */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-rethread-700" /> Payment Method
            </h2>

            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod('Mock Card / Net Banking')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'Mock Card / Net Banking'
                    ? 'border-rethread-700 bg-emerald-50/40'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Mock Card / Net Banking'}
                    onChange={() => setPaymentMethod('Mock Card / Net Banking')}
                    className="accent-rethread-700"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">
                      Mock Card / Net Banking (Instant Demo Gateway)
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Simulates instant payment & marks order paid immediately.
                    </p>
                  </div>
                </div>
                <CreditCard className="w-5 h-5 text-rethread-700" />
              </label>

              <label
                onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'Cash on Delivery (COD)'
                    ? 'border-rethread-700 bg-emerald-50/40'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Cash on Delivery (COD)'}
                    onChange={() => setPaymentMethod('Cash on Delivery (COD)')}
                    className="accent-rethread-700"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">
                      Cash on Delivery (COD)
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Pay cash/UPI directly at the doorstep upon parcel arrival.
                    </p>
                  </div>
                </div>
                <Banknote className="w-5 h-5 text-stone-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Order Review Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold font-display text-stone-900 pb-2 border-b border-stone-100">
              Items in Order ({cartItems.length})
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.product} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-14 object-cover rounded-xl bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-stone-800 truncate">{item.title}</p>
                    <p className="text-[11px] text-stone-400">Size: {item.size} • {item.condition}</p>
                  </div>
                  <span className="text-xs font-bold text-stone-900">
                    ₹{item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-stone-100 pt-4 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Eco Shipping</span>
                <span className="font-semibold text-stone-900">
                  {shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}
                </span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between items-baseline">
                <span className="text-sm font-bold text-stone-900">Total Payable</span>
                <span className="text-xl font-black text-stone-900">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Eco Points Reward Notice */}
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
              <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>You'll earn <strong>+{cartItems.length * 50} Eco Points</strong> with this thrift order!</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-rethread-700 hover:bg-rethread-800 text-white font-bold text-sm rounded-full shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>{submitting ? 'Processing Order...' : 'Place Eco Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
