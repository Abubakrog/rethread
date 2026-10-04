import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Filter,
  X,
  Search,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const categories = [
  'All',
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
  'All',
  'Brand New with Tags',
  'Like New',
  'Gently Used',
  'Vintage Distressed',
];

const genders = ['All', 'Women', 'Men', 'Unisex'];
const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filters state from URL or defaults
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || 'All');
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || 'All');
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition') || 'All');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '5000');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Update state if URL query params change
  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('gender')) setSelectedGender(searchParams.get('gender'));
    if (searchParams.get('keyword')) setKeyword(searchParams.get('keyword'));
  }, [searchParams]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (selectedCategory !== 'All') params.append('category', selectedCategory);
        if (selectedGender !== 'All') params.append('gender', selectedGender);
        if (selectedSize !== 'All') params.append('size', selectedSize);
        if (selectedCondition !== 'All') params.append('condition', selectedCondition);
        if (maxPrice && Number(maxPrice) < 5000) params.append('maxPrice', maxPrice);
        if (sortBy) params.append('sort', sortBy);

        const { data } = await api.get(`/products?${params.toString()}`);
        setProducts(data.products || []);
        setTotal(data.totalProducts || 0);
      } catch (err) {
        console.error('Error fetching catalog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, selectedCategory, selectedGender, selectedSize, selectedCondition, maxPrice, sortBy]);

  const resetFilters = () => {
    setKeyword('');
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedSize('All');
    setSelectedCondition('All');
    setMaxPrice('5000');
    setSortBy('newest');
    setSearchParams({});
  };

  const hasActiveFilters =
    keyword !== '' ||
    selectedCategory !== 'All' ||
    selectedGender !== 'All' ||
    selectedSize !== 'All' ||
    selectedCondition !== 'All' ||
    maxPrice !== '5000';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header & Controls */}
      <div className="space-y-4 pb-6 border-b border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
            {selectedCategory !== 'All' ? selectedCategory : 'All Pre-Loved Drops'}
          </h1>
          <p className="text-xs text-stone-500">
            {total} sustainable one-of-a-kind garment{total === 1 ? '' : 's'} available
          </p>
        </div>

        {/* Search & Sort Controls (Responsive) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search vintage denim, tees, brands..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white rounded-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rethread-600 shadow-sm"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-white border border-stone-300 rounded-full pl-3.5 pr-8 py-2 text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-rethread-600 cursor-pointer shadow-sm truncate"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Biggest Discount (%)</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-3 top-2.5 pointer-events-none" />
            </div>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold shadow-sm shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 pt-6 sm:pt-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <span className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-rethread-700" /> Filters
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-rethread-700 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-3">
              Category
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-rethread-700 text-white font-semibold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2">
              Department / Gender
            </label>
            <div className="flex flex-wrap gap-1.5">
              {genders.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                    selectedGender === g
                      ? 'bg-rethread-800 text-white border-rethread-800'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2">
              Size
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-1 text-center rounded-md text-xs font-semibold border transition ${
                    selectedSize === s
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block mb-2">
              Condition Grade
            </label>
            <div className="space-y-1.5">
              {conditions.map((cond) => (
                <label
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className="flex items-center gap-2 cursor-pointer text-xs text-stone-600 hover:text-stone-900"
                >
                  <input
                    type="radio"
                    name="condition"
                    checked={selectedCondition === cond}
                    onChange={() => setSelectedCondition(cond)}
                    className="accent-rethread-700"
                  />
                  <span>{cond}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Max Price
              </label>
              <span className="text-xs font-bold text-rethread-700">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full accent-rethread-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>₹300</span>
              <span>₹5000+</span>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="md:col-span-3">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-stone-200 animate-pulse aspect-[3/4] rounded-2xl"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-stone-200 max-w-md mx-auto my-8">
              <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-stone-800">
                No matching garments found
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-5">
                Try widening your price range or resetting active filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-rethread-700 hover:bg-rethread-800 text-white text-xs font-semibold rounded-full shadow transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Complete Mobile Filters Bottom Sheet / Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 md:hidden backdrop-blur-sm">
          <div className="w-full max-w-md ml-auto bg-white h-full p-5 overflow-y-auto space-y-5 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-rethread-700" />
                  <h3 className="font-bold font-display text-lg text-stone-900">Filters</h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">Category</p>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        selectedCategory === c
                          ? 'bg-rethread-700 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Department / Gender */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">Department</p>
                <div className="flex flex-wrap gap-1.5">
                  {genders.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                        selectedGender === g
                          ? 'bg-rethread-800 text-white border-rethread-800'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">Size</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-1.5 text-center rounded-lg text-xs font-semibold border transition ${
                        selectedSize === s
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">Condition</p>
                <div className="space-y-1.5">
                  {conditions.map((cond) => (
                    <label
                      key={cond}
                      onClick={() => setSelectedCondition(cond)}
                      className="flex items-center gap-2 cursor-pointer text-xs text-stone-700"
                    >
                      <input
                        type="radio"
                        name="mobileCondition"
                        checked={selectedCondition === cond}
                        onChange={() => setSelectedCondition(cond)}
                        className="accent-rethread-700"
                      />
                      <span>{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-800">Max Price</p>
                  <span className="text-xs font-bold text-rethread-700">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full accent-rethread-700"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-100 flex gap-2">
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-3 border border-stone-300 text-stone-700 text-xs font-semibold rounded-full"
                >
                  Reset
                </button>
              )}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-rethread-700 text-white text-xs font-bold rounded-full shadow"
              >
                Show Results ({total})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
