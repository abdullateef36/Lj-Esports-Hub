'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { 
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  Cookie,
  Globe,
  Mail,
  Settings,
  UserCheck,
  FileText,
  Server,
  Fingerprint,
  Download,
  Trash2,
  Bell,
  Calendar,
  ArrowRight,
  Share2
} from 'lucide-react';

export default function PrivacyPage() {
  const containerRef = useRef(null);
  
  useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });


  const sections = [
    {
      id: 'introduction',
      icon: Shield,
      title: 'Introduction',
      content: [
        'At LJ Esports Hub, we are committed to protecting your privacy and ensuring the security of your personal information.',
        'This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
        'By using our services, you agree to the collection and use of information in accordance with this policy.',
        'We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date.'
      ]
    },
    {
      id: 'information-collect',
      icon: Database,
      title: 'Information We Collect',
      subtitle: 'Personal Information',
      content: [
        'Account Information: Name, email address, phone number, and password when you create an account.',
        'Profile Information: Display name, profile picture, gaming preferences, and bio information.',
        'Payment Information: Credit card details, billing address, and transaction history (processed securely through third-party payment processors).',
        'Service Application Data: Information you provide when applying for our professional services, including organization details, project requirements, and business needs.',
        'Communication Data: Messages, emails, and other communications you send to us or through our platform.',
        'Identity Verification: Government-issued ID or other verification documents when required for certain services.'
      ],
      additionalContent: {
        subtitle: 'Automatically Collected Information',
        items: [
          'Device Information: IP address, browser type, operating system, device identifiers.',
          'Usage Data: Pages visited, time spent on pages, links clicked, search queries.',
          'Location Data: General geographic location based on IP address.',
          'Cookies and Tracking: Information collected through cookies, web beacons, and similar technologies.',
          'Analytics Data: User behavior patterns, feature usage, and performance metrics.'
        ]
      }
    },
    {
      id: 'how-we-use',
      icon: Settings,
      title: 'How We Use Your Information',
      content: [
        'Service Delivery: To provide, maintain, and improve our services, process transactions, and fulfill orders.',
        'Account Management: To create and manage your account, authenticate users, and provide customer support.',
        'Communication: To send service-related notifications, respond to inquiries, and provide updates about our services.',
        'Personalization: To customize your experience, recommend relevant content, and show personalized advertisements.',
        'Business Operations: To process service applications, manage partnerships, and conduct business analytics.',
        'Security: To detect, prevent, and address fraud, security issues, and technical problems.',
        'Legal Compliance: To comply with legal obligations, enforce our terms, and protect our rights.',
        'Marketing: To send promotional materials, newsletters, and updates about new features (with your consent).'
      ]
    },
    {
      id: 'sharing',
      icon: Share2,
      title: 'How We Share Your Information',
      content: [
        'Service Providers: We share information with third-party vendors who perform services on our behalf, including payment processors, email services, analytics providers, and hosting services.',
        'Business Transfers: In connection with any merger, sale, or acquisition, your information may be transferred to the acquiring entity.',
        'Legal Requirements: We may disclose information when required by law, court order, or government request, or to protect our rights and safety.',
        'Partners and Sponsors: With your consent, we may share information with esports teams, brands, and sponsors for partnership opportunities.',
        'Public Information: Information you choose to make public (such as profile details, posts, or comments) may be visible to other users.',
        'Aggregated Data: We may share anonymized, aggregated data that does not identify you personally for research, analytics, or marketing purposes.'
      ]
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: 'Cookies & Tracking Technologies',
      content: [
        'Essential Cookies: Required for basic website functionality, authentication, and security.',
        'Performance Cookies: Help us understand how visitors use our site through analytics (Google Analytics, etc.).',
        'Functional Cookies: Remember your preferences, settings, and choices.',
        'Advertising Cookies: Used to deliver relevant advertisements and measure campaign effectiveness.',
        'Third-Party Cookies: Set by our partners for analytics, advertising, and social media integration.',
        'Cookie Control: You can control cookies through your browser settings. Note that disabling cookies may affect site functionality.',
        'Do Not Track: We currently do not respond to Do Not Track signals, but you can disable cookies as described above.'
      ]
    },
    {
      id: 'data-security',
      icon: Lock,
      title: 'Data Security',
      content: [
        'Encryption: We use SSL/TLS encryption to protect data in transit and industry-standard encryption for data at rest.',
        'Access Controls: Strict access controls ensure only authorized personnel can access personal information.',
        'Secure Storage: Data is stored on secure servers with regular backups and disaster recovery procedures.',
        'Payment Security: Payment information is processed by PCI-DSS compliant third-party processors; we do not store full credit card details.',
        'Regular Audits: We conduct regular security audits and vulnerability assessments.',
        'Employee Training: Our team is trained on data protection and privacy best practices.',
        'Incident Response: We have procedures in place to detect, respond to, and notify you of any data breaches.',
        'No Guarantee: While we implement strong security measures, no method of transmission over the internet is 100% secure.'
      ]
    },
    {
      id: 'your-rights',
      icon: UserCheck,
      title: 'Your Privacy Rights',
      content: [
        'Access: You have the right to request a copy of the personal information we hold about you.',
        'Correction: You can request that we correct inaccurate or incomplete information.',
        'Deletion: You can request deletion of your personal information, subject to certain exceptions.',
        'Portability: You can request a copy of your data in a structured, machine-readable format.',
        'Opt-Out: You can opt out of marketing communications at any time using the unsubscribe link in emails.',
        'Cookie Preferences: You can manage cookie settings through your browser or our cookie preference center.',
        'Account Closure: You can close your account at any time, which will result in deletion of your personal data.',
        'Complaint: You have the right to lodge a complaint with a data protection authority.'
      ]
    },
    {
      id: 'data-retention',
      icon: Calendar,
      title: 'Data Retention',
      content: [
        'Active Accounts: We retain your information for as long as your account is active or as needed to provide services.',
        'Closed Accounts: After account closure, we retain certain information for legal, tax, and business purposes.',
        'Transaction Records: Financial transaction records are kept for 7 years as required by law.',
        'Marketing Data: Marketing preferences and communication history are retained until you opt out.',
        'Support Tickets: Customer support communications are retained for 3 years for quality assurance.',
        'Analytics Data: Anonymized usage data may be retained indefinitely for business analytics.',
        'Legal Holds: Information subject to legal holds or investigations is retained until the matter is resolved.'
      ]
    },
    {
      id: 'children',
      icon: Users,
      title: 'Children\'s Privacy',
      content: [
        'Our services are not intended for children under 13 years of age.',
        'We do not knowingly collect personal information from children under 13.',
        'If we discover that we have collected information from a child under 13, we will delete it immediately.',
        'Parents or guardians who believe their child has provided information should contact us.',
        'For users aged 13-18, parental consent may be required for certain features or services.',
        'We comply with all applicable children\'s privacy laws, including COPPA (Children\'s Online Privacy Protection Act).'
      ]
    },
    {
      id: 'international',
      icon: Globe,
      title: 'Data Storage & Transfers',
      content: [
        'Our services are based in Nigeria and your data is primarily stored on servers within Nigeria or in secure cloud infrastructure.',
        'We may use international service providers (such as Firebase, Cloudinary) that may process data outside Nigeria.',
        'When we use international service providers, we ensure they maintain adequate data protection standards.',
        'We comply with Nigerian data protection laws regarding any cross-border data transfers.',
        'By using our services, you consent to the processing of your information as described in this policy.',
        'All our service providers are contractually bound to protect your data in accordance with our privacy standards.'
      ]
    },
    {
      id: 'third-party',
      icon: Server,
      title: 'Third-Party Services',
      content: [
        'Our website and services may contain links to third-party websites and services.',
        'We are not responsible for the privacy practices of these third parties.',
        'We encourage you to read the privacy policies of any third-party sites you visit.',
        'Third-party services we use include: Firebase (authentication & database), Stripe (payments), Google Analytics (analytics), Cloudinary (image hosting).',
        'These providers have their own privacy policies and data practices.',
        'We do not control and are not responsible for third-party cookies or tracking technologies.'
      ]
    },
    {
      id: 'email-marketing',
      icon: Mail,
      title: 'Email & Marketing Communications',
      content: [
        'We send transactional emails necessary for service delivery (order confirmations, password resets, etc.).',
        'Marketing emails require your consent and include an unsubscribe option.',
        'You can manage email preferences in your account settings.',
        'Unsubscribing from marketing emails does not affect transactional communications.',
        'We use email service providers to send and track email campaigns.',
        'We do not sell or rent your email address to third parties.',
        'Promotional emails may include tracking pixels to measure open rates and engagement.'
      ]
    },
    {
      id: 'nigerian-law',
      icon: Shield,
      title: 'Nigerian Data Protection Law',
      content: [
        'LJ Esports Hub complies with the Nigeria Data Protection Regulation (NDPR) 2019 and related legislation.',
        'We are committed to protecting your personal data in accordance with Nigerian law and international best practices.',
        'Legal Basis: We process your data based on your consent, contractual necessity, legal obligations, and legitimate business interests.',
        'Data Subject Rights: You have the right to access, correct, delete, and restrict processing of your personal data.',
        'Complaints: You have the right to lodge a complaint with the National Information Technology Development Agency (NITDA).',
        'We maintain proper records of all data processing activities as required by Nigerian law.',
        'Our data protection practices align with the eight principles of data protection under the NDPR.',
        'Contact our Data Protection Officer at dpo@ljsports.com for any data protection inquiries or to exercise your rights.'
      ]
    },
    {
      id: 'updates',
      icon: Bell,
      title: 'Policy Updates',
      content: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.',
        'Material changes will be notified via email or prominent notice on our website.',
        'The "Last Updated" date at the top of this policy indicates when it was last revised.',
        'Your continued use of our services after changes indicates acceptance of the updated policy.',
        'We encourage you to review this policy periodically.',
        'Previous versions of this policy are available upon request.'
      ]
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contact Us',
      content: [
        'If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:',
        'Email: privacy@ljsports.com',
        'Data Protection Officer: dpo@ljsports.com',
        'Phone: +234 (0) 123 456 7890',
        'Address: LJ Esports Hub, Lagos, Nigeria',
        'We aim to respond to all privacy inquiries within 14 business days.',
        'For urgent security or privacy concerns, please mark your email as "URGENT" in the subject line.',
        'You may also file a complaint with NITDA (National Information Technology Development Agency) if you believe your data protection rights have been violated.'
      ]
    }
  ];

  const dataTypes = [
    {
      icon: UserCheck,
      title: 'Personal Data',
      description: 'Name, email, phone, address',
      examples: ['Registration info', 'Profile details', 'Contact data']
    },
    {
      icon: Fingerprint,
      title: 'Technical Data',
      description: 'Device info, IP address, browser',
      examples: ['Device ID', 'Browser type', 'Location data']
    },
    {
      icon: Eye,
      title: 'Usage Data',
      description: 'How you interact with our services',
      examples: ['Pages visited', 'Time spent', 'Click patterns']
    },
    {
      icon: Database,
      title: 'Transaction Data',
      description: 'Purchase and payment information',
      examples: ['Order history', 'Payment details', 'Billing info']
    }
  ];

  const rights = [
    { icon: Eye, title: 'Access', description: 'Request your data' },
    { icon: FileText, title: 'Correction', description: 'Fix inaccurate data' },
    { icon: Trash2, title: 'Deletion', description: 'Delete your data' },
    { icon: Download, title: 'Portability', description: 'Export your data' },
    { icon: Bell, title: 'Opt-Out', description: 'Stop marketing emails' },
    { icon: Settings, title: 'Control', description: 'Manage preferences' }
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

        {/* Floating Shields */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${10 + i * 15}%`,
                left: `${5 + i * 15}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.4,
              }}
            >
              <Shield size={60 + i * 15} strokeWidth={1.5} />
            </motion.div>
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
              <Lock size={80} className="mx-auto mb-6" strokeWidth={1.5} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-none uppercase"
            >
              Privacy<br />
              <span className="text-white/60">Policy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl lg:text-2xl text-white/80 mb-6 max-w-3xl mx-auto"
            >
              Your privacy matters. Learn how we protect and handle your information.
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

      {/* Data We Collect Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold uppercase mb-4">
              What Data We Collect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transparency about the information we gather
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="border-4 border-black bg-white p-6 hover:bg-black hover:text-white transition-all group"
                >
                  <Icon size={40} className="mb-4" strokeWidth={2} />
                  <h3 className="font-heading text-xl font-bold uppercase mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm mb-4 opacity-80">
                    {type.description}
                  </p>
                  <ul className="space-y-2">
                    {type.examples.map((example, i) => (
                      <li key={i} className="text-xs flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-current" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Your Rights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl lg:text-5xl font-bold uppercase mb-4">
              Your Privacy Rights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You have full control over your personal data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {rights.map((right, index) => {
              const Icon = right.icon;
              return (
                <motion.div
                  key={right.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  className="border-2 border-black p-6 text-center hover:bg-black hover:text-white transition-all"
                >
                  <Icon size={32} className="mx-auto mb-3" strokeWidth={2} />
                  <h3 className="font-heading text-lg font-bold uppercase mb-2">
                    {right.title}
                  </h3>
                  <p className="text-sm opacity-80">{right.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16 bg-gray-50">
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
                    {section.subtitle && (
                      <h3 className="font-heading text-xl font-bold uppercase mb-4">
                        {section.subtitle}
                      </h3>
                    )}
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

                    {/* Additional Content */}
                    {section.additionalContent && (
                      <div className="mt-6 pt-6 border-t-2 border-gray-200">
                        <h3 className="font-heading text-xl font-bold uppercase mb-4">
                          {section.additionalContent.subtitle}
                        </h3>
                        <ul className="space-y-4">
                          {section.additionalContent.items.map((item, i) => (
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
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Security Guarantee Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Shield size={64} className="mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase mb-4">
              Your Data is Protected
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              We employ industry-leading security measures including SSL encryption, 
              secure servers, and regular security audits to keep your information safe.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-white/20 bg-white/10">
                <Lock size={32} className="mx-auto mb-3" />
                <h3 className="font-heading font-bold uppercase text-sm mb-2">
                  Encrypted Storage
                </h3>
                <p className="text-xs text-white/70">
                  All data encrypted at rest and in transit
                </p>
              </div>
              <div className="p-6 border-2 border-white/20 bg-white/10">
                <Server size={32} className="mx-auto mb-3" />
                <h3 className="font-heading font-bold uppercase text-sm mb-2">
                  Secure Servers
                </h3>
                <p className="text-xs text-white/70">
                  Protected infrastructure with 24/7 monitoring
                </p>
              </div>
              <div className="p-6 border-2 border-white/20 bg-white/10">
                <Shield size={32} className="mx-auto mb-3" />
                <h3 className="font-heading font-bold uppercase text-sm mb-2">
                  Regular Audits
                </h3>
                <p className="text-xs text-white/70">
                  Continuous security testing and improvements
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-4 border-black bg-gray-50 p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <Mail size={64} className="mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="font-heading text-3xl lg:text-4xl font-bold uppercase mb-4">
                Questions About Your Privacy?
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our privacy team is here to help. Contact us with any questions or concerns 
                about how we handle your data.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-black text-white font-heading font-bold uppercase tracking-wider hover:bg-gray-900 transition-all flex items-center gap-2"
                >
                  Contact Privacy Team
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link href="/terms">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-black text-black font-heading font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                >
                  Read Terms
                </motion.button>
              </Link>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border-2 border-blue-600">
              <p className="text-sm text-blue-900 text-center">
                <strong className="font-heading uppercase">Email us:</strong> privacy@ljsports.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}