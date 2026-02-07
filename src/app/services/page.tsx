'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  Briefcase,
  MessageSquare,
  BarChart3,
  Shield,
  Rocket,
  Globe,
  Calendar,
  DollarSign,
  Video,
  Megaphone,
  Trophy,
  Settings,
  Heart,
  Sparkles,
  ChevronRight,
  Zap,
  Brain,
  Code
} from 'lucide-react';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  const mainServices = [
    {
      id: 'talent',
      icon: Users,
      title: 'Talent Management',
      tagline: 'Your Career, Our Priority',
      description: 'Comprehensive representation for esports athletes and content creators. We handle the business so you can focus on winning.',
      color: '#000000',
      features: [
        {
          icon: Briefcase,
          title: 'Contract Negotiation',
          detail: 'Secure the best deals with teams, sponsors, and platforms'
        },
        {
          icon: Rocket,
          title: 'Career Strategy',
          detail: 'Long-term planning to maximize your potential and earnings'
        },
        {
          icon: Shield,
          title: 'Legal Protection',
          detail: 'Expert legal review and protection of your rights'
        },
        {
          icon: DollarSign,
          title: 'Financial Management',
          detail: 'Smart money management and investment guidance'
        }
      ],
      benefits: [
        { icon: Zap, text: 'Fast-track your career growth' },
        { icon: Shield, text: 'Full legal & financial protection' },
        { icon: Brain, text: 'Strategic long-term planning' }
      ],
      process: [
        'Initial consultation and career assessment',
        'Custom strategy development',
        'Contract negotiation and deal closure',
        'Ongoing support and career growth'
      ]
    },
    {
      id: 'partnerships',
      icon: Target,
      title: 'Brand Partnerships',
      tagline: 'Connecting Brands with Champions',
      description: 'Strategic partnerships that align with your values and amplify your brand. We connect you with the right sponsors at the right time.',
      color: '#000000',
      features: [
        {
          icon: Megaphone,
          title: 'Sponsorship Deals',
          detail: 'Negotiate lucrative partnerships with top brands'
        },
        {
          icon: BarChart3,
          title: 'Marketing Campaigns',
          detail: 'Collaborative campaigns that boost both parties'
        },
        {
          icon: Globe,
          title: 'Global Reach',
          detail: 'Access to international brand networks'
        },
        {
          icon: Sparkles,
          title: 'Brand Matching',
          detail: 'Perfect alignment between talent and sponsors'
        }
      ],
      benefits: [
        { icon: Globe, text: 'Access to global brand network' },
        { icon: DollarSign, text: 'Maximize sponsorship revenue' },
        { icon: Code, text: 'Data-driven brand matching' }
      ],
      process: [
        'Brand compatibility assessment',
        'Proposal development and pitching',
        'Contract negotiation and terms',
        'Campaign execution and reporting'
      ]
    },
    {
      id: 'content',
      icon: TrendingUp,
      title: 'Content Strategy',
      tagline: 'Data-Driven Growth',
      description: 'Strategic content planning backed by analytics and industry insights. Grow your audience and maximize engagement across all platforms.',
      color: '#000000',
      features: [
        {
          icon: Video,
          title: 'Content Planning',
          detail: 'Strategic roadmaps for consistent, engaging content'
        },
        {
          icon: BarChart3,
          title: 'Analytics & Insights',
          detail: 'Deep-dive analysis to optimize performance'
        },
        {
          icon: Sparkles,
          title: 'Creative Direction',
          detail: 'Professional guidance on content quality'
        },
        {
          icon: MessageSquare,
          title: 'Community Management',
          detail: 'Build and nurture your loyal fanbase'
        }
      ],
      benefits: [
        { icon: TrendingUp, text: 'Accelerated audience growth' },
        { icon: BarChart3, text: 'Data-backed decisions' },
        { icon: Sparkles, text: 'Professional content quality' }
      ],
      process: [
        'Audience analysis and goal setting',
        'Content calendar creation',
        'Performance tracking and optimization',
        'Monthly strategy reviews'
      ]
    },
    {
      id: 'tournament',
      icon: Award,
      title: 'Tournament Support',
      tagline: 'Victory Through Preparation',
      description: 'Complete tournament logistics and support. From registration to victory, we handle everything so you can focus on performance.',
      color: '#000000',
      features: [
        {
          icon: Calendar,
          title: 'Event Coordination',
          detail: 'Complete tournament registration and scheduling'
        },
        {
          icon: Settings,
          title: 'Team Logistics',
          detail: 'Travel, accommodation, and equipment management'
        },
        {
          icon: Trophy,
          title: 'Performance Analysis',
          detail: 'Post-game analysis and improvement strategies'
        },
        {
          icon: Heart,
          title: 'Mental Coaching',
          detail: 'Sports psychology and peak performance support'
        }
      ],
      benefits: [
        { icon: Trophy, text: 'Focus on performance, not logistics' },
        { icon: Brain, text: 'Mental coaching & preparation' },
        { icon: BarChart3, text: 'Post-tournament analysis' }
      ],
      process: [
        'Tournament identification and registration',
        'Comprehensive preparation and training',
        'On-site support and coordination',
        'Post-tournament analysis and debriefing'
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Shield,
      title: 'Legal Advisory',
      description: 'Expert legal counsel for contracts, disputes, and IP protection'
    },
    {
      icon: Video,
      title: 'Production Services',
      description: 'Professional video production and content creation support'
    },
    {
      icon: MessageSquare,
      title: 'PR & Communications',
      description: 'Public relations, crisis management, and media training'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time performance tracking and audience insights'
    },
    {
      icon: Globe,
      title: 'International Expansion',
      description: 'Support for breaking into new markets and regions'
    },
    {
      icon: Sparkles,
      title: 'Personal Branding',
      description: 'Build a unique, authentic brand that resonates'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: 'Custom',
      description: 'Perfect for emerging talents',
      features: [
        'Basic contract review',
        'Monthly strategy calls',
        'Email support',
        'Analytics dashboard access',
        'Quarterly performance reviews'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: 'Custom',
      description: 'For established players',
      features: [
        'Full contract negotiation',
        'Weekly strategy sessions',
        'Priority support (24/7)',
        'Advanced analytics & insights',
        'Brand partnership sourcing',
        'Content strategy planning',
        'Tournament coordination'
      ],
      highlighted: true
    },
    {
      name: 'Elite',
      price: 'Custom',
      description: 'Premium tier for champions',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Legal team on retainer',
        'Production support',
        'PR & crisis management',
        'International expansion support',
        'Exclusive networking events',
        'Financial advisory services'
      ],
      highlighted: false
    }
  ];

  return (
    <div ref={containerRef} className="bg-white">
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">
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
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-white"
              style={{
                width: `${80 + i * 25}px`,
                height: `${80 + i * 25}px`,
                top: `${5 + i * 8}%`,
                left: `${3 + i * 8}%`,
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
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-350 mx-auto px-6 lg:px-12 py-20 text-center"
        >
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
              Elite Services
            </motion.span>

            <h1 className="font-heading text-6xl lg:text-9xl font-bold mb-8 leading-none uppercase">
              Transform<br />
              Your<br />
              <span className="text-white/60">Career</span>
            </h1>

            <p className="text-2xl lg:text-3xl text-white/80 mb-12 max-w-3xl mx-auto font-medium">
              Comprehensive esports management services designed to elevate your game and maximize your potential
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="#services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-white text-black font-heading font-bold text-xl uppercase tracking-widest hover:bg-gray-200 transition-all inline-flex items-center gap-3 group"
                >
                  Explore Services
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>

              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 border-2 border-white text-white font-heading font-bold text-xl uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
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

      {/* Main Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-5xl lg:text-7xl font-bold text-black mb-6 uppercase">
              Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build a sustainable, successful career in esports
            </p>
          </motion.div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {mainServices.map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 font-heading font-bold uppercase tracking-wider transition-all flex items-center gap-3 ${
                  selectedService === index
                    ? 'bg-black text-white'
                    : 'bg-white text-black border-2 border-black hover:bg-gray-100'
                }`}
              >
                <service.icon className="w-5 h-5" />
                {service.title}
              </motion.button>
            ))}
          </div>

          {/* Selected Service Details */}
          <motion.div
            key={selectedService}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black text-white p-12 lg:p-16"
          >
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  {(() => {
                    const ServiceIcon = mainServices[selectedService].icon;
                    return <ServiceIcon className="w-16 h-16" strokeWidth={1.5} />;
                  })()}
                  <div>
                    <h3 className="font-heading text-4xl lg:text-5xl font-bold uppercase">
                      {mainServices[selectedService].title}
                    </h3>
                    <p className="text-xl text-white/70 mt-2">
                      {mainServices[selectedService].tagline}
                    </p>
                  </div>
                </div>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  {mainServices[selectedService].description}
                </p>

                {/* Benefits */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-heading text-xl font-bold uppercase mb-4">
                    Key Benefits
                  </h4>
                  {mainServices[selectedService].benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex items-center gap-4 bg-white/10 p-4"
                    >
                      <benefit.icon className="w-6 h-6 shrink-0" />
                      <span className="font-semibold">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                {/* Features */}
                <h4 className="font-heading text-2xl font-bold mb-6 uppercase">
                  What&apos;s Included
                </h4>
                <div className="space-y-4 mb-8">
                  {mainServices[selectedService].features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="bg-white/10 p-6 cursor-pointer transition-all hover:bg-white/20"
                    >
                      <div className="flex items-start gap-4">
                        <feature.icon className="w-8 h-8 shrink-0" />
                        <div>
                          <h5 className="font-heading font-bold text-xl mb-2">
                            {feature.title}
                          </h5>
                          <p className="text-white/70">
                            {feature.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Process */}
                <h4 className="font-heading text-2xl font-bold mb-6 uppercase">
                  Our Process
                </h4>
                <div className="space-y-3">
                  {mainServices[selectedService].process.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-heading font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-white/90">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-white text-black font-heading font-bold text-xl uppercase tracking-widest hover:bg-gray-200 transition-all inline-flex items-center gap-3 group"
                >
                  Get This Service
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Services */}
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
              Additional Services
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Specialized support to cover every aspect of your esports career
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 border-2 border-white/20 p-8 backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer"
              >
                <service.icon className="w-12 h-12 mb-6" strokeWidth={1.5} />
                <h3 className="font-heading text-2xl font-bold mb-4 uppercase">
                  {service.title}
                </h3>
                <p className="text-white/80 mb-6">
                  {service.description}
                </p>
                <Link href="#contact" className="inline-flex items-center gap-2 text-white font-heading font-bold hover:gap-4 transition-all">
                  Learn More
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl lg:text-7xl font-bold text-black mb-6 uppercase">
              Investment Tiers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing tailored to your career stage and goals
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: tier.highlighted ? 1 : 1.02 }}
                className={`border-4 p-8 relative ${
                  tier.highlighted
                    ? 'border-black bg-black text-white scale-105'
                    : 'border-black bg-white text-black'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white text-black font-heading font-bold text-sm uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <h3 className="font-heading text-3xl font-bold mb-2 uppercase">
                  {tier.name}
                </h3>
                <p className={`mb-6 ${tier.highlighted ? 'text-white/70' : 'text-gray-600'}`}>
                  {tier.description}
                </p>
                <div className="mb-8">
                  <div className="font-heading text-4xl font-bold mb-2">
                    {tier.price}
                  </div>
                  <p className={`text-sm ${tier.highlighted ? 'text-white/70' : 'text-gray-600'}`}>
                    Tailored to your needs
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="#contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 font-heading font-bold text-lg uppercase tracking-widest transition-all ${
                      tier.highlighted
                        ? 'bg-white text-black hover:bg-gray-200'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 text-gray-600"
          >
            All pricing is customized based on your specific needs and goals.
            <Link href="#contact" className="text-black font-bold ml-2 hover:underline">
              Contact us for a personalized quote
            </Link>
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
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
              FAQ
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Common questions about our services
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                q: 'How do I get started?',
                a: 'Simply contact us through our inquiry form. We\'ll schedule a consultation to discuss your goals and determine the best service package for you.'
              },
              {
                q: 'What makes LJ Esports different?',
                a: 'We combine deep industry expertise with personalized attention. Every talent gets a custom strategy, not a one-size-fits-all approach.'
              },
              {
                q: 'Do you work with new talents?',
                a: 'Absolutely! We work with talents at all career stages, from emerging players to established champions.'
              },
              {
                q: 'How long are contracts?',
                a: 'Contract lengths vary based on the service tier and your goals. We offer flexible terms from 6 months to multi-year agreements.'
              },
              {
                q: 'What games/platforms do you cover?',
                a: 'We manage talents across all major esports titles and streaming platforms including Twitch, YouTube, and TikTok.'
              },
              {
                q: 'Can I switch tiers?',
                a: 'Yes! As your career grows, you can upgrade to higher tiers. We regularly review and adjust service levels with our talents.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 p-8 border-2 border-white/20"
              >
                <h3 className="font-heading text-xl font-bold mb-4 uppercase">
                  {faq.q}
                </h3>
                <p className="text-white/80">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black text-white p-12 lg:p-20 relative overflow-hidden text-center"
          >
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

            <div className="relative z-10">
              <h2 className="font-heading text-5xl lg:text-7xl font-bold mb-6 uppercase">
                Ready to Dominate?
              </h2>
              <p className="text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
                Let&apos;s build your esports empire together
              </p>
              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 bg-white text-black font-heading font-bold text-xl uppercase tracking-widest hover:bg-gray-200 transition-all inline-flex items-center gap-3 group"
                >
                  Start Your Journey
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}