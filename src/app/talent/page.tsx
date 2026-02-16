'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Users, 
  Trophy, 
  Gamepad2,
  MapPin,
  Award,
  Star,
  ChevronDown,
  ExternalLink
} from "lucide-react";
import { 
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaTwitch
} from "react-icons/fa6";

interface Talent {
  id: string;
  name: string;
  role: string;
  game: string;
  image: string;
  coverImage: string;
  nationality: string;
  bio: string;
  achievements: string[];
  socials: {
    twitter?: string;
    instagram?: string;
    twitch?: string;
    youtube?: string;
  };
  featured: boolean;
}

const TALENTS: Talent[] = [
  {
    id: "1",
    name: "Adebayo 'Phantom' Olatunji",
    role: "Pro Player",
    game: "Valorant",
    image: "/profile.jpeg",
    coverImage: "/profile.jpeg",
    nationality: "Nigeria",
    bio: "Elite Valorant player with exceptional aim and game sense. Known for clutch plays and leadership on the battlefield.",
    achievements: [
      "Valorant West Africa Champion 2024",
      "MVP - African Esports League Finals",
      "Top 10 Radiant EMEA Rankings",
      "3x Regional Tournament Winner"
    ],
    socials: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      twitch: "https://twitch.tv",
      youtube: "https://youtube.com"
    },
    featured: true
  },
  {
    id: "2",
    name: "Chiamaka 'Queen' Nwosu",
    role: "Content Creator",
    game: "League of Legends",
    image: "/profile_two.jpeg",
    coverImage: "/profile_two.jpeg",
    nationality: "Nigeria",
    bio: "Rising star in League of Legends content creation. Building Africa's largest LoL community through educational streams and entertaining gameplay.",
    achievements: [
      "100K+ Twitch Followers",
      "Diamond Rank - 3 Consecutive Seasons",
      "Content Creator of the Year 2023",
      "Official Riot Partner"
    ],
    socials: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      twitch: "https://twitch.tv",
      youtube: "https://youtube.com"
    },
    featured: true
  },
  {
    id: "3",
    name: "Kwame 'Shadow' Mensah",
    role: "Pro Player",
    game: "CS:GO",
    image: "/profile_three.jpeg",
    coverImage: "/profile_three.jpeg",
    nationality: "Ghana",
    bio: "Veteran CS:GO AWPer with surgical precision. Competing at the highest level and mentoring the next generation of African talent.",
    achievements: [
      "CS:GO African Major Finalist",
      "2x Ghana National Champion",
      "International LAN Experience",
      "4,000+ Avg DPR"
    ],
    socials: {
      twitter: "https://twitter.com",
      twitch: "https://twitch.tv",
      youtube: "https://youtube.com"
    },
    featured: true
  },
  {
    id: "4",
    name: "Zanele 'Fury' Khumalo",
    role: "Streamer",
    game: "Apex Legends",
    image: "/profile_four.jpeg",
    coverImage: "/profile_four.jpeg",
    nationality: "South Africa",
    bio: "High-energy Apex Legends streamer known for aggressive gameplay and community engagement. Breaking barriers in African gaming.",
    achievements: [
      "Predator Rank - Multiple Seasons",
      "200K+ Combined Social Following",
      "Partner with Major Gaming Brands",
      "Community Builder Award 2024"
    ],
    socials: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      twitch: "https://twitch.tv",
      youtube: "https://youtube.com"
    },
    featured: false
  },
  {
    id: "5",
    name: "Mohamed 'Ace' Hassan",
    role: "Pro Player",
    game: "FIFA",
    image: "/profile_five.jpeg",
    coverImage: "/profile_five.jpeg",
    nationality: "Egypt",
    bio: "FIFA esports champion dominating the competitive scene. Combining tactical brilliance with mechanical skill to achieve greatness.",
    achievements: [
      "FIFA African Championship Winner",
      "EA Sports FIFA Global Series Competitor",
      "Top 100 Global Rankings",
      "5x National Champion"
    ],
    socials: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com"
    },
    featured: false
  },
  {
    id: "6",
    name: "Amara 'Storm' Okeke",
    role: "Content Creator",
    game: "Mobile Legends",
    image: "/profile_six.jpeg",
    coverImage: "/profile_six.jpeg",
    nationality: "Nigeria",
    bio: "Mobile esports pioneer creating content that inspires millions. Proving that mobile gaming is the future of competitive esports.",
    achievements: [
      "500K+ YouTube Subscribers",
      "Mythical Glory Player",
      "Mobile Gaming Advocate",
      "Brand Ambassador - Multiple Companies"
    ],
    socials: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com"
    },
    featured: false
  }
];

