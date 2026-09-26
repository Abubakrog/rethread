import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Droplets,
  CloudRain,
  Printer,
  Package,
  ArrowRight,
  Truck,
  Leaf,
} from 'lucide-react';
import api from '../api/axios';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Launch festive confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#528254', '#cbdacb', '#C86446', '#D99B26'],
    });

    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error('Failed to load order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <div className="w-12 h-12 border-4 border-rethread-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-stone-500">Retrieving order confirmation...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold font-display">Order Not Found</h2>
        <Link to="/shop" className="mt-4 inline-block px-6 py-2 bg-rethread-700 text-white rounded-full text-xs font-semibold">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Top Success Badge */}
      <div className="text-center space-y-3 mb-10">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase tracking-widest font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
          Order #{order._id.substring(order._id.length - 8).toUpperCase()}
        </span>
        <h1 className="text-3xl font-display font-bold text-stone-900">
          Thank you for choosing thrift!
        </h1>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          We've notified the curators. Your order will be packed in 100% recyclable paper mailers and dispatched shortly.
        </p>
      </div>

      {/* Sustainability Impact Congratulations Box */}
      <div className="bg-rethread-900 text-white p-6 rounded-3xl mb-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
            <Leaf className="w-4 h-4" /> Eco Impact Milestone
          </div>
          <h3 className="text-lg font-bold font-display">
            You just kept {order.orderItems.length} garment{order.orderItems.length > 1 ? 's' : ''} out of landfills!
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-rethread-800 text-xs">
            <div>
              <p className="text-xl font-bold text-white font-display">
                {(order.waterSavedTotal || 2500).toLocaleString()} Litres
              </p>
              <p className="text-stone-300">Clean Water Saved</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white font-display">
                {order.co2SavedTotal || 3.5} kg
              </p>
              <p className="text-stone-300">Carbon Diverted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
          <div>
            <span className="text-xs text-stone-400">Order Placed</span>
            <p className="text-sm font-semibold text-stone-800">
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div>
            <span className="text-xs text-stone-400">Payment Status</span>
            <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {order.isPaid ? 'Paid Online' : 'Pay on Delivery'} ({order.paymentMethod})
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
          >
            <Printer className="w-3.5 h-3.5" /> Print Receipt
          </button>
        </div>

        {/* Items */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Garments in this Drop
          </h4>
          {order.orderItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-16 rounded-xl object-cover bg-stone-100"
                />
                <div>
                  <p className="text-sm font-bold text-stone-900 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-stone-500">Size: {item.size} • {item.condition}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-stone-900">
                ₹{item.price.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-stone-100 pt-4 space-y-2 text-xs text-stone-600">
          <div className="flex justify-between">
            <span>Items Subtotal</span>
            <span>₹{order.itemsPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Eco Shipping</span>
            <span>{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-100 pt-2">
            <span>Total Paid</span>
            <span>₹{order.totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Shipping address */}
        <div className="border-t border-stone-100 pt-4 text-xs text-stone-600">
          <h5 className="font-bold text-stone-800 mb-1">Delivering to:</h5>
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
          <p>{order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
          <p>Phone: {order.shippingAddress.phone}</p>
        </div>
      </div>

      {/* Bottom CTA links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <Link
          to="/orders"
          className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs rounded-full border border-stone-300 shadow-sm flex items-center justify-center gap-1.5"
        >
          <Package className="w-4 h-4" /> View My Orders
        </Link>
        <Link
          to="/shop"
          className="w-full sm:w-auto px-6 py-3 bg-rethread-700 hover:bg-rethread-800 text-white font-semibold text-xs rounded-full shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Continue Thrifting</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
