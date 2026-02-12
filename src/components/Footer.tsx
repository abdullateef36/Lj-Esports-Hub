'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaXTwitter, FaInstagram, FaDiscord, FaYoutube, FaTwitch } from 'react-icons/fa6';

export default function Footer() {
  const footerLinks = {
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Talent', href: '#talent' },
      { name: 'Services', href: '/services' },
      { name: 'Careers', href: '#careers' },
    ],
    Resources: [
      { name: 'News', href: '#news' },
      { name: 'Contact', href: '#contact' },
      { name: 'FAQ', href: '#faq' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms & Conditions', href: '#terms' },
    ],
  };

  const socialLinks = [
    { name: 'X', href: '#', Icon: FaXTwitter },
    { name: 'Instagram', href: '#', Icon: FaInstagram },
    { name: 'Discord', href: '#', Icon: FaDiscord },
    { name: 'YouTube', href: '#', Icon: FaYoutube },
    { name: 'Twitch', href: '#', Icon: FaTwitch },
  ];

  return (
    <footer className="bg-black text-white border-t-4 border-white">
      <div className="max-w-350 mx-auto px-6 lg:px-12 py-16 lg:py-20">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/logo_one.jpeg" 
                alt="LJ Esports" 
                width={200} 
                height={80}
                className="w-auto h-16 object-contain"
              />
            </Link>
            <p className="text-gray-400 text-lg mb-8 max-w-sm font-medium">
              Elevating gaming talent and building winning brands in the esports industry.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="w-12 h-12 bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
                  aria-label={social.name}
                >
                  <social.Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h3 className="font-heading text-xl font-bold uppercase tracking-widest mb-6">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-base font-medium inline-block hover:translate-x-1 transform duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
            <p className="text-sm font-medium">
              © {new Date().getFullYear()} LJ Esports Management. All rights reserved.
            </p>
            <p className="text-sm font-medium">
              Built with passion for esports excellence
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Stripe */}
      <div className="h-2 bg-white" />
    </footer>
  );
}