'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle,
  ChevronDown,
  Users,
  ShoppingBag,
  Shield,
  Mail,
  Clock,
  FileText,
  Briefcase,
  Globe,
  ArrowRight,
  Search,
  MessageSquare
} from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const categories = [
    {
      id: 'general',
      title: 'General',
      icon: HelpCircle,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'services',
      title: 'Services',
      icon: Briefcase,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'shop',
      title: 'Shop & Orders',
      icon: ShoppingBag,
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'account',
      title: 'Account',
      icon: Users,
      color: 'from-orange-600 to-red-600'
    }
  ];

  const faqs = [
    // General Questions
    {
      id: 'what-is-lj',
      category: 'general',
      question: 'What is LJ Esports Hub?',
      answer: 'LJ Esports Hub is a professional esports talent management platform based in Nigeria. We offer comprehensive services including talent representation, brand partnerships, content strategy, tournament support, and an e-commerce shop for gaming merchandise. Our mission is to elevate African esports talent to the global stage.'
    },
    {
      id: 'who-can-use',
      category: 'general',
      question: 'Who can use LJ Esports Hub?',
      answer: 'Our platform is designed for professional esports players, content creators, gaming teams, brands looking to enter the esports space, and gaming enthusiasts who want to purchase premium merchandise. Whether you\'re an aspiring pro or an established creator, we have services tailored to your needs.'
    },
    {
      id: 'location',
      category: 'general',
      question: 'Where are you located?',
      answer: 'LJ Esports Hub is based in Lagos, Nigeria. While we primarily serve the Nigerian and African esports community, we work with talent and brands globally through our digital platform and international network.'
    },
    {
      id: 'how-to-contact',
      category: 'general',
      question: 'How can I contact LJ Esports Hub?',
      answer: 'You can reach us through multiple channels: Email us at contact@ljsports.com, call us at +234 (0) 123 456 7890, or use the contact form on our website. For service inquiries, you can also apply directly through our services page. We typically respond within 24-48 hours during business days.'
    },

    // Services Questions
    {
      id: 'what-services',
      category: 'services',
      question: 'What services do you offer?',
      answer: 'We offer four main service categories: (1) Talent Representation & Management - including contract negotiations, career planning, and brand building for pro players and content creators. (2) Creative Studio & Branding - identity design, stream assets, and event production. (3) Strategic Partnerships & Sponsorships - securing deals and managing brand relationships. (4) Media & Community Management - social media strategy, community building, and public relations.'
    },
    {
      id: 'how-to-apply',
      category: 'services',
      question: 'How do I apply for your services?',
      answer: 'Navigate to the "Services" tab on our shop page, select the service you\'re interested in, and click "Apply for Service". Fill out the application form with your details and project requirements. Our team will review your application and respond within 2-3 business days with next steps.'
    },
    {
      id: 'service-cost',
      category: 'services',
      question: 'How much do your services cost?',
      answer: 'Service costs vary depending on the scope, duration, and specific requirements of your project. We offer customized pricing based on your needs. After you submit a service application, we\'ll schedule a consultation to discuss your goals and provide a detailed quote. We believe in transparent pricing with no hidden fees.'
    },
    {
      id: 'service-timeline',
      category: 'services',
      question: 'How long does it take to get started?',
      answer: 'After submitting your service application, we typically respond within 2-3 business days. Once accepted, we\'ll schedule an initial consultation within 1 week. The full onboarding process usually takes 1-2 weeks, depending on the service and your specific requirements. Urgent projects can be accommodated on a case-by-case basis.'
    },
    {
      id: 'service-requirements',
      category: 'services',
      question: 'What do I need to provide for service applications?',
      answer: 'For service applications, you\'ll need to provide: your full name, email, phone number, organization/team name (if applicable), and a detailed description of your needs, goals, and timeline. For talent management, we may request portfolio links, streaming channels, or competitive history. The more details you provide, the better we can tailor our services to your needs.'
    },
    {
      id: 'can-i-cancel',
      category: 'services',
      question: 'Can I cancel or modify my service package?',
      answer: 'Yes, you can modify or cancel services with appropriate notice. The specific terms depend on your service agreement. Generally, you can request changes at any time, and we\'ll work with you to accommodate your needs. Cancellation policies and any associated fees are outlined in your service contract. We recommend discussing any concerns with your account manager first.'
    },

    // Shop & Orders Questions
    {
      id: 'how-to-shop',
      category: 'shop',
      question: 'How do I purchase products?',
      answer: 'Browse our shop by clicking "Physical Products" on the shop page. Add items to your cart, proceed to checkout, fill in your delivery information, and complete payment. You\'ll receive an order confirmation email immediately, and you can track your order status in the "Orders" section of your account.'
    },
    {
      id: 'payment-methods',
      category: 'shop',
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit/debit cards (Visa, Mastercard), bank transfers, and popular Nigerian payment platforms. All transactions are processed securely through our payment partners. Payment must be completed before your order is processed for delivery.'
    },
    {
      id: 'shipping',
      category: 'shop',
      question: 'Where do you ship and how long does delivery take?',
      answer: 'We currently ship to addresses within Nigeria. Delivery times vary by location: Lagos and major cities (2-5 business days), other states (5-10 business days). Shipping costs are calculated at checkout based on your location and order size. We use reliable courier services and provide tracking information once your order ships.'
    },
    {
      id: 'track-order',
      category: 'shop',
      question: 'How can I track my order?',
      answer: 'After logging in, go to the "Orders" section in your account. You\'ll see all your orders with current status (Pending, In Delivery, or Delivered). Click on an order to view detailed tracking information, delivery address, and items ordered. You\'ll also receive email updates when your order status changes.'
    },
    {
      id: 'returns',
      category: 'shop',
      question: 'What is your return policy?',
      answer: 'Physical products can be returned within 14 days of receipt if unused and in original packaging. Custom or personalized items are non-refundable. To initiate a return, contact our support team with your order number and reason for return. Refunds are processed within 7-14 business days to your original payment method. Shipping costs are non-refundable unless the return is due to our error.'
    },
    {
      id: 'damaged-items',
      category: 'shop',
      question: 'What if my item arrives damaged?',
      answer: 'We\'re sorry if your item arrived damaged! Please contact us within 48 hours of delivery with photos of the damage and your order number. We\'ll arrange for a replacement or full refund at no additional cost. We take great care in packaging, but shipping damage can occasionally occur. Your satisfaction is our priority.'
    },
    {
      id: 'stock',
      category: 'shop',
      question: 'How do I know if an item is in stock?',
      answer: 'Product availability is shown on each item\'s page. If an item is out of stock, you\'ll see "Out of Stock" instead of "Add to Cart". You can add your email to the waitlist to be notified when the item is restocked. We regularly update our inventory and restock popular items based on demand.'
    },
    {
      id: 'bulk-orders',
      category: 'shop',
      question: 'Do you offer bulk or wholesale pricing?',
      answer: 'Yes! We offer special pricing for bulk orders and wholesale partnerships. For orders of 10+ items or for tournament/team orders, contact us at wholesale@ljsports.com with your requirements. We can provide custom pricing, team branding options, and flexible payment terms for qualified orders.'
    },

    // Account Questions
    {
      id: 'create-account',
      category: 'account',
      question: 'Do I need an account to shop or apply for services?',
      answer: 'Yes, you need to create a free account to purchase products, apply for services, and track orders. Creating an account allows you to manage your purchases, save your preferences, view order history, and receive personalized recommendations. Registration takes less than 2 minutes.'
    },
    {
      id: 'forgot-password',
      category: 'account',
      question: 'I forgot my password. What should I do?',
      answer: 'Click on "Forgot Password" on the login page. Enter your email address, and we\'ll send you a password reset link. Check your spam folder if you don\'t receive the email within 5 minutes. The reset link expires after 24 hours for security. If you continue having issues, contact our support team.'
    },
    {
      id: 'update-info',
      category: 'account',
      question: 'How do I update my account information?',
      answer: 'Log in to your account and go to "Account Settings" or "Profile". You can update your name, email, phone number, password, and delivery address. Changes are saved automatically. For security, you may need to verify your identity when updating sensitive information like email or password.'
    },
    {
      id: 'delete-account',
      category: 'account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can request account deletion by contacting our support team at privacy@ljsports.com. Please note that deleting your account will remove all your personal data, order history, and preferences. This action cannot be undone. We\'ll retain minimal information as required by law for tax and business purposes.'
    },
    {
      id: 'data-privacy',
      category: 'account',
      question: 'How is my personal data protected?',
      answer: 'We take your privacy seriously. All data is encrypted in transit and at rest. We comply with Nigerian Data Protection Regulation (NDPR) 2019. We never sell your personal information to third parties. For detailed information about data collection, usage, and your rights, please read our Privacy Policy. You can request a copy of your data or deletion at any time.'
    },
    {
      id: 'newsletter',
      category: 'account',
      question: 'How do I manage email preferences?',
      answer: 'You can manage your email preferences in your account settings. Choose which types of emails you want to receive (order updates, promotions, newsletters, service updates). You can also unsubscribe from marketing emails using the link at the bottom of any promotional email. Note that you\'ll still receive essential transactional emails related to your orders and account.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === null || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

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
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Floating Question Marks */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${10 + i * 12}%`,
                left: `${5 + i * 12}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              <HelpCircle size={40 + i * 10} strokeWidth={1.5} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <HelpCircle size={80} className="mx-auto mb-6" strokeWidth={1.5} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-none uppercase"
            >
              Frequently<br />
              <span className="text-white/60">Asked Questions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            >
              Find answers to common questions about our services, shop, and platform
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white text-black border-4 border-white focus:outline-none focus:ring-4 focus:ring-white/50 font-medium"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b-4 border-black bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-3 font-heading font-bold uppercase tracking-wider transition-all ${
                activeCategory === null
                  ? 'bg-black text-white border-4 border-black'
                  : 'bg-white text-black border-4 border-black hover:bg-black hover:text-white'
              }`}
            >
              All Questions
            </motion.button>

            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 font-heading font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-black text-white border-4 border-black'
                      : 'bg-white text-black border-4 border-black hover:bg-black hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {category.title}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 border-4 border-black">
              <Search size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="font-heading text-2xl font-bold uppercase mb-2">
                No Results Found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or browse by category
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory(null);
                }}
                className="px-6 py-3 bg-black text-white font-heading font-bold uppercase tracking-wider hover:bg-gray-900 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="border-4 border-black bg-white hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => toggleQuestion(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-heading text-lg lg:text-xl font-bold uppercase flex-1">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedQuestion === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} className="shrink-0" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedQuestion === faq.id ? 'auto' : 0,
                      opacity: expandedQuestion === faq.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t-4 border-black">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <MessageSquare size={64} className="mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
              Reach out and we&apos;ll get back to you as soon as possible.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-black font-heading font-bold uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  Contact Support
                  <ArrowRight size={18} />
                </motion.button>
              </Link>

              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white font-heading font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                >
                  Browse Shop
                </motion.button>
              </Link>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 border-2 border-white/20 bg-white/10">
                <Mail size={24} className="mx-auto mb-2" />
                <p className="text-xs font-heading font-bold uppercase mb-1">Email</p>
                <p className="text-sm text-white/80">contact@ljsports.com</p>
              </div>
              <div className="p-4 border-2 border-white/20 bg-white/10">
                <Clock size={24} className="mx-auto mb-2" />
                <p className="text-xs font-heading font-bold uppercase mb-1">Response Time</p>
                <p className="text-sm text-white/80">24-48 hours</p>
              </div>
              <div className="p-4 border-2 border-white/20 bg-white/10">
                <Globe size={24} className="mx-auto mb-2" />
                <p className="text-xs font-heading font-bold uppercase mb-1">Location</p>
                <p className="text-sm text-white/80">Lagos, Nigeria</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/terms">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 border-4 border-black bg-white hover:bg-black hover:text-white transition-all text-center group"
              >
                <FileText size={32} className="mx-auto mb-3" />
                <h3 className="font-heading font-bold uppercase text-sm">
                  Terms & Conditions
                </h3>
              </motion.div>
            </Link>

            <Link href="/privacy">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 border-4 border-black bg-white hover:bg-black hover:text-white transition-all text-center group"
              >
                <Shield size={32} className="mx-auto mb-3" />
                <h3 className="font-heading font-bold uppercase text-sm">
                  Privacy Policy
                </h3>
              </motion.div>
            </Link>

            <Link href="/shop">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 border-4 border-black bg-white hover:bg-black hover:text-white transition-all text-center group"
              >
                <ShoppingBag size={32} className="mx-auto mb-3" />
                <h3 className="font-heading font-bold uppercase text-sm">
                  Shop Products
                </h3>
              </motion.div>
            </Link>

            <Link href="/shop">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-6 border-4 border-black bg-white hover:bg-black hover:text-white transition-all text-center group"
              >
                <Briefcase size={32} className="mx-auto mb-3" />
                <h3 className="font-heading font-bold uppercase text-sm">
                  Our Services
                </h3>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}