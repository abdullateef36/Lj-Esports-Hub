"use client";

import Image from "next/image";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NewsPost } from "@/lib/news";
import { Trash2, Edit2, Calendar, User, Tag } from "lucide-react";
import { useState } from "react";
import EditNewsPost from "./EditNewsPost";
import { motion } from "framer-motion";

interface Props {
  post: NewsPost;
  isAdmin: boolean;
}

export default function NewsCard({ post, isAdmin }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);

  const remove = async () => {
    if (confirm("Are you sure you want to delete this news post?")) {
      await deleteDoc(doc(db, "news-posts", post.id));
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="bg-black border-2 border-white/20 rounded-lg overflow-hidden hover:border-white transition-all"
      >
        <Link href={`/news/${post.id}`}>
          <div className="relative w-full h-56">
            <Image
              src={post.coverImage}
              alt={post.title}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3 bg-white text-black px-3 py-1 font-heading font-bold text-xs uppercase tracking-wider">
              {post.category}
            </div>
            {!post.published && (
              <div className="absolute top-3 right-3 bg-yellow-500 px-3 py-1 font-heading font-bold text-xs uppercase text-black">
                DRAFT
              </div>
            )}
          </div>
        </Link>

        <div className="p-6">
          <Link href={`/news/${post.id}`}>
            <h3 className="font-heading font-bold text-2xl text-white mb-3 hover:text-gray-300 transition-colors uppercase">
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{post.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <Tag size={14} className="text-gray-500" />
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-white/10 border border-white/20 px-2 py-1 text-gray-400 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <Link
              href={`/news/${post.id}`}
              className="text-white font-heading font-bold hover:underline uppercase text-sm"
            >
              Read More →
            </Link>

            {isAdmin && (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="p-2 rounded border-2 border-white/20 text-white hover:bg-white hover:text-black transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={remove}
                  className="p-2 rounded border-2 border-white/20 text-white hover:bg-white hover:text-black transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {showEditModal && (
        <EditNewsPost post={post} onClose={() => setShowEditModal(false)} />
      )}
    </>
  );
}