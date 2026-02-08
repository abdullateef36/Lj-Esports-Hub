'use client';

import { useState } from "react";
import { useNewsPosts } from "@/hooks/useNewsPosts";
import NewsCard from "@/components/news/NewsCard";
import CreateNewsPost from "@/components/news/CreateNewsPost";
import { useUser } from "@/context/UserContext";
import { Newspaper, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function NewsPage() {
  const { user, isAdmin } = useUser();
  const { posts, loading } = useNewsPosts(!isAdmin);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Newspaper className="text-black" size={40} />
              <h1 className="text-5xl lg:text-6xl font-heading font-bold text-black uppercase">News</h1>
            </div>
            <p className="text-xl text-gray-600">
              Latest updates from the esports world
            </p>
          </div>

          {isAdmin && user && (
            <motion.button
              onClick={() => setShowCreateModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-black text-white px-8 py-4 font-heading font-bold uppercase tracking-wider hover:bg-gray-800 transition-all"
            >
              <Plus size={20} />
              New Post
            </motion.button>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-black border-2 border-white/20 rounded-lg">
            <Newspaper className="mx-auto text-white/20 mb-4" size={64} />
            <p className="text-xl text-white">No news posts yet.</p>
            {isAdmin && (
              <p className="mt-2 text-gray-400">Create your first post to get started!</p>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NewsCard post={post} isAdmin={isAdmin} />
              </motion.div>
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