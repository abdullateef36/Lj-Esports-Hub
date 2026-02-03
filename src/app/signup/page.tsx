'use client';

import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Phone, ArrowRight, Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (!fullName.trim()) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    if (!gender) {
      setError('Please select your gender');
      setLoading(false);
      return;
    }

    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      setLoading(false);
      return;
    }

    try {
      if (!auth || !db) {
        throw new Error('Service not available. Please try again later.');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: fullName.trim(),
      });

      await userCredential.user.reload();

      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: email.toLowerCase().trim(),
        displayName: fullName.trim(),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        gender: gender,
        role: 'user',
        createdAt: serverTimestamp(),
        isAdmin: false,
      });

      setEmail('');
      setPhoneNumber('');
      setFullName('');
      setPassword('');
      setConfirmPassword('');
      setGender('');

      setTimeout(() => {
        router.push('/');
      }, 100);

    } catch (err: unknown) {
      console.error('Signup error:', err);
      
      if (err instanceof Error) {
        const errorMessage = err.message;
        
        if (errorMessage.includes('email-already-in-use')) {
          setError('This email is already registered. Please use a different email or sign in.');
        } else if (errorMessage.includes('weak-password')) {
          setError('Password is too weak. Please use a stronger password.');
        } else if (errorMessage.includes('invalid-email')) {
          setError('Invalid email address. Please enter a valid email.');
        } else if (errorMessage.includes('network-request-failed')) {
          setError('Network error. Please check your internet connection.');
        } else if (errorMessage.includes('auth/internal-error')) {
          setError('Server error. Please try again later.');
        } else if (errorMessage.includes('auth/too-many-requests')) {
          setError('Too many attempts. Please try again later.');
        } else {
          setError(`Signup failed: ${errorMessage}`);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white flex">
      
      {/* Left Side - Branding */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-black text-white p-12 flex-col justify-between relative overflow-hidden"
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 border border-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <Link href="/">
            <Image
              src="/logo_one.jpeg"
              alt="LJ Esports"
              width={180}
              height={60}
              className="w-auto h-16 object-contain mb-12"
            />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="font-heading text-6xl font-bold mb-6 leading-tight">
              JOIN THE<br />
              <span className="text-white/70">ELITE</span>
            </h1>
            <p className="text-xl text-white/80 max-w-md font-medium">
              Become part of the next generation of esports champions. Your journey to greatness starts here.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <Gamepad2 className="w-12 h-12" />
            <div>
              <p className="text-2xl font-heading font-bold">500+</p>
              <p className="text-white/70">Managed Talents</p>
            </div>
          </div>
          <p className="text-white/60 text-sm">
            Trusted by professional gamers worldwide
          </p>
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <motion.div variants={itemVariants} className="lg:hidden mb-8 text-center">
            <Link href="/">
              <Image
                src="/logo_one.jpeg"
                alt="LJ Esports"
                width={150}
                height={50}
                className="w-auto h-12 object-contain mx-auto mb-4"
              />
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="font-heading text-4xl font-bold text-black mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 text-lg">
              Start your esports journey with us
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black text-white px-4 py-3 border-2 border-black"
              >
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-heading font-bold text-black mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-4 border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-all disabled:opacity-50 font-medium"
                  required
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-heading font-bold text-black mb-2 uppercase tracking-wider">
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
                  className="w-full pl-12 pr-4 py-4 border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-all disabled:opacity-50 font-medium"
                  required
                />
              </div>
            </motion.div>

            {/* Phone Number */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-heading font-bold text-black mb-2 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-4 border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-all disabled:opacity-50 font-medium"
                  required
                />
              </div>
            </motion.div>

            {/* Gender */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-heading font-bold text-black mb-2 uppercase tracking-wider">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center py-4 px-4 border-2 cursor-pointer transition-all font-heading font-bold uppercase tracking-wider ${
                    gender === 'male'
                      ? 'border-black bg-black text-white'
                      : 'border-black bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="sr-only"
                    required
                  />
                  <span>Male</span>
                </motion.label>
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center py-4 px-4 border-2 cursor-pointer transition-all font-heading font-bold uppercase tracking-wider ${
                    gender === 'female'
                      ? 'border-black bg-black text-white'
                      : 'border-black bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="sr-only"
                    required
                  />
                  <span>Female</span>
                </motion.label>
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-heading font-bold text-black mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-12 pr-12 py-4 border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-all disabled:opacity-50 font-medium"
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

            {/* Confirm Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-heading font-bold text-black mb-2 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-12 pr-12 py-4 border-2 border-black text-black placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-all disabled:opacity-50 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 font-heading font-bold text-lg uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </span>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            {/* Sign In Link */}
            <motion.div variants={itemVariants} className="text-center pt-4">
              <p className="text-gray-600 font-medium">
                Already have an account?{' '}
                <Link href="/login" className="text-black font-heading font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}