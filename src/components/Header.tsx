'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, LogOut } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      if (!auth) return;
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'Project', href: '#projects' },
    { name: 'Shop', href: '#shop' },
    { name: 'News', href: '#news' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-500 ${
          isScrolled ? 'shadow-2xl' : ''
        }`}
      >
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-24 lg:h-28">
            
            {/* Logo */}
            <Link href="/" className="relative z-50">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <Image 
                  src="/logo.jpeg" 
                  alt="LJ Esports" 
                  width={180} 
                  height={80}
                  className="w-auto h-12 lg:h-16 object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative font-heading text-lg font-semibold text-white uppercase tracking-wider group"
                  >
                    {item.name}
                    <motion.span
                      className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Cart Icon */}
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-white hover:text-gray-300 transition-colors"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={24} strokeWidth={2} />
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </motion.button>

              {/* Wishlist Icon */}
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-white hover:text-gray-300 transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={24} strokeWidth={2} />
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </motion.button>

              {/* Sign In / Logout Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {user ? (
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(255,255,255,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-white text-black font-heading font-bold text-base uppercase tracking-widest border-2 border-white hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </motion.button>
                ) : (
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(255,255,255,0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-4 bg-white text-black font-heading font-bold text-base uppercase tracking-widest border-2 border-white hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Mobile Right Section */}
            <div className="lg:hidden flex items-center gap-4 z-50">
              {/* Cart Icon Mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-white"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={22} strokeWidth={2} />
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </motion.button>

              {/* Wishlist Icon Mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-white"
                aria-label="Wishlist"
              >
                <Heart size={22} strokeWidth={2} />
                <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-12 h-12 flex flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 10 : 0,
                  }}
                  className="w-8 h-1 bg-white origin-center transition-all"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    scale: isMobileMenuOpen ? 0 : 1,
                  }}
                  className="w-8 h-1 bg-white transition-all"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -10 : 0,
                  }}
                  className="w-8 h-1 bg-white origin-center transition-all"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={{
          x: isMobileMenuOpen ? 0 : '100%',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="lg:hidden fixed inset-0 bg-black z-40"
      >
        <nav className="flex flex-col items-center justify-start h-full pt-32 gap-6 px-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : 50,
              }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-wider hover:text-gray-300 transition-colors"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 50,
            }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-8"
          >
            {user ? (
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="px-12 py-5 bg-white text-black font-heading font-bold text-xl uppercase tracking-widest border-2 border-white flex items-center gap-3"
              >
                <LogOut size={24} />
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="px-12 py-5 bg-white text-black font-heading font-bold text-xl uppercase tracking-widest border-2 border-white">
                  Sign In
                </button>
              </Link>
            )}
          </motion.div>
        </nav>
      </motion.div>
    </>
  );
}