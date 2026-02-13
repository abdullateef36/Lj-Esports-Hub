'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { 
  FileText,
  Shield,
  Users,
  CreditCard,
  AlertTriangle,
  Scale,
  Lock,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Globe,
  ArrowRight
} from 'lucide-react';

export default function TermsPage() {
  const containerRef = useRef(null);
  
  useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });


  const sections = [
    {
      id: 'acceptance',
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using the LJ Esports Hub website and services, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to these Terms and Conditions, please do not use our website or services.',
        'We reserve the right to modify these terms at any time. Your continued use of the site following any changes indicates your acceptance of the new terms.',
        'These terms apply to all visitors, users, and others who access or use the service.'
      ]
    },
    {
      id: 'services',
      icon: Users,
      title: 'Services Offered',
      content: [
        'LJ Esports Hub provides professional esports talent management, brand partnerships, content strategy, and tournament support services.',
        'We offer both physical products through our shop and professional services through our service application system.',
        'All services are subject to availability and may be modified, suspended, or discontinued at any time without prior notice.',
        'Service delivery timelines are estimates and may vary based on circumstances beyond our control.'
      ]
    },
    {
      id: 'user-accounts',
      icon: Lock,
      title: 'User Accounts',
      content: [
        'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
        'You must provide accurate, current, and complete information during registration.',
        'You must immediately notify us of any unauthorized use of your account or any other breach of security.',
        'We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.',
        'You may not use another user\'s account without permission or impersonate any person or entity.'
      ]
    },
    {
      id: 'purchases',
      icon: CreditCard,
      title: 'Purchases & Payments',
      content: [
        'All prices are listed in Nigerian Naira (NGN) and are subject to change without notice.',
        'Payment must be received in full before products are shipped or services are rendered.',
        'We accept various payment methods as indicated during checkout. All transactions are processed securely.',
        'You are responsible for any applicable taxes, duties, or customs fees.',
        'All sales are final unless otherwise stated in our refund policy.',
        'We reserve the right to refuse or cancel any order for any reason, including product availability, errors in pricing, or suspected fraudulent activity.'
      ]
    },
    {
      id: 'service-applications',
      icon: FileText,
      title: 'Service Applications',
      content: [
        'Submitting a service application does not guarantee acceptance or service provision.',
        'We reserve the right to accept or reject any service application at our sole discretion.',
        'Response times for service applications are estimates and may vary. We typically respond within 2-3 business days.',
        'All information provided in service applications must be accurate and truthful.',
        'By submitting an application, you consent to be contacted via the email and phone number provided.'
      ]
    },
    {
      id: 'intellectual-property',
      icon: Shield,
      title: 'Intellectual Property Rights',
      content: [
        'All content on this website, including text, graphics, logos, images, and software, is the property of LJ Esports Hub or its licensors.',
        'Our trademarks, service marks, and logos may not be used without our prior written consent.',
        'You may not reproduce, distribute, modify, or create derivative works from our content without permission.',
        'User-generated content remains the property of the respective users, but you grant us a license to use it on our platform.',
        'We respect intellectual property rights and expect users to do the same.'
      ]
    },
    {
      id: 'prohibited-conduct',
      icon: XCircle,
      title: 'Prohibited Conduct',
      content: [
        'You may not use our services for any illegal purpose or to violate any laws.',
        'Harassment, abuse, or threatening behavior toward other users or our staff is strictly prohibited.',
        'You may not attempt to gain unauthorized access to our systems or other users\' accounts.',
        'Distribution of viruses, malware, or any harmful code is forbidden.',
        'Spamming, phishing, or any form of unsolicited commercial communication is not allowed.',
        'You may not scrape, harvest, or collect information from our site using automated means without permission.',
        'Impersonation of any person or entity, or false representation of your affiliation, is prohibited.'
      ]
    },
    {
      id: 'content-guidelines',
      icon: AlertTriangle,
      title: 'Content Guidelines',
      content: [
        'Users are responsible for all content they post, upload, or share on our platform.',
        'Content must not be offensive, defamatory, obscene, or violate any laws or third-party rights.',
        'We reserve the right to remove any content that violates these guidelines without notice.',
        'You retain ownership of your content but grant us a worldwide, non-exclusive license to use it.',
        'We are not responsible for user-generated content and do not endorse any opinions expressed by users.'
      ]
    },
    {
      id: 'privacy',
      icon: Globe,
      title: 'Privacy & Data Protection',
      content: [
        'Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.',
        'We collect personal information necessary to provide our services, including name, email, phone number, and payment information.',
        'Your data is stored securely and we implement industry-standard security measures.',
        'We do not sell your personal information to third parties.',
        'You have the right to access, correct, or delete your personal data. Contact us to exercise these rights.',
        'By using our services, you consent to our data collection and processing practices as described in our Privacy Policy.'
      ]
    },
    {
      id: 'shipping',
      icon: Calendar,
      title: 'Shipping & Delivery',
      content: [
        'Shipping times are estimates and may vary based on location and product availability.',
        'We ship to addresses within Nigeria. International shipping may be available for select products.',
        'Shipping costs are calculated at checkout based on destination and order weight.',
        'Risk of loss and title for products pass to you upon delivery to the carrier.',
        'We are not responsible for delays caused by the shipping carrier or customs.',
        'Damaged or lost shipments should be reported within 48 hours of expected delivery.'
      ]
    },
    {
      id: 'refunds',
      icon: CreditCard,
      title: 'Refunds & Cancellations',
      content: [
        'Physical products may be returned within 14 days of receipt if unused and in original packaging.',
        'Digital products and services are non-refundable once delivered or rendered.',
        'Custom or personalized items are not eligible for return or refund.',
        'Refunds are processed using the original payment method within 7-14 business days.',
        'Shipping costs are non-refundable unless the return is due to our error.',
        'We reserve the right to refuse returns that do not meet our return policy criteria.'
      ]
    },
    {
      id: 'warranties',
      icon: Shield,
      title: 'Warranties & Disclaimers',
      content: [
        'Our services and products are provided "as is" without warranties of any kind, either express or implied.',
        'We do not guarantee that our services will be uninterrupted, error-free, or completely secure.',
        'We make no warranties regarding the accuracy, reliability, or completeness of any content on our site.',
        'Product descriptions are provided for informational purposes and may contain errors.',
        'We disclaim all liability for any damages arising from the use of our services or products.',
        'Some jurisdictions do not allow limitations on warranties, so these limitations may not apply to you.'
      ]
    },
    {
      id: 'limitation',
      icon: Scale,
      title: 'Limitation of Liability',
      content: [
        'To the maximum extent permitted by law, LJ Esports Hub shall not be liable for any indirect, incidental, special, or consequential damages.',
        'Our total liability for any claim arising from your use of our services shall not exceed the amount you paid us in the 12 months prior to the claim.',
        'We are not responsible for any loss of profits, revenue, data, or business opportunities.',
        'This limitation applies regardless of the legal theory (contract, tort, negligence, etc.).',
        'Some jurisdictions do not allow limitation of liability for certain damages, so these limitations may not apply to you.'
      ]
    },
    {
      id: 'indemnification',
      icon: Shield,
      title: 'Indemnification',
      content: [
        'You agree to indemnify and hold harmless LJ Esports Hub, its officers, directors, employees, and agents from any claims, damages, or expenses.',
        'This includes legal fees arising from your use of our services, violation of these terms, or infringement of any rights.',
        'We reserve the right to assume exclusive defense of any matter subject to indemnification by you.',
        'You will cooperate with us in defending any such claims.'
      ]
    },
    {
      id: 'termination',
      icon: XCircle,
      title: 'Termination',
      content: [
        'We may terminate or suspend your access to our services immediately, without prior notice, for any reason.',
        'Grounds for termination include violation of these terms, fraudulent activity, or extended periods of inactivity.',
        'Upon termination, your right to use our services ceases immediately.',
        'Provisions that should survive termination (including warranties, limitation of liability, and dispute resolution) will remain in effect.',
        'You may terminate your account at any time by contacting us.'
      ]
    },
    {
      id: 'governing-law',
      icon: Scale,
      title: 'Governing Law & Disputes',
      content: [
        'These terms are governed by the laws of the Federal Republic of Nigeria.',
        'Any disputes arising from these terms or your use of our services shall be resolved in Nigerian courts.',
        'You agree to submit to the personal jurisdiction of courts located in Lagos, Nigeria.',
        'We encourage users to contact us first to resolve disputes informally.',
        'If informal resolution fails, disputes may be submitted to binding arbitration.',
        'You waive your right to participate in class action lawsuits against us.'
      ]
    },
    {
      id: 'modifications',
      icon: FileText,
      title: 'Modifications to Terms',
      content: [
        'We reserve the right to modify these Terms and Conditions at any time.',
        'Changes will be effective immediately upon posting on our website.',
        'Your continued use of our services after changes indicates acceptance of the modified terms.',
        'We will notify users of significant changes via email or prominent notice on our website.',
        'It is your responsibility to review these terms periodically.'
      ]
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contact Information',
      content: [
        'If you have questions about these Terms and Conditions, please contact us:',
        'Email: legal@ljsports.com',
        'Phone: +234 XXX XXX XXXX',
        'Address: Lagos, Nigeria',
        'We aim to respond to all inquiries within 48 hours during business days.'
      ]
    }
  ];

  return (
    <div ref={containerRef} className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-black text-white overflow-hidden flex items-center">
        {/* Animated Background Grid */}
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

        {/* Floating Squares */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-white"
              style={{
                width: `${80 + i * 25}px`,
                height: `${80 + i * 25}px`,
                top: `${10 + i * 12}%`,
                left: `${5 + i * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 90, 180],
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
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
              <FileText size={80} className="mx-auto mb-6" strokeWidth={1.5} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-heading text-6xl lg:text-8xl font-bold mb-6 leading-none uppercase"
            >
              Terms &<br />
              <span className="text-white/60">Conditions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl lg:text-2xl text-white/80 mb-6 max-w-3xl mx-auto"
            >
              Please read these terms carefully before using our services
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center gap-3 text-sm text-white/60"
            >
              <Calendar size={16} />
              <span>Last Updated: February 13, 2026</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-gray-50 border-y-4 border-black sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <span className="font-heading font-bold uppercase text-sm whitespace-nowrap">
              Jump to:
            </span>
            {sections.slice(0, 6).map((section, index) => (
              <motion.a
                key={section.id}
                href={`#${section.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-all font-heading font-bold uppercase text-xs whitespace-nowrap"
              >
                {section.title}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-4 border-black p-8 bg-gray-50"
          >
            <h2 className="font-heading text-3xl font-bold uppercase mb-4">
              Welcome to LJ Esports Hub
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              These Terms and Conditions govern your use of the LJ Esports Hub website and services. 
              By accessing or using our platform, you agree to comply with and be bound by these terms.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              LJ Esports Hub is a professional esports talent management platform offering services including 
              talent representation, brand partnerships, content strategy, and an e-commerce shop for gaming merchandise.
            </p>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border-2 border-yellow-600 mt-6">
              <AlertTriangle className="text-yellow-600 shrink-0 mt-1" size={20} />
              <p className="text-sm text-yellow-900">
                <strong className="font-heading uppercase">Important:</strong> These terms include 
                important information about your legal rights and obligations. Please read them carefully.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="scroll-mt-32"
              >
                <div className="border-4 border-black bg-white hover:shadow-2xl transition-shadow">
                  {/* Header */}
                  <div className="bg-black text-white p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white text-black flex items-center justify-center shrink-0">
                      <Icon size={28} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-xs font-heading font-bold uppercase text-white/60 mb-1">
                        Section {index + 1}
                      </div>
                      <h2 className="font-heading text-2xl lg:text-3xl font-bold uppercase">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <ul className="space-y-4">
                      {section.content.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-2 h-2 bg-black mt-2 shrink-0" />
                          <p className="text-gray-700 leading-relaxed">{item}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Agreement Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-4 border-black bg-white p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <CheckCircle size={64} className="mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase mb-4">
                Agreement Acknowledgment
              </h2>
              <p className="text-lg text-gray-700">
                By using LJ Esports Hub, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms and Conditions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 border-2 border-black">
                <FileText size={32} className="mx-auto mb-3" />
                <p className="font-heading font-bold uppercase text-sm">Read Carefully</p>
              </div>
              <div className="text-center p-4 border-2 border-black">
                <CheckCircle size={32} className="mx-auto mb-3" />
                <p className="font-heading font-bold uppercase text-sm">Accept Terms</p>
              </div>
              <div className="text-center p-4 border-2 border-black">
                <Shield size={32} className="mx-auto mb-3" />
                <p className="font-heading font-bold uppercase text-sm">Stay Protected</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-black text-white font-heading font-bold uppercase tracking-wider hover:bg-gray-900 transition-all flex items-center gap-2"
                >
                  Back to Home
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-black text-black font-heading font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Mail size={40} className="mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-bold uppercase mb-3">
              Questions About These Terms?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              If you have any questions or concerns about these Terms and Conditions, 
              please don&apos;t hesitate to contact our legal team.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black font-heading font-bold uppercase tracking-wider hover:bg-gray-200 transition-all inline-flex items-center gap-2"
              >
                Get in Touch
                <Mail size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}