import React, { useState, useEffect } from 'react';
import {
  Droplets,
  Recycle,
  CloudRain,
  Trees,
  Leaf,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const comparisons = [
  {
    type: 'Denim Jeans',
    water: 7500,
    co2: 8.5,
    equivalent: 'Equals drinking water for 1 person for 10 years',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
  },
  {
    type: 'Winter Jacket / Coat',
    water: 5000,
    co2: 12.0,
    equivalent: 'Equivalent to driving a car 50 km in emissions',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
  },
  {
    type: 'Pure Wool Sweater',
    water: 3200,
    co2: 6.0,
    equivalent: 'Conserves enough water for 45 long showers',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
  },
  {
    type: 'Cotton T-Shirt',
    water: 2700,
    co2: 3.5,
    equivalent: 'Saves enough water to fill 35 standard bathtubs',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400',
  },
];

const EcoImpact = () => {
  const [metrics, setMetrics] = useState({
    garmentsRehomed: 184,
    waterSavedLitres: 496800,
    co2OffsetKg: 644,
    treesEquivalent: 31,
  });

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const { data } = await api.get('/products/eco-impact');
        if (data) setMetrics(data);
      } catch (err) {
        console.error('Failed to load metrics:', err);
      }
    };
    fetchImpact();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          <span>The Rethread Sustainability Index</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-stone-900 leading-tight">
          How Choosing Thrift Changes the Planet
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Over 92 million tonnes of textile waste end up in incinerators and landfills every single year.
          At Rethread, we measure the tangible environmental resources preserved by keeping existing garments in circulation.
        </p>
      </div>

      {/* Big Impact Numbers */}
      <div className="bg-rethread-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Recycle className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-display font-bold">
              {metrics.garmentsRehomed.toLocaleString()}
            </p>
            <p className="text-xs text-stone-300 mt-1 uppercase font-semibold">
              Garments Saved from Landfill
            </p>
          </div>

          <div>
            <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
              <Droplets className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-display font-bold">
              {metrics.waterSavedLitres.toLocaleString()}L
            </p>
            <p className="text-xs text-stone-300 mt-1 uppercase font-semibold">
              Clean Water Conserved
            </p>
          </div>

          <div>
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <CloudRain className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-display font-bold">
              {metrics.co2OffsetKg.toLocaleString()} kg
            </p>
            <p className="text-xs text-stone-300 mt-1 uppercase font-semibold">
              Carbon Emissions Diverted
            </p>
          </div>

          <div>
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3">
              <Trees className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-display font-bold">
              ~{metrics.treesEquivalent}
            </p>
            <p className="text-xs text-stone-300 mt-1 uppercase font-semibold">
              Yearly Tree Absorption Equivalent
            </p>
          </div>
        </div>
      </div>

      {/* Garment Impact Breakdown */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rethread-700">
            Per-Item Calculations
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 mt-1">
            Water & Carbon Saved Per Category
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Manufacturing new clothing requires massive raw material cultivation, toxic dyes, and chemical washing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {comparisons.map((c, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="aspect-[4/3] bg-stone-100 overflow-hidden">
                <img src={c.image} alt={c.type} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-display font-bold text-lg text-stone-900">{c.type}</h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <span>Water Saved:</span>
                    <span>{c.water.toLocaleString()} Litres</span>
                  </div>
                  <div className="flex justify-between text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">
                    <span>CO₂ Avoided:</span>
                    <span>{c.co2} kg</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-500 italic pt-1">{c.equivalent}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Circular Manifesto & CTA */}
      <section className="bg-vintage-sand/70 rounded-3xl p-8 sm:p-12 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <h3 className="text-2xl font-display font-bold text-stone-900">
            Be part of the circular wardrobe solution
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            By shopping or selling on Rethread, you prevent wearable garments from languishing in drawers
            or degrading in landfills. Join our community of conscious curators today.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/shop"
            className="px-6 py-3 bg-rethread-700 hover:bg-rethread-800 text-white rounded-full text-xs font-semibold shadow transition"
          >
            Shop Thrift Drops
          </Link>
          <Link
            to="/sell"
            className="px-6 py-3 bg-white hover:bg-stone-50 text-stone-800 rounded-full text-xs font-semibold border border-stone-300 shadow-sm transition"
          >
            Sell Pre-Loved
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EcoImpact;
