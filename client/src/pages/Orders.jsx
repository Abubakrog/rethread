import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, Clock, MapPin, ExternalLink } from 'lucide-react';
import api from '../api/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('purchases');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const [purchasesRes, salesRes] = await Promise.all([
          api.get('/orders/my-orders'),
          api.get('/orders/seller-orders'),
        ]);
        setOrders(purchasesRes.data || []);
        setSellerOrders(salesRes.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Shipped':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Processing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const currentList = activeTab === 'purchases' ? orders : sellerOrders;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="pb-6 border-b border-stone-200">
        <h1 className="text-3xl font-display font-bold text-stone-900">
          Order Center
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Track previous thrift purchases, seller deliveries, and item status.
        </p>

        {/* Tab Switcher */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setActiveTab('purchases')}
            className={`pb-2 text-xs font-bold border-b-2 transition ${
              activeTab === 'purchases'
                ? 'border-rethread-700 text-rethread-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            My Purchases ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`pb-2 text-xs font-bold border-b-2 transition ${
              activeTab === 'sales'
                ? 'border-rethread-700 text-rethread-900'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            Items I've Sold ({sellerOrders.length})
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-40 bg-stone-200 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : currentList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto">
            <Package className="w-12 h-12 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-bold font-display text-stone-800">
              No orders found in this tab
            </h3>
            <p className="text-xs text-stone-500 mt-1 mb-6">
              {activeTab === 'purchases'
                ? "You haven't placed any thrift orders yet."
                : "You haven't made any sales yet. List a garment to get started!"}
            </p>
            <Link
              to={activeTab === 'purchases' ? '/shop' : '/sell'}
              className="px-6 py-2.5 bg-rethread-700 hover:bg-rethread-800 text-white rounded-full text-xs font-semibold"
            >
              {activeTab === 'purchases' ? 'Explore Drops' : '+ List an Item'}
            </Link>
          </div>
        ) : (
          currentList.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    Order ID: #{order._id.substring(order._id.length - 8).toUpperCase()}
                  </span>
                  <span className="text-xs text-stone-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                  <span className="text-sm font-bold text-stone-900">
                    ₹{order.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-3">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-16 rounded-xl object-cover bg-stone-100"
                      />
                      <div>
                        <Link
                          to={`/product/${item.product}`}
                          className="text-xs font-bold text-stone-800 hover:text-rethread-700 flex items-center gap-1"
                        >
                          <span>{item.title}</span>
                          <ExternalLink className="w-3 h-3 text-stone-400" />
                        </Link>
                        <p className="text-[11px] text-stone-500">
                          Size: {item.size} • {item.condition}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-800">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery and payment footer */}
              <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    Delivering to {order.shippingAddress.fullName}, {order.shippingAddress.city}
                  </span>
                </div>
                <div className="text-emerald-700 font-semibold">
                  Saved {(order.waterSavedTotal || 2500).toLocaleString()}L Water
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
