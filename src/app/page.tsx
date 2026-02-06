'use client';

import { motion, useScroll } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Trophy, 
  Users, 
  Target, 
  Star,
  Gamepad2,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });


  const services = [
    {
      icon: Users,
      title: 'Talent Management',
      description: 'Professional representation for esports athletes and content creators',
      features: ['Contract Negotiation', 'Career Planning', 'Brand Building']
    },
    {
      icon: Target,
      title: 'Brand Partnerships',
      description: 'Connect with top brands and sponsors in the gaming industry',
      features: ['Sponsorship Deals', 'Marketing Campaigns', 'Event Partnerships']
    },
    {
      icon: TrendingUp,
      title: 'Content Strategy',
      description: 'Grow your audience with data-driven content strategies',
      features: ['Content Planning', 'Social Media', 'Analytics']
    },
    {
      icon: Award,
      title: 'Tournament Support',
      description: 'Comprehensive support for competitive gaming success',
      features: ['Team Coordination', 'Travel Logistics', 'Performance Analysis']
    }
  ];

  const stats = [
    { number: '500+', label: 'Managed Talents', icon: Users },
    { number: '50K+', label: 'Community Members', icon: Star },
    { number: '100+', label: 'Tournaments Won', icon: Trophy },
    { number: '$2M+', label: 'Deals Secured', icon: TrendingUp }
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Professional Gamer',
      game: 'Valorant',
      quote: 'LJ Esports transformed my career. Within 6 months, I went from streaming to my first major tournament win.',
      image: '/placeholder-avatar.jpg'
    },
    {
      name: 'Maria Santos',
      role: 'Content Creator',
      game: 'League of Legends',
      quote: 'The team helped me secure partnerships I never thought possible. My channel grew 300% in one year.',
      image: '/placeholder-avatar.jpg'
    },
    {
      name: 'Jordan Lee',
      role: 'Pro Player',
      game: 'CS:GO',
      quote: 'Professional management that actually understands esports. They handle everything so I can focus on winning.',
      image: '/placeholder-avatar.jpg'
    }
  ];

  return (
    <div ref={containerRef} className="bg-white">
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">
        {/* Animated Background Grid */}
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
                width: `${100 + i * 30}px`,
                height: `${100 + i * 30}px`,
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

        <div className="relative z-10 max-w-350 mx-auto px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 bg-white/10 border border-white/20 text-sm font-heading font-bold uppercase tracking-widest">
                  Elite Esports Management
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-heading text-6xl lg:text-8xl font-bold mb-6 leading-none uppercase"
              >
                Elevate<br />
                Your<br />
                <span className="text-white/60">Game</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl lg:text-2xl text-white/80 mb-8 max-w-lg font-medium"
              >
                Professional talent management for esports athletes and content creators. 
                Turn your gaming passion into a thriving career.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white text-black font-heading font-bold text-lg uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-3 group"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <Link href="#services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 border-2 border-white text-white font-heading font-bold text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 group hover:bg-white/20 transition-all"
                >
                  <stat.icon className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                  <div className="font-heading text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/70 font-medium uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl lg:text-7xl font-bold text-black mb-6 uppercase">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions to elevate your esports career
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setActiveService(index)}
                className={`border-4 p-8 cursor-pointer transition-all ${
                  activeService === index
                    ? 'border-black bg-black text-white'
                    : 'border-black bg-white text-black hover:bg-gray-50'
                }`}
              >
                <service.icon className="w-12 h-12 mb-6" strokeWidth={2} />
                <h3 className="font-heading text-3xl font-bold mb-4 uppercase">
                  {service.title}
                </h3>
                <p className={`text-lg mb-6 ${activeService === index ? 'text-white/80' : 'text-gray-600'}`}>
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <Zap className="w-5 h-5" />
                      <span className="font-semibold">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl lg:text-7xl font-bold mb-6 uppercase">
              Success Stories
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Hear from the champions we&apos;ve helped build
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 border-2 border-white/20 p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-white" />
                  ))}
                </div>
                <p className="text-lg mb-6 text-white/90 italic">
                  &ldquo;{testimonial.quote}&ldquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-lg">{testimonial.name}</div>
                    <div className="text-white/70 text-sm">{testimonial.role} • {testimonial.game}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black text-white p-12 lg:p-20 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(white 1px, transparent 1px),
                    linear-gradient(90deg, white 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />
            </div>

            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-heading text-5xl lg:text-7xl font-bold mb-6 uppercase"
              >
                Ready to Level Up?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl text-white/80 mb-10 max-w-2xl mx-auto"
              >
                Join the elite. Start your journey with LJ Esports Management today.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 bg-white text-black font-heading font-bold text-xl uppercase tracking-widest hover:bg-gray-200 transition-all inline-flex items-center gap-3 group"
                  >
                    Get Started Now
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}