'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Briefcase, Globe, Layers } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

   useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email.trim()) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      setLoading(false);
      return;
    }

    try {
      if (!auth) {
        throw new Error('Service not available. Please try again later.');
      }

      await signInWithEmailAndPassword(auth, email, password);

      setEmail('');
      setPassword('');

      setTimeout(() => {
        router.push('/');
      }, 100);

    } catch (err: unknown) {
      console.error('Login error:', err);
      
      if (err instanceof Error) {
        const errorMessage = err.message;
        
        if (errorMessage.includes('invalid-credential') || errorMessage.includes('user-not-found') || errorMessage.includes('wrong-password')) {
          setError('Invalid email or password. Please try again.');
        } else if (errorMessage.includes('too-many-requests')) {
          setError('Too many failed attempts. Please try again later.');
        } else if (errorMessage.includes('network-request-failed')) {
          setError('Network error. Please check your internet connection.');
        } else if (errorMessage.includes('user-disabled')) {
          setError('This account has been disabled. Please contact support.');
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="font-heading text-5xl font-bold text-black mb-3 uppercase">
              Welcome<br />Back
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Sign in to continue your journey
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black text-white px-5 py-4 border-2 border-black"
              >
                <p className="text-sm font-semibold">{error}</p>
              </motion.div>
            )}

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <label className="block text-sm font-heading font-bold text-black mb-3 uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-5 border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-all disabled:opacity-50 font-medium text-lg"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-heading font-bold text-black uppercase tracking-widest">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-black font-semibold hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-12 pr-12 py-5 border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-all disabled:opacity-50 font-medium text-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-5 font-heading font-bold text-xl uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </motion.button>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center pt-6"
            >
              <p className="text-gray-600 font-medium text-base">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-black font-heading font-bold hover:underline text-lg">
                  Create Account
                </Link>
              </p>
            </motion.div>
          </form>
        </div>
      </div>

      {/* Right Side - Branding */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-black text-white p-12 flex-col justify-between relative overflow-hidden"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(white 1px, transparent 1px),
              linear-gradient(90deg, white 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-white"
              style={{
                width: `${40 + Math.random() * 60}px`,
                height: `${40 + Math.random() * 60}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="font-heading text-7xl font-bold mb-8 leading-none uppercase">
              Powering the<br />
              Business of<br />
              <span className="text-white/60">Esports</span>
            </h2>
            <p className="text-2xl text-white/80 max-w-lg font-medium leading-relaxed">
              From talent management to large-scale esports initiatives, we handle the strategy so you focus on growth.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="relative z-10 grid grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/10 flex items-center justify-center mb-4 mx-auto">
              <Briefcase className="w-8 h-8" />
            </div>
            <p className="text-3xl font-heading font-bold mb-1">500+</p>
            <p className="text-white/70 text-sm uppercase tracking-wider">Clients & Creators</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/10 flex items-center justify-center mb-4 mx-auto">
              <Globe className="w-8 h-8" />
            </div>
            <p className="text-3xl font-heading font-bold mb-1">50K+</p>
            <p className="text-white/70 text-sm uppercase tracking-wider">Audience Reach</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/10 flex items-center justify-center mb-4 mx-auto">
              <Layers className="w-8 h-8" />
            </div>
            <p className="text-3xl font-heading font-bold mb-1">100+</p>
            <p className="text-white/70 text-sm uppercase tracking-wider">Executed Projectss</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}