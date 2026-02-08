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
      <div className="relative w-full h-[60vh] bg-black">
        <Image
          src={post.coverImage}
          alt={post.title}
          className="object-cover opacity-80"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 max-w-350 mx-auto px-4 sm:px-6 lg:px-12 pb-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors mb-6 font-heading font-bold uppercase"
          >
            <ArrowLeft size={20} />
            Back to News
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-white text-black px-4 py-2 font-heading font-bold text-sm uppercase tracking-wider mb-4">
              {post.category}
            </div>
            
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="font-semibold">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{post.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-250 mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Excerpt */}
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed font-medium border-l-4 border-black pl-6">
            {post.excerpt}
          </p>
          
          {/* Rich Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-black prose-a:font-bold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-black
              prose-img:rounded-lg prose-img:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-6 prose-blockquote:italic
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
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
            <Tag size={20} className="text-gray-500" />
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black text-white px-4 py-2 font-heading font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                {tag}
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