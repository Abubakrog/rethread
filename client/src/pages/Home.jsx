import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import EcoImpactBanner from '../components/EcoImpactBanner';
import HangTag from '../components/HangTag';

const categories = [
  { name: 'Vintage & Rare', label: 'Vintage and rare', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80' },
  { name: 'Denim & Jeans', label: 'Denim', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80' },
  { name: 'Jackets & Coats', label: 'Jackets and coats', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80' },
  { name: 'Sweaters & Knits', label: 'Knitwear', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=80' },
  { name: 'Dresses & Skirts', label: 'Dresses and skirts', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=80' },
  { name: 'Pants & Trousers', label: 'Trousers', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=80' },
];

const steps = [
  {
    title: 'List what you no longer wear',
    body: 'Take a few photos, add the size and condition, set your price. Tell buyers where the piece has been.',
  },
  {
    title: 'Graded condition, real measurements',
    body: 'Every listing carries a condition grade, from new with tags to distressed vintage, and its actual measurements.',
  },
  {
    title: 'Pay less, earn Eco Points',
    body: 'Pieces sell for up to 70% below their retail price, and every order adds Eco Points to your account.',
  },
];

const SectionHeader = ({ title, to, linkLabel }) => (
  <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
    <h2 className="text-2xl sm:text-3xl font-display text-stone-900">{title}</h2>
    {to && (
      <Link
        to={to}
        className="shrink-0 inline-flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 transition-colors"
      >
        {linkLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
    )}
  </div>
);

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/products/featured');
        setFeaturedProducts(data || []);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="pb-16 overflow-hidden">
      {/* Hero */}
      <section className="border-b border-stone-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-stone-900 leading-[1.06] tracking-tight">
                Second-hand clothes, graded honestly and priced fairly
              </h1>
              <p className="mt-5 text-base sm:text-lg text-stone-600 leading-7 max-w-xl">
                90s vintage, streetwear and everyday pieces from other people’s wardrobes. Every
                listing shows its condition, its measurements and the water it saves.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/shop"
                  className="h-12 px-6 rounded-full bg-rethread-700 hover:bg-rethread-800 text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                >
                  Shop clothes
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/sell"
                  className="h-12 px-6 rounded-full bg-white hover:bg-stone-50 text-stone-900 text-sm font-medium border border-stone-900/15 inline-flex items-center justify-center transition-colors active:scale-[0.98]"
                >
                  Sell your clothes
                </Link>
              </div>

              <p className="mt-8 text-sm text-stone-500">
                Every piece checked as authentic · Up to 70% below retail
              </p>
            </div>

            {/* The featured garment, tagged */}
            <div className="lg:col-span-6">
              <figure className="relative mx-auto max-w-md lg:ml-auto">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80"
                    alt="Vintage 90s Levi’s 501 straight-leg jeans"
                    className="w-full h-full object-cover"
                  />
                </div>
                <HangTag
                  size="lg"
                  rows={[
                    ['Item', 'Levi’s 501, 90s'],
                    ['Price', '₹1,499'],
                    ['Water saved', '7,600 L'],
                  ]}
                  className="absolute top-14 -left-4 sm:-left-10 -rotate-6 drop-shadow-[0_8px_16px_rgba(41,37,36,0.18)]"
                />
                <figcaption className="mt-3 text-xs text-stone-500">Featured pick · Denim</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <SectionHeader title="Shop by category" to="/shop" linkLabel="All clothes" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/shop?category=${encodeURIComponent(cat.name)}`} className="group block">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-stone-200">
                <img src={cat.image} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="mt-2 text-sm text-stone-800 group-hover:text-rethread-700 transition-colors">
                {cat.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Just listed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <SectionHeader title="Just listed" to="/shop" linkLabel="See all" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
          {loading
            ? [...Array(8)].map((_, i) => <div key={i} className="bg-stone-200/70 aspect-[4/5] rounded-xl" />)
            : featuredProducts.slice(0, 8).map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </section>

      {/* Eco impact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <EcoImpactBanner />
      </div>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <SectionHeader title="How Rethread works" />
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-stone-900/10 pt-5">
              <span className="font-display text-2xl text-rethread-700 tabular-nums">{i + 1}</span>
              <h3 className="mt-2 text-lg font-display text-stone-900">{step.title}</h3>
              <p className="mt-2 text-sm text-stone-600 leading-6">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Sell call to action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="rounded-2xl bg-vintage-sand border border-stone-900/10 px-6 py-10 sm:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-display text-stone-900">
              Something in your wardrobe you never wear?
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              Photograph it, set a price and it is listed for buyers looking for exactly that.
            </p>
          </div>
          <Link
            to="/sell"
            className="shrink-0 h-12 px-6 rounded-full bg-rethread-700 hover:bg-rethread-800 text-white text-sm font-medium inline-flex items-center justify-center transition-colors active:scale-[0.98]"
          >
            Start selling
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
