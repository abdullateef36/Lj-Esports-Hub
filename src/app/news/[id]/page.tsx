"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NewsPost } from "@/lib/news";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import CommentSection from "@/components/news/CommentSection";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function NewsPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "news-posts", postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as NewsPost);
        }
      } catch (error) {
        console.error("Error fetching news post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-black font-heading font-bold mb-4">News post not found</p>
          <Link
            href="/news"
            className="text-black hover:underline font-semibold"
          >
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] bg-black overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          className="object-cover"
          fill
          sizes="100vw"
          priority
        />
        
        {/* Multiple gradient overlays for better text visibility */}
        <div className="absolute inset-0 from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {/* Back Button at Top */}
          <div className="max-w-350 mx-auto w-full px-4 sm:px-6 lg:px-12 pt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors font-heading font-bold uppercase bg-black/50 backdrop-blur-sm px-4 py-2 border-2 border-white/30 hover:border-white/60"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back to News</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>

          {/* Title Content at Bottom */}
          <div className="max-w-350uto w-full px-4 sm:px-6 lg:px-12 pb-8 sm:pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              {/* Category Badge with backdrop */}
              <div className="inline-block bg-white text-black px-4 py-2 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider mb-4 shadow-2xl">
                {post.category}
              </div>
              
              {/* Title with multiple text shadows and backdrop */}
              <div className="bg-black/40 backdrop-blur-md border-l-4 border-white pl-6 pr-6 py-6 mb-4">
                <h1 
                  className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase leading-tight"
                  style={{
                    textShadow: `
                      0 2px 10px rgba(0, 0, 0, 0.8),
                      0 4px 20px rgba(0, 0, 0, 0.6),
                      0 0 40px rgba(0, 0, 0, 0.4),
                      2px 2px 4px rgba(0, 0, 0, 0.9)
                    `,
                    color: 'white'
                  }}
                >
                  {post.title}
                </h1>
              </div>
              
              {/* Meta Info with backdrop */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base bg-black/40 backdrop-blur-md px-6 py-4 border-2 border-white/20">
                <div className="flex items-center gap-2 text-white">
                  <User size={18} className="shrink-0" />
                  <span className="font-semibold drop-shadow-lg">{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Calendar size={18} className="shrink-0" />
                  <span className="drop-shadow-lg">{post.createdAt?.toDate?.()?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) || "N/A"}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-250 mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Excerpt */}
          <div className="bg-gray-50 border-l-4 border-black p-6 lg:p-8 mb-12">
            <p className="text-xl lg:text-2xl text-gray-800 leading-relaxed font-medium italic">
              {post.excerpt}
            </p>
          </div>
          
          {/* Rich Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:text-black
              prose-h1:text-3xl sm:prose-h1:text-4xl prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:text-xl sm:prose-h3:text-2xl
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg
              prose-a:text-blue-600 prose-a:font-semibold prose-a:underline hover:prose-a:text-blue-800 prose-a:break-words
              prose-strong:text-black prose-strong:font-bold
              prose-em:text-gray-800 prose-em:italic
              prose-img:rounded-lg prose-img:my-8 prose-img:shadow-lg prose-img:w-full
              prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-gray-50 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-4 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:my-8
              prose-code:bg-gray-100 prose-code:text-gray-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:break-words
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
              prose-li:text-gray-700 prose-li:my-2
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 flex-wrap mt-16 pt-8 border-t-2 border-black/10"
          >
            <Tag size={20} className="text-gray-500 shrink-0" />
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black text-white px-4 py-2 font-heading font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Comments */}
        <div className="mt-16">
          <CommentSection postId={postId} />
        </div>
      </div>
    </div>
  );
}