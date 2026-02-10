'use client';

import { motion, useScroll } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Users,
  Target,
  TrendingUp,
  Award,
  Zap,
  ShoppingBag,
  Briefcase,
  Rocket,
  Shield,
  Globe,
  Sparkles,
  Brain,
  Code,
  Mic,
  Video
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

  const expertise = [
    {
      icon: Rocket,
      title: 'Growth Focused',
      description: 'Strategies built to scale your career fast'
    },
    {
      icon: Shield,
      title: 'Full Protection',
      description: 'Legal and financial safeguards at every step'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Access to international opportunities'
    },
    {
      icon: Sparkles,
      title: 'Personal Branding',
      description: 'Craft an authentic, memorable identity'
    }
  ];

  const approach = [
    {
      number: '01',
      title: 'Discovery Call',
      description: 'We get to know your goals, strengths, and vision for your esports career.',
      icon: Mic
    },
    {
      number: '02',
      title: 'Strategy Design',
      description: 'Custom roadmap tailored to your unique situation and ambitions.',
      icon: Brain
    },
    {
      number: '03',
      title: 'Execution',
      description: 'We handle negotiations, partnerships, and logistics while you focus on performing.',
      icon: Code
    },
    {
      number: '04',
      title: 'Growth & Scale',
      description: 'Continuous optimization and expansion as your career evolves.',
      icon: Video
    }
  ];

  const clients = [
    { name: 'Slack', logo: '/slack.jpg' },
    { name: 'British', logo: '/british.jpg' },
    { name: 'Bonton', logo: '/bonton.jpg' },
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
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white text-black font-heading font-bold text-lg uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-3 group"
                  >
                    Contact Us
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 border-2 border-white text-white font-heading font-bold text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    Our Services
                  </motion.button>
                </Link>
              </motion.div>

              {/* Secondary Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-3 mt-6"
              >
                <Link href="#projects">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/10 border border-white/30 text-white font-heading font-semibold text-sm uppercase tracking-wider hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    View Projects
                  </motion.button>
                </Link>

                <Link href="#shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/10 border border-white/30 text-white font-heading font-semibold text-sm uppercase tracking-wider hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Shop Merch
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Expertise Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-6"
            >
              {expertise.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 lg:p-8 group hover:bg-white/20 transition-all"
                >
                  <item.icon className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                  <div className="font-heading text-lg sm:text-xl font-bold mb-2 uppercase wrap-break-word">
                    {item.title}
                  </div>
                  <div className="text-white/70 font-medium text-sm leading-snug wrap-break-word">
                    {item.description}
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

      {/* Our Approach Section */}
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
              Our Approach
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              A proven process designed to maximize your potential
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {approach.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 border-2 border-white/20 p-8 backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-white text-black flex items-center justify-center font-heading font-bold text-2xl mb-4">
                      {step.number}
                    </div>
                    <div className="w-16 h-16 bg-white/10 flex items-center justify-center">
                      <step.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold mb-4 uppercase">
                      {step.title}
                    </h3>
                    <p className="text-white/80 text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-24 pb-10 bg-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl lg:text-7xl font-bold text-black mb-6 uppercase">
              Our Clients
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by leading brands and organizations in esports
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="border-2 border-black p-8 flex items-center justify-center bg-white hover:bg-black hover:border-white transition-all group"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={150}
                  height={80}
                  className="w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-24 pb-20 bg-white">
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
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 bg-white text-black font-heading font-bold text-xl uppercase tracking-widest hover:bg-gray-200 transition-all inline-flex items-center gap-3 group"
                  >
                    Contact Us
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </Link>

                <Link href="#news">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 border-2 border-white text-white font-heading font-bold text-xl uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    Latest News
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
