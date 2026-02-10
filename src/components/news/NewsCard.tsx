"use client";

import Image from "next/image";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NewsPost } from "@/lib/news";
import { Trash2, Edit2, Calendar, User, ArrowRight, Clock } from "lucide-react";
import { useState } from "react";
import EditNewsPost from "./EditNewsPost";
import { motion } from "framer-motion";

interface Props {
  post: NewsPost;
  isAdmin: boolean;
  index: number;
}

export default function NewsCard({ post, isAdmin, index }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);

  const remove = async () => {
    if (confirm("Are you sure you want to delete this news post?")) {
      await deleteDoc(doc(db, "news-posts", post.id));
    }
  };

  // Featured style for first post (full width, large image)
  if (index === 0) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="col-span-full mb-8 lg:mb-12"
        >
          <Link href={`/news/${post.id}`} className="group">
            <div className="relative h-100 sm:hsm:h-125h-[600px] overflow-hidden rounded-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-12">
                <div className="max-w-4xl">
                  {/* Category badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap items-center gap-2 mb-3 lg:mb-4"
                  >
                    <span className="bg-white text-black px-3 lg:px-4 py-1 lg:py-1.5 text-xs font-heading font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                    {!post.published && (
                      <span className="bg-yellow-500 text-black px-3 lg:px-4 py-1 lg:py-1.5 text-xs font-heading font-bold uppercase">
                        DRAFT
                      </span>
                    )}
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="font-heading text-2xl sm:text-3xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 uppercase leading-tight group-hover:text-gray-200 transition-colors"
                  >
                    {post.title}
                  </motion.h2>

                  {/* Excerpt */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-sm sm:text-base lg:text-xl text-gray-200 mb-3 sm:mb-4 lg:mb-6 line-clamp-2 max-w-3xl"
                  >
                    {post.excerpt}
                  </motion.p>

                  {/* Meta info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-gray-300"
                  >
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <User size={14} className="lg:w-4 lg:h-4" />
                      <span className="font-semibold">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <Clock size={14} className="lg:w-4 lg:h-4" />
                      <span>{post.createdAt?.toDate?.()?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-heading font-bold text-[10px] sm:text-xs lg:text-sm group-hover:gap-4 transition-all">
                      READ ARTICLE
                      <ArrowRight size={16} className="sm:w-4.5 sm:h-4.5" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Link>

          {/* Admin controls */}
          {isAdmin && (
            <div className="flex flex-wrap gap-2 lg:gap-3 mt-3 lg:mt-4">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-3 lg:px-4 py-2 bg-white text-black font-heading font-bold text-xs lg:text-sm uppercase hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <Edit2 size={14} className="lg:w-4 lg:h-4" />
                Edit
              </button>
              <button
                onClick={remove}
                className="px-3 lg:px-4 py-2 bg-black border-2 border-white text-white font-heading font-bold text-xs lg:text-sm uppercase hover:bg-white hover:text-black transition-all flex items-center gap-2"
              >
                <Trash2 size={14} className="lg:w-4 lg:h-4" />
                Delete
              </button>
            </div>
          )}
        </motion.div>

        {showEditModal && (
          <EditNewsPost post={post} onClose={() => setShowEditModal(false)} />
        )}
      </>
    );
  }

  // Magazine-style layout for other posts
  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group"
      >
        <Link href={`/news/${post.id}`}>
          {/* Image */}
          <div className="relative h-48 sm:h-56 lg:h-80 overflow-hidden mb-4 lg:mb-5 rounded-lg lg:rounded-none">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Category overlay */}
            <div className="absolute top-3 lg:top-4 left-3 lg:left-4">
              <span className="bg-black text-white px-2 lg:px-3 py-1 lg:py-1.5 text-xs font-heading font-bold uppercase tracking-wider border-2 border-white">
                {post.category}
              </span>
            </div>

            {!post.published && (
              <div className="absolute top-3 lg:top-4 right-3 lg:right-4">
                <span className="bg-yellow-500 text-black px-2 lg:px-3 py-1 lg:py-1.5 text-xs font-heading font-bold uppercase">
                  DRAFT
                </span>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="space-y-2 lg:space-y-3">
            {/* Meta info */}
            <div className="flex items-center gap-3 lg:gap-4 text-xs text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-1 lg:gap-1.5">
                <User size={12} />
                <span className="truncate">{post.author}</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <div className="flex items-center gap-1 lg:gap-1.5">
                <Calendar size={12} />
                <span>{post.createdAt?.toDate?.()?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) || "N/A"}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-black uppercase leading-tight group-hover:text-gray-600 transition-colors line-clamp-2 lg:line-clamp-3">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2 lg:line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-1.5 lg:gap-2 flex-wrap pt-1 lg:pt-2">
                {post.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs bg-black text-white px-2 py-0.5 lg:py-1 uppercase tracking-wider font-heading font-bold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Read more */}
            <div className="flex items-center gap-2 text-black font-heading font-bold text-xs sm:text-sm uppercase pt-1 lg:pt-2 group-hover:gap-4 transition-all">
              Continue Reading
              <ArrowRight size={14} className="lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Admin controls */}
        {isAdmin && (
          <div className="flex gap-2 mt-3 lg:mt-4 pt-3 lg:pt-4 border-t-2 border-black/10">
            <button
              onClick={() => setShowEditModal(true)}
              className="px-2 lg:px-3 py-1.5 lg:py-2 bg-white border-2 border-black text-black font-heading font-bold text-xs uppercase hover:bg-black hover:text-white transition-all flex items-center gap-1.5 lg:gap-2"
            >
              <Edit2 size={12} className="lg:w-3.5 lg:h-3.5" />
              Edit
            </button>
            <button
              onClick={remove}
              className="px-2 lg:px-3 py-1.5 lg:py-2 bg-white border-2 border-black text-black font-heading font-bold text-xs uppercase hover:bg-black hover:text-white transition-all flex items-center gap-1.5 lg:gap-2"
            >
              <Trash2 size={12} className="lg:w-3.5 lg:h-3.5" />
              Delete
            </button>
          </div>
        )}
      </motion.article>

      {showEditModal && (
        <EditNewsPost post={post} onClose={() => setShowEditModal(false)} />
      )}
    </>
  );
}
