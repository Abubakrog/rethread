import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail, User, MapPin, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('Bengaluru');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    const result = await register({ name, email, password, city });
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-md">
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 bg-rethread-700 text-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Leaf className="w-6 h-6 text-emerald-300 transform -rotate-12" />
          </div>
          <h1 className="text-2xl font-display font-bold text-stone-900">
            Join the Rethread Circle
          </h1>
          <p className="text-xs text-stone-500">
            Sign up to buy, sell, and earn 50 instant Eco Points.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Riya Kapoor"
                className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600 text-stone-900"
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="riya@example.com"
                className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600 text-stone-900"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">City</label>
            <div className="relative">
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mumbai, Bengaluru, Delhi"
                className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600 text-stone-900"
              />
              <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600 text-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600 text-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-rethread-700 hover:bg-rethread-800 text-white font-bold text-xs rounded-full shadow transition flex items-center justify-center gap-2 mt-4"
          >
            <span>{loading ? 'Creating Account...' : 'Create Account (+50 Points)'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-center text-xs text-stone-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-rethread-700 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
