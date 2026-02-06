'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (!auth) throw new Error('Authentication service unavailable');

      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
      setEmail('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('user-not-found')) {
          setError('No account found with this email address.');
        } else if (err.message.includes('invalid-email')) {
          setError('Please enter a valid email address.');
        } else if (err.message.includes('too-many-requests')) {
          setError('Too many attempts. Please try again later.');
        } else {
          setError('Failed to send reset email. Please try again.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }

    setLoading(false);
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
            <div className="mb-6">
              <Shield className="w-16 h-16 text-black" strokeWidth={1.5} />
            </div>
            <h1 className="font-heading text-5xl font-bold text-black mb-3 uppercase">
              Reset<br />Password
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Enter your email to receive reset instructions
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black text-white px-5 py-4 border-2 border-black"
              >
                <p className="text-sm font-semibold">{error}</p>
              </motion.div>
            )}

            {/* Success Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black text-white px-5 py-4 border-2 border-black"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{message}</p>
                    <p className="text-xs text-gray-300 mt-1">
                      Check your spam folder if you don&apos;t see it.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Email Input */}
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
                  className="w-full pl-12 pr-4 py-5 border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-all font-medium text-lg"
                  required
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-5 font-heading font-bold text-xl uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8 flex items-center justify-center gap-3"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </motion.button>

            {/* Back to Login Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center pt-6 border-t-2 border-gray-200"
            >
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-black font-heading font-bold hover:underline text-base"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Login
              </Link>
            </motion.div>
          </form>
        </div>
      </div>

      {/* Right Side - Branding */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-black text-white p-12 flex-col justify-center relative overflow-hidden"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(white 1px, transparent 1px),
              linear-gradient(90deg, white 1px, transparent 1px)
            `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Animated Floating Squares */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.div
            className="absolute w-64 h-64 border-2 border-white"
            style={{ top: '10%', left: '10%' }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute w-48 h-48 border-2 border-white"
            style={{ top: '30%', right: '15%' }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'linear',
              delay: 1,
            }}
          />
          <motion.div
            className="absolute w-32 h-32 border-2 border-white"
            style={{ bottom: '20%', left: '25%' }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
              delay: 2,
            }}
          />
          <motion.div
            className="absolute w-56 h-56 border-2 border-white"
            style={{ bottom: '25%', right: '8%' }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute w-40 h-40 border-2 border-white"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'linear',
              delay: 1.5,
            }}
          />
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="font-heading text-7xl font-bold mb-8 leading-none uppercase">
              Account<br />
              Recovery
            </h2>
            <p className="text-2xl text-white/80 font-medium leading-relaxed mb-8">
              We&apos;ll send you a link to reset your password and regain access to your account.
            </p>

            {/* Security Features */}
            <div className="space-y-4 mt-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-heading font-bold text-lg uppercase">Email Sent</p>
                  <p className="text-white/70 text-sm">Link delivered to your inbox</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-heading font-bold text-lg uppercase">Secure Link</p>
                  <p className="text-white/70 text-sm">Valid for 24 hours only</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-heading font-bold text-lg uppercase">Quick Process</p>
                  <p className="text-white/70 text-sm">Back to your account in minutes</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}