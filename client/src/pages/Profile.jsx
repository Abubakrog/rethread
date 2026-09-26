import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User as UserIcon,
  Leaf,
  Package,
  Tag,
  MapPin,
  Phone,
  Mail,
  Edit3,
  PlusCircle,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile, refreshUser } = useAuth();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'listings');
  const [myListings, setMyListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);

  // Edit profile form
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [city, setCity] = useState(user?.city || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [password, setPassword] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoadingListings(true);
      try {
        const { data } = await api.get('/products/my-listings');
        setMyListings(data || []);
      } catch (err) {
        console.error('Failed to load listings:', err);
      } finally {
        setLoadingListings(false);
      }
    };
    fetchListings();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const updateData = { name, email, city, phone, bio, avatar };
    if (password) updateData.password = password;

    const res = await updateProfile(updateData);
    if (res.success) {
      setPassword('');
    }
    setUpdating(false);
  };

  const handleDeleteListing = async (productId) => {
    if (!window.confirm('Are you sure you want to remove this listing?')) return;
    try {
      await api.delete(`/products/${productId}`);
      setMyListings((prev) => prev.filter((p) => p._id !== productId));
      toast.success('Listing removed');
    } catch (err) {
      toast.error('Could not delete listing');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-rethread-500 shadow-md"
          />
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold font-display text-stone-900">{user?.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                {user?.ecoPoints || 50} Eco Points
              </span>
            </div>
            <p className="text-xs text-stone-500 max-w-md">{user?.bio}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-400 pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {user?.city || 'Bengaluru'}
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/sell"
          className="inline-flex items-center gap-2 px-6 py-3 bg-rethread-700 hover:bg-rethread-800 text-white rounded-full text-xs font-semibold shadow transition whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Sell Clothes</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-stone-200 mb-8">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'listings'
              ? 'border-rethread-700 text-rethread-900'
              : 'border-transparent text-stone-400 hover:text-stone-600'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>My Listed Clothes ({myListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('edit')}
          className={`pb-3 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
            activeTab === 'edit'
              ? 'border-rethread-700 text-rethread-900'
              : 'border-transparent text-stone-400 hover:text-stone-600'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile Settings</span>
        </button>
      </div>

      {/* Tab 1: My Listings */}
      {activeTab === 'listings' && (
        <div>
          {loadingListings ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-stone-200 animate-pulse rounded-3xl"></div>
              ))}
            </div>
          ) : myListings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto">
              <Tag className="w-12 h-12 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-bold font-display text-stone-800">
                You haven't listed any clothes yet
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-6">
                Clear out your wardrobe and list your first piece in 2 minutes!
              </p>
              <Link
                to="/sell"
                className="px-6 py-2.5 bg-rethread-700 hover:bg-rethread-800 text-white rounded-full text-xs font-semibold"
              >
                + List First Garment
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl border border-stone-200 p-4 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-20 h-24 object-cover rounded-2xl bg-stone-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${
                          item.status === 'sold'
                            ? 'bg-stone-200 text-stone-700'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.status}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 truncate">{item.title}</h4>
                      <p className="text-xs text-stone-500">Size: {item.size} • {item.condition}</p>
                      <p className="text-xs font-bold text-stone-900 mt-1">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100 text-xs">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-rethread-700 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                    <button
                      onClick={() => handleDeleteListing(item._id)}
                      className="text-stone-400 hover:text-red-500 p-1 transition"
                      title="Delete listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Edit Profile */}
      {activeTab === 'edit' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 max-w-2xl shadow-sm">
          <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Avatar Image URL</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
                />
              </div>
              <div>
                <label className="font-bold text-stone-700 block mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Bio / Thrift Philosophy</label>
              <textarea
                rows="3"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">New Password (leave blank to keep current)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="px-8 py-3 bg-rethread-700 hover:bg-rethread-800 text-white font-bold text-xs rounded-full shadow transition"
            >
              {updating ? 'Saving Changes...' : 'Save Profile'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
