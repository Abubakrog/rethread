import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate(redirectPath);
    }
  };

  const handleQuickLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    const result = await login(demoEmail, demoPassword);
    if (result.success) {
      navigate(redirectPath);
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
            Welcome to Rethread
          </h1>
          <p className="text-xs text-stone-500">
            Sign in to manage your thrift closet, bag, and orders.
          </p>
        </div>

        {/* 1-Click Demo Logins for Semester Evaluation */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>1-Click Demo Evaluation Logins</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@rethread.eco', 'password123')}
              className="px-2 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-[11px] transition text-center"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('aarav@rethread.eco', 'password123')}
              className="px-2 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-[11px] transition text-center"
            >
              Seller
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('priya@rethread.eco', 'password123')}
              className="px-2 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-900 font-semibold text-[11px] transition text-center"
            >
              Buyer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rethread-600 text-stone-900"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
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
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="text-center text-xs text-stone-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-rethread-700 hover:underline">
            Register for 50 Eco Points
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
