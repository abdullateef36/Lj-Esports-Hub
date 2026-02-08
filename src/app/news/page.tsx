'use client';

import { useState } from "react";
import { useNewsPosts } from "@/hooks/useNewsPosts";
import NewsCard from "@/components/news/NewsCard";
import CreateNewsPost from "@/components/news/CreateNewsPost";
import { useUser } from "@/context/UserContext";
import { Newspaper, Plus, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function NewsPage() {
  const { user, isAdmin } = useUser();
  const { posts, loading } = useNewsPosts(!isAdmin);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16 lg:py-24">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-4"
              >
                <TrendingUp className="text-white" size={48} />
                <h1 className="text-6xl lg:text-8xl font-heading font-bold uppercase">
                  News
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl lg:text-2xl text-gray-300 max-w-2xl"
              >
                Breaking stories, tournament coverage, and exclusive insights from the esports world
              </motion.p>
            </div>

            {isAdmin && user && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onClick={() => setShowCreateModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white text-black px-8 py-4 font-heading font-bold uppercase tracking-wider hover:bg-gray-200 transition-all whitespace-nowrap"
              >
                <Plus size={20} />
                New Article
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-heading uppercase tracking-wider">Loading latest news...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 border-4 border-black p-12">
            <Newspaper className="mx-auto text-black/20 mb-6" size={80} />
            <h2 className="text-3xl font-heading font-bold text-black mb-4 uppercase">No Articles Yet</h2>
            <p className="text-xl text-gray-600 mb-6">Be the first to break the news!</p>
            {isAdmin && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-black text-white px-8 py-4 font-heading font-bold uppercase tracking-wider hover:bg-gray-800 transition-all"
              >
                Create First Article
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {posts.map((post, index) => (
              <NewsCard key={post.id} post={post} isAdmin={isAdmin} index={index} />
            ))}
          </div>
        )}

        {showCreateModal && user && (
          <CreateNewsPost user={user} onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </div>
  );
}