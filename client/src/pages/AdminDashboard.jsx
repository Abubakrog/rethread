import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Package,
  Users,
  Tag,
  DollarSign,
  Trash2,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        api.get('/orders'),
        api.get('/products?status=All&pageSize=50'),
        api.get('/users'),
      ]);
      setOrders(ordersRes.data || []);
      setProducts(productsRes.data.products || []);
      setUsers(usersRes.data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      toast.error('Failed to load admin metrics');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order updated to ${newStatus}`);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
    } catch (err) {
      toast.error('Could not update status');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this listing from marketplace?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Listing removed');
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user account?')) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('User removed');
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete user');
    }
  };

  // Metrics calculations
  const totalSales = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 pb-6 border-b border-stone-200">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-stone-900">
            Admin Console
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Oversee marketplace inventory, member accounts, and order fulfillment.
          </p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-400">Total Sales</span>
          <p className="text-2xl font-bold font-display text-stone-900 mt-1">
            ₹{totalSales.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-700">Platform GMV</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-400">Total Orders</span>
          <p className="text-2xl font-bold font-display text-stone-900 mt-1">
            {orders.length}
          </p>
          <span className="text-[11px] text-stone-500">Processed</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-400">Listed Clothes</span>
          <p className="text-2xl font-bold font-display text-stone-900 mt-1">
            {products.length}
          </p>
          <span className="text-[11px] text-stone-500">Curated pieces</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-stone-400">Community Users</span>
          <p className="text-2xl font-bold font-display text-stone-900 mt-1">
            {users.length}
          </p>
          <span className="text-[11px] text-stone-500">Registered</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex gap-4 border-b border-stone-200 mb-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs font-bold border-b-2 transition ${
            activeTab === 'orders'
              ? 'border-rethread-700 text-rethread-900'
              : 'border-transparent text-stone-400 hover:text-stone-600'
          }`}
        >
          Orders Fulfillment ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-xs font-bold border-b-2 transition ${
            activeTab === 'products'
              ? 'border-rethread-700 text-rethread-900'
              : 'border-transparent text-stone-400 hover:text-stone-600'
          }`}
        >
          Marketplace Clothes ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 text-xs font-bold border-b-2 transition ${
            activeTab === 'users'
              ? 'border-rethread-700 text-rethread-900'
              : 'border-transparent text-stone-400 hover:text-stone-600'
          }`}
        >
          User Accounts ({users.length})
        </button>
      </div>

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Buyer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((o) => (
                  <tr key={o._id} className="hover:bg-stone-50/50">
                    <td className="p-4 font-mono font-bold text-stone-700">
                      #{o._id.substring(o._id.length - 6).toUpperCase()}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-stone-900">{o.shippingAddress?.fullName || o.buyer?.name}</p>
                      <p className="text-[11px] text-stone-400">{o.shippingAddress?.city}</p>
                    </td>
                    <td className="p-4">{o.orderItems.length} item(s)</td>
                    <td className="p-4 font-bold text-stone-900">₹{o.totalPrice.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        o.isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {o.isPaid ? 'Paid' : 'COD'}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                        className="bg-stone-100 border border-stone-200 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-rethread-600 cursor-pointer"
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Products */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-4">Garment</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Size & Condition</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-stone-50/50">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded-lg bg-stone-100" />
                      <div>
                        <p className="font-bold text-stone-900 line-clamp-1">{p.title}</p>
                        <p className="text-[11px] text-stone-400">{p.brand}</p>
                      </div>
                    </td>
                    <td className="p-4">{p.category}</td>
                    <td className="p-4">
                      {p.size} • <span className="text-stone-500">{p.condition}</span>
                    </td>
                    <td className="p-4 font-bold text-stone-900">₹{p.price.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        p.status === 'sold' ? 'bg-stone-200 text-stone-700' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        className="text-stone-400 hover:text-red-500 p-1 transition"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Users */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-bold uppercase tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Eco Points</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-stone-50/50">
                    <td className="p-4 flex items-center gap-3">
                      <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-bold text-stone-900">{u.name}</span>
                    </td>
                    <td className="p-4 text-stone-600">{u.email}</td>
                    <td className="p-4 text-stone-600">{u.city || 'India'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-emerald-700">🌱 {u.ecoPoints || 50}</td>
                    <td className="p-4 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="text-stone-400 hover:text-red-500 p-1 transition"
                          title="Remove user"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