export default function TalentsPage() {
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [expandedTalent, setExpandedTalent] = useState<string | null>(null);

  const roles = ["All", "Pro Player", "Content Creator", "Streamer"];

  const filteredTalents = selectedRole === "All" 
    ? TALENTS 
    : TALENTS.filter(t => t.role === selectedRole);

  const featuredTalents = filteredTalents.filter(t => t.featured);
  const regularTalents = filteredTalents.filter(t => !t.featured);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">
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

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-white"
              style={{
                width: `${80 + i * 30}px`,
                height: `${80 + i * 30}px`,
                top: `${10 + i * 12}%`,
                left: `${5 + i * 12}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 90, 180],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <Users size={64} className="mx-auto mb-4" />
            </motion.div>

            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-heading font-bold uppercase mb-6">
              Our Talents
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto">
              Meet the exceptional individuals shaping the future of African esports
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-30 bg-white border-y-4 border-black py-6">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-6 py-3 border-2 border-black font-heading font-bold uppercase tracking-wider transition-all ${
                  selectedRole === role
                    ? "bg-black text-white scale-105"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Talents */}
      {featuredTalents.length > 0 && (
        <section className="py-16 lg:py-24 bg-black">
          <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <Star className="text-yellow-400" size={40} fill="currentColor" />
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white uppercase">
                Featured Talents
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTalents.map((talent, index) => (
                <motion.div
                  key={talent.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden border-4 border-white bg-white cursor-pointer"
                  onClick={() => setExpandedTalent(expandedTalent === talent.id ? null : talent.id)}
                >
                  {/* Cover Image */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={talent.coverImage}
                      alt={talent.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Game Badge */}
                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1.5 font-heading font-bold text-xs uppercase flex items-center gap-2">
                      <Gamepad2 size={14} />
                      {talent.game}
                    </div>

                    {/* Profile Image Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="relative w-24 h-24 border-4 border-white rounded-full overflow-hidden">
                        <Image
                          src={talent.image}
                          alt={talent.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-heading font-bold uppercase mb-1">
                          {talent.name}
                        </h3>
                        <p className="text-sm text-gray-600 uppercase tracking-wider font-heading font-bold">
                          {talent.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin size={14} />
                        {talent.nationality}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {talent.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-3 mb-4">
                      {talent.socials.twitter && (
                        <a
                          href={talent.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                          <FaXTwitter size={16} />
                        </a>
                      )}
                      {talent.socials.instagram && (
                        <a
                          href={talent.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                          <FaInstagram size={16} />
                        </a>
                      )}
                      {talent.socials.twitch && (
                        <a
                          href={talent.socials.twitch}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                          <FaTwitch size={16} />
                        </a>
                      )}
                      {talent.socials.youtube && (
                        <a
                          href={talent.socials.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                          <FaYoutube size={16} />
                        </a>
                      )}
                    </div>

                    {/* Expand Button */}
                    <button className="w-full flex items-center justify-center gap-2 text-sm font-heading font-bold uppercase py-2 border-t-2 border-black/10 hover:bg-black/5 transition-all">
                      {expandedTalent === talent.id ? "Show Less" : "View Achievements"}
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${expandedTalent === talent.id ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Expanded Content */}
                    {expandedTalent === talent.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t-2 border-black/10"
                      >
                        <h4 className="font-heading font-bold uppercase text-sm mb-3 flex items-center gap-2">
                          <Trophy size={16} />
                          Achievements
                        </h4>
                        <ul className="space-y-2">
                          {talent.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Award size={14} className="shrink-0 mt-0.5" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Talents */}
      {regularTalents.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-heading font-bold mb-12 uppercase"
            >
              All Talents
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularTalents.map((talent, index) => (
                <motion.div
                  key={talent.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden border-4 border-black bg-white cursor-pointer"
                  onClick={() => setExpandedTalent(expandedTalent === talent.id ? null : talent.id)}
                >
                  {/* Cover Image */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={talent.coverImage}
                      alt={talent.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Game Badge */}
                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1.5 font-heading font-bold text-xs uppercase flex items-center gap-2">
                      <Gamepad2 size={14} />
                      {talent.game}
                    </div>

                    {/* Profile Image Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="relative w-24 h-24 border-4 border-white rounded-full overflow-hidden">
                        <Image
                          src={talent.image}
                          alt={talent.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-heading font-bold uppercase mb-1">
                          {talent.name}
                        </h3>
                        <p className="text-sm text-gray-600 uppercase tracking-wider font-heading font-bold">
                          {talent.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin size={14} />
                        {talent.nationality}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {talent.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-3 mb-4">
                      {talent.socials.twitter && (
                        <a
                          href={talent.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                          <FaXTwitter size={16} />
                        </a>
                      )}
                      {talent.socials.instagram && (
                        <a
                          href={talent.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                          <FaInstagram size={16} />
                        </a>
                      )}
                      {talent.socials.twitch && (
                        <a
                          href={talent.socials.twitch}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                          <FaTwitch size={16} />
                        </a>
                      )}
                      {talent.socials.youtube && (
                        <a
                          href={talent.socials.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                          <FaYoutube size={16} />
                        </a>
                      )}
                    </div>

                    {/* Expand Button */}
                    <button className="w-full flex items-center justify-center gap-2 text-sm font-heading font-bold uppercase py-2 border-t-2 border-black/10 hover:bg-black/5 transition-all">
                      {expandedTalent === talent.id ? "Show Less" : "View Achievements"}
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${expandedTalent === talent.id ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Expanded Content */}
                    {expandedTalent === talent.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t-2 border-black/10"
                      >
                        <h4 className="font-heading font-bold uppercase text-sm mb-3 flex items-center gap-2">
                          <Trophy size={16} />
                          Achievements
                        </h4>
                        <ul className="space-y-2">
                          {talent.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Award size={14} className="shrink-0 mt-0.5" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 uppercase">
              Join Our Roster
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Are you ready to take your esports career to the next level?
            </p>
            <a href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-white text-black font-heading font-bold text-xl uppercase tracking-widest hover:bg-gray-200 transition-all inline-flex items-center gap-3"
              >
                Get In Touch
                <ExternalLink size={20} />
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}