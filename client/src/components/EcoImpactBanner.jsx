import React, { useState, useEffect } from 'react';
import { Droplets, CloudRain, Recycle, Trees } from 'lucide-react';
import api from '../api/axios';

const EcoImpactBanner = () => {
  const [impact, setImpact] = useState({
    garmentsRehomed: 184,
    waterSavedLitres: 496800,
    co2OffsetKg: 644,
    treesEquivalent: 31,
  });

  useEffect(() => {
    const fetchEco = async () => {
      try {
        const { data } = await api.get('/products/eco-impact');
        if (data) setImpact(data);
      } catch (err) {
        console.error('Failed to load eco metrics:', err);
      }
    };
    fetchEco();
  }, []);

  return (
    <section className="bg-rethread-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden relative border border-rethread-800">
      {/* Background organic ring motifs */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-widest mb-3">
            <Recycle className="w-3.5 h-3.5" /> Collective Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-stone-100">
            Every Thrift Order Rewrites Fashion's Footprint
          </h2>
          <p className="mt-2 text-stone-300 text-sm">
            Fast fashion is the 2nd most polluting industry on Earth. By choosing thrift on Rethread,
            you keep wearable garments out of landfills and conserve critical water resources.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Garments Diverted */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Recycle className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-white">
              {impact.garmentsRehomed.toLocaleString()}
            </p>
            <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">
              Garments Rehomed
            </p>
          </div>

          {/* Water Conserved */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition">
            <div className="w-10 h-10 mx-auto rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
              <Droplets className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-white">
              {impact.waterSavedLitres.toLocaleString()}L
            </p>
            <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">
              Clean Water Saved
            </p>
          </div>

          {/* CO2 Emissions Avoided */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <CloudRain className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-white">
              {impact.co2OffsetKg.toLocaleString()} kg
            </p>
            <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">
              CO₂ Diverted
            </p>
          </div>

          {/* Trees Equivalent */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-3">
              <Trees className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-white">
              ~{impact.treesEquivalent}
            </p>
            <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-semibold">
              Trees Absorbed Equivalent
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoImpactBanner;
