import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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

  const figures = [
    { value: impact.garmentsRehomed.toLocaleString('en-IN'), label: 'Garments rehomed' },
    { value: `${impact.waterSavedLitres.toLocaleString('en-IN')} L`, label: 'Water not used to make new ones' },
    { value: `${impact.co2OffsetKg.toLocaleString('en-IN')} kg`, label: 'CO₂ avoided' },
    { value: `${impact.treesEquivalent.toLocaleString('en-IN')}`, label: 'Trees’ worth of yearly absorption' },
  ];

  return (
    <section className="bg-rethread-900 text-stone-100 rounded-2xl px-6 py-10 sm:px-12 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        <div className="lg:col-span-5">
          <p className="text-xs text-rethread-300">Counted across every order on Rethread</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-display text-stone-50 leading-tight">
            What buying second-hand has saved so far
          </h2>
          <p className="mt-3 text-sm text-stone-300 leading-6 max-w-md">
            Fast fashion is the second most polluting industry. A garment bought again needs no new
            cotton, dye or water, and stays out of landfill a while longer.
          </p>
          <Link
            to="/eco-impact"
            className="mt-5 inline-flex items-center gap-1 text-sm text-stone-100 underline underline-offset-4 decoration-stone-500 hover:decoration-stone-100 transition-colors"
          >
            How we count it
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <dl className="lg:col-span-7 grid grid-cols-2 gap-x-8 gap-y-6">
          {figures.map((f) => (
            <div key={f.label} className="border-t border-white/10 pt-4">
              <dd className="text-3xl sm:text-4xl font-display text-stone-50 tabular-nums">{f.value}</dd>
              <dt className="mt-1 text-xs text-stone-400">{f.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default EcoImpactBanner;
