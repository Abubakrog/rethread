import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Leaf,
  Sparkles,
  Droplets,
  CloudRain,
  Coins,
  ArrowRight,
  Plus,
  Trash2,
} from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const categories = [
  'Tops & T-Shirts',
  'Denim & Jeans',
  'Jackets & Coats',
  'Dresses & Skirts',
  'Sweaters & Knits',
  'Pants & Trousers',
  'Vintage & Rare',
  'Shoes & Accessories',
];

const conditions = [
  { label: 'Brand New with Tags', desc: 'Unworn with original retail tags attached' },
  { label: 'Like New', desc: 'Worn once or twice, zero signs of wear or wash fade' },
  { label: 'Gently Used', desc: 'Minor signs of natural wear, well cared for, no flaws' },
  { label: 'Vintage Distressed', desc: 'Natural distressing, vintage patina or fading with character' },
];

const SellItem = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [story, setStory] = useState('');
  const [category, setCategory] = useState('Tops & T-Shirts');
  const [gender, setGender] = useState('Unisex');
  const [size, setSize] = useState('M');
  const [condition, setCondition] = useState('Gently Used');
  const [brand, setBrand] = useState('');
  const [material, setMaterial] = useState('100% Cotton');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');

  // Image handling
  const [imageUrls, setImageUrls] = useState([
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Quick preset sample fill for testing convenience
  const handleQuickFill = () => {
    setTitle('Vintage 90s Ralph Lauren Denim Overshirt');
    setDescription('Heavyweight indigo wash work shirt with horn buttons and chest embroidery.');
    setStory('Bought at a vintage fair in Goa. Timeless piece that layers well with white tees.');
    setCategory('Jackets & Coats');
    setGender('Men');
    setSize('L');
    setCondition('Like New');
    setBrand('Polo Ralph Lauren');
    setMaterial('100% Cotton Denim');
    setColor('Indigo Blue');
    setPrice('1499');
    setOriginalPrice('4999');
    setImageUrls([
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&auto=format&fit=crop&q=80',
    ]);
    toast.success('Sample vintage garment loaded!');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageUrls((prev) => [...prev, data.url]);
      toast.success('Photo uploaded successfully! 📸');
    } catch (err) {
      toast.error('Upload failed. Try an image URL instead.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddImageUrl = (e) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      setImageUrls((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUrls.length === 0) {
      return toast.error('Please add at least one photo of the garment');
    }
    if (!price || Number(price) <= 0) {
      return toast.error('Please set a valid selling price');
    }

    setSubmitting(true);
    try {
      const payload = {
        title,
        description,
        story,
        images: imageUrls,
        category,
        gender,
        size,
        condition,
        brand: brand || 'Vintage',
        material,
        color: color || 'Classic',
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : Number(price) * 1.6,
      };

      const { data } = await api.post('/products', payload);
      toast.success('Garment listed on Rethread! +20 Eco Points earned 🌱');
      await refreshUser();
      navigate(`/product/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to list item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            Seller Studio
          </span>
          <h1 className="text-3xl font-display font-bold text-stone-900 mt-1">
            List Pre-Loved Clothes
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Turn your unused wardrobe pieces into extra cash while saving water & textiles.
          </p>
        </div>

        {/* Demo Fast Fill Button */}
        <button
          type="button"
          onClick={handleQuickFill}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Quick Demo Fill</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Photo Uploads */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900 flex items-center justify-between">
            <span>1. Garment Photos</span>
            <span className="text-xs text-stone-400 font-normal">Add clear front & tag photos</span>
          </h2>

          {/* Current Images Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 group">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-stone-900/80 text-white hover:bg-red-600 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white text-stone-800">
                    Cover Photo
                  </span>
                )}
              </div>
            ))}

            {/* Upload Box */}
            <label className="border-2 border-dashed border-stone-300 hover:border-rethread-600 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition p-4 text-center">
              <UploadCloud className="w-8 h-8 text-stone-400 mb-2" />
              <span className="text-xs font-semibold text-stone-700">
                {uploading ? 'Uploading...' : 'Upload Image'}
              </span>
              <span className="text-[10px] text-stone-400 mt-1">PNG, JPG, WEBP</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Add Image URL option */}
          <div className="flex gap-2 pt-2">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Or paste an image URL (e.g., Unsplash fashion link)..."
              className="flex-1 px-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
            />
            <button
              type="button"
              onClick={handleAddImageUrl}
              className="px-4 py-2 bg-stone-800 text-white text-xs font-semibold rounded-xl hover:bg-stone-900 transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add URL
            </button>
          </div>
        </div>

        {/* Basic Details */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900">2. Garment Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Listing Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Vintage 90s Levi's 501 Straight Leg Denim"
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Department *</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              >
                <option value="Unisex">Unisex</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Size *</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              >
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Brand / Label</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Levi's, Zara, Vintage 90s, Nike"
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Material / Fabric</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. 100% Rigid Denim, Pure Wool, Linen"
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Color</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Indigo Blue, Olive Green, Oatmeal"
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
              />
            </div>
          </div>
        </div>

        {/* Condition Rating */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900">3. Condition Grade</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conditions.map((c) => (
              <label
                key={c.label}
                onClick={() => setCondition(c.label)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                  condition === c.label
                    ? 'border-rethread-700 bg-emerald-50/50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="condition"
                  checked={condition === c.label}
                  onChange={() => setCondition(c.label)}
                  className="mt-0.5 accent-rethread-700"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">{c.label}</span>
                  <span className="text-[11px] text-stone-500 mt-0.5 block">{c.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Story & Description */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900">4. The Garment's Story</h2>
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Why are you letting this go? Where did it travel with you?
            </label>
            <textarea
              rows="3"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="e.g., Bought in 2021 for road trips in Scotland. Kept clean and ready for someone to rock it..."
              className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              General Description & Sizing Notes *
            </label>
            <textarea
              rows="3"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mention chest width, length, fit style (oversized, tailored, relaxed)..."
              className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600"
            />
          </div>
        </div>

        {/* Pricing & Eco Calculation */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900">5. Pricing & Circular Impact</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Your Listing Price (₹) *
              </label>
              <input
                type="number"
                required
                min="50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 899"
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600 font-bold text-base text-stone-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Original Retail Price (₹, optional)
              </label>
              <input
                type="number"
                min="0"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="e.g. 2999"
                className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600 text-stone-600"
              />
            </div>
          </div>

          {/* Eco Impact Preview Card */}
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Coins className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-900">+20 Eco Points upon listing</p>
                <p className="text-[11px] text-emerald-700">
                  Estimated impact: Saves ~2,700L clean water & diverts ~3.5kg CO₂
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-10 py-4 bg-rethread-700 hover:bg-rethread-800 text-white font-bold text-sm rounded-full shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>{submitting ? 'Publishing Drop...' : 'Publish Thrift Listing'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellItem;
