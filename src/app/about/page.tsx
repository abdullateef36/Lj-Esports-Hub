'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Rocket, 
  Palette,
  Handshake,
  MessageSquare,
  Zap,
  Heart,
  Shield,
  Trophy,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const services = [
    {
      icon: Users,
      title: 'Talent Management',
      description: 'Comprehensive representation for competitive teams, professional players, and content creators. We don\'t just manage careers; we build legacies.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'Strategic Branding & Design',
      description: 'From custom stream assets and tournament title production to full-scale branding for esports organizations and live events.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Handshake,
      title: 'Partnerships & Growth',
      description: 'We navigate the business of gaming by securing high-impact sponsorships and managing sustainable brand partnerships.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: MessageSquare,
      title: 'Digital Presence',
      description: 'Expert social media management and content strategy designed to grow your community and amplify your voice.',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Pushing boundaries in esports management'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Building trust through transparency'
    },
    {
      icon: Rocket,
      title: 'Excellence',
      description: 'Never settling for anything less than the best'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Dedicated to the gaming community'
    }
  ];

  const stats = [
    { number: '100%', label: 'Dedicated' },
    { number: '24/7', label: 'Support' },
    { number: '∞', label: 'Possibilities' },
    { number: '1', label: 'Mission' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">
        {/* Animated Grid Background */}
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
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-white"
              style={{
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                top: `${5 + i * 6}%`,
                left: `${2 + i * 6.5}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-6 py-3 bg-white/10 border-2 border-white/20 text-sm font-heading font-bold uppercase tracking-widest">
                Our Story
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-heading text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold mb-8 uppercase leading-none"
            >
              Limitless<br />
              Journey
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
            >
              At Limitless Journey, we bridge the gap between raw talent and professional excellence. As a full-service esports management agency, we provide the infrastructure creators and competitors need to thrive in the digital age.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-white text-black font-heading font-bold text-lg uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-3"
                >
                  Our Services
                  <Rocket className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 border-2 border-white text-white font-heading font-bold text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  Get In Touch
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
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

      {/* Tagline Section */}
      <section className="bg-black border-y-4 border-white py-8 lg:py-12">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-3xl sm:text-4xl lg:text-6xl font-bold text-white text-center uppercase"
          >
            We handle the logistics.{' '}
            <span className="text-white/60">You master the game.</span>
          </motion.h2>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-350uto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-2">
                  {stat.number}
                </div>
                <div className="text-lg sm:text-xl text-gray-600 uppercase tracking-wider font-heading font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-black text-white">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 uppercase">
              Our Core Expertise
            </h2>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto">
              Four pillars of excellence that drive our mission forward
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-sm border-2 border-white/10 p-8 lg:p-10 h-full hover:border-white/30 transition-all duration-300">
                  {/* Icon with gradient */}
                  <div className={`inline-block p-4 bg-linear-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" strokeWidth={2} />
                  </div>

                  <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-4 uppercase">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover effect indicator */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${service.gradient}`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 uppercase">
              Our Values
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <div className="bg-black p-8 lg:p-10 border-4 border-black hover:border-gray-300 transition-all group">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-4"
                  >
                    <value.icon className="w-12 h-12 lg:w-16 lg:h-16 text-white" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-3 uppercase">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 text-base lg:text-lg">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="relative py-20 lg:py-32 bg-black text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(white 2px, transparent 2px),
                linear-gradient(90deg, white 2px, transparent 2px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 blur-3xl" />

        <div className="relative z-10 max-w-300 mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-8"
            >
              <Sparkles className="w-16 h-16 lg:w-20 lg:h-20 text-white mx-auto mb-4" />
            </motion.div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 uppercase">
              Our Mission
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border-l-4 border-white pl-8 pr-8 py-8 bg-white/5 backdrop-blur-sm"
            >
              <p className="text-2xl sm:text-3xl lg:text-4xl leading-relaxed font-medium mb-6">
                To empower the next generation of{' '}
                <span className="text-white font-bold">African and global gaming talent</span>{' '}
                by providing the professional structure, creative edge, and strategic connections needed to redefine the industry.
              </p>
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                We are committed to turning passion into sustainable careers through{' '}
                <span className="text-white font-bold">innovation</span>,{' '}
                <span className="text-white font-bold">integrity</span>, and a{' '}
                <span className="text-white font-bold">limitless pursuit of excellence</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-white text-black font-heading font-bold text-xl uppercase tracking-widest hover:bg-gray-200 transition-all inline-flex items-center gap-3"
                >
                  Join Our Journey
                  <Trophy className="w-6 h-6" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-black text-white p-12 lg:p-20 border-4 border-black relative overflow-hidden"
          >
            {/* Background Grid */}
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
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 uppercase">
                Ready to Go Limitless?
              </h2>
              <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Let&apos;s build your esports legacy together
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 bg-white text-black font-heading font-bold text-lg uppercase tracking-widest hover:bg-gray-200 transition-all"
                  >
                    View Services
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 border-2 border-white text-white font-heading font-bold text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}