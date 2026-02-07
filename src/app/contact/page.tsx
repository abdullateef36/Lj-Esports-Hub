'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare,
  Globe,
  Clock,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'contact@ljesports.com',
      link: 'mailto:contact@ljesports.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+234 (0) 801 234 5678',
      link: 'tel:+2348012345678'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Lagos, Nigeria',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 9AM - 6PM WAT',
      link: '#'
    }
  ];

  const subjects = [
    'General Inquiry',
    'Talent Management',
    'Brand Partnerships',
    'Tournament Support',
    'Content Strategy',
    'Other'
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
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

        {/* Floating Squares */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-white"
              style={{
                width: `${80 + i * 25}px`,
                height: `${80 + i * 25}px`,
                top: `${10 + i * 10}%`,
                left: `${5 + i * 12}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-350 mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-6 py-3 bg-white/10 border border-white/20 text-sm font-heading font-bold uppercase tracking-widest mb-8"
            >
              Get In Touch
            </motion.span>

            <h1 className="font-heading text-6xl lg:text-9xl font-bold mb-8 leading-none uppercase">
              Let&apos;s<br />
              Talk
            </h1>

            <p className="text-2xl lg:text-3xl text-white/80 mb-12 max-w-3xl mx-auto font-medium">
              Ready to elevate your esports career? We&apos;re here to help you dominate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-black">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 border-2 border-white/20 p-8 text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                <info.icon className="w-12 h-12 mb-4" />
                <h3 className="font-heading text-xl font-bold uppercase mb-2">
                  {info.title}
                </h3>
                <p className="text-white/80">
                  {info.details}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-5xl lg:text-6xl font-bold text-black mb-6 uppercase">
                Send Us A<br />Message
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions about our services? Want to discuss partnership opportunities? 
                Fill out the form and we&apos;ll get back to you within 24-48 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg uppercase mb-2">
                      Quick Response
                    </h3>
                    <p className="text-gray-600">
                      We typically respond within 24 hours during business days
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg uppercase mb-2">
                      Global Reach
                    </h3>
                    <p className="text-gray-600">
                      Working with talents and brands worldwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg uppercase mb-2">
                      Personalized Support
                    </h3>
                    <p className="text-gray-600">
                      Every inquiry gets our full attention and expertise
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-black p-8 lg:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white text-black px-6 py-4 border-2 border-white flex items-start gap-3"
                  >
                    <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading font-bold uppercase mb-1">Message Sent!</p>
                      <p className="text-sm">We&apos;ll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white text-black px-6 py-4 border-2 border-white"
                  >
                    <p className="font-semibold">{error}</p>
                  </motion.div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-white font-heading font-bold uppercase tracking-wider mb-3 text-sm">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 border-2 border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-white transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white font-heading font-bold uppercase tracking-wider mb-3 text-sm">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 border-2 border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-white transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white font-heading font-bold uppercase tracking-wider mb-3 text-sm">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 801 234 5678"
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 border-2 border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-white transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-white font-heading font-bold uppercase tracking-wider mb-3 text-sm">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-4 border-2 border-white/20 bg-white/10 text-white focus:outline-none focus:border-white transition-all disabled:opacity-50"
                  >
                    <option value="" className="bg-black">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject} className="bg-black">
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white font-heading font-bold uppercase tracking-wider mb-3 text-sm">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    rows={6}
                    required
                    disabled={loading}
                    className="w-full px-4 py-4 border-2 border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-white transition-all disabled:opacity-50 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black py-4 font-heading font-bold text-lg uppercase tracking-widest hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12 text-center">
          <h3 className="font-heading text-3xl lg:text-4xl font-bold mb-4 uppercase">
            Prefer to talk directly?
          </h3>
          <p className="text-xl text-white/80 mb-8">
            Book a consultation call with our team
          </p>
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-black font-heading font-bold text-lg uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              View Services
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}