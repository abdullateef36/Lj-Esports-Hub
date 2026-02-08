'use client';

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "@/lib/firebase";
import { Newspaper, X, Upload } from "lucide-react"; // Removed ImageIcon
import { NewsCategory } from "@/lib/news";
import { uploadImage } from "@/lib/cloudinary";
import RichTextEditor from "./RichTextEditor";
import Image from "next/image";

interface Props {
  user: User;
  onClose: () => void;
}

export default function CreateNewsPost({ user, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState<NewsCategory>("Breaking News");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const categories: NewsCategory[] = [
    "Breaking News",
    "Tournaments",
    "Team Updates",
    "Community",
    "Industry News",
    "Player Spotlight",
    "Events",
  ];

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const url = await uploadImage(file);
      setCoverImage(url);
    } catch (error) {
      console.error("Error uploading cover image:", error);
      alert("Failed to upload cover image");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !excerpt || !coverImage) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      await addDoc(collection(db, "news-posts"), {
        title,
        content,
        excerpt,
        coverImage,
        category,
        tags: tagsArray,
        author: user.displayName || user.email || "Anonymous",
        authorId: user.uid,
        published,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("News post created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating news post:", error);
      alert("Failed to create news post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 overflow-y-auto py-8">
      <div
        className="bg-black border-2 border-white/20 max-w-5xl w-full max-h-screen overflow-y-auto rounded-lg p-6 sm:p-8 relative my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-all z-10"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Newspaper className="text-white" size={32} />
          <h2 className="text-3xl font-heading font-bold text-white uppercase">Create News Post</h2>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-white font-heading font-bold uppercase tracking-wider mb-2 text-sm">
              Title *
            </label>
            <input
              type="text"
              placeholder="Enter news title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-lg bg-[#0d0d0d] border-2 border-white/20 focus:border-white focus:outline-none transition-all text-white placeholder-gray-500"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-white font-heading font-bold uppercase tracking-wider mb-2 text-sm">
              Excerpt *
            </label>
            <textarea
              placeholder="Short description for preview (2-3 sentences)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full p-4 rounded-lg bg-[#0d0d0d] border-2 border-white/20 focus:border-white focus:outline-none transition-all text-white placeholder-gray-500 resize-none"
            />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-white font-heading font-bold uppercase tracking-wider mb-2 text-sm">
              Cover Image *
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 hover:border-white/50 transition-all text-center">
                  <Upload className="mx-auto mb-2 text-white" size={32} />
                  <p className="text-white font-semibold mb-1">
                    {uploadingCover ? "Uploading..." : "Click to upload cover image"}
                  </p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  disabled={uploadingCover}
                  className="hidden"
                />
              </label>
              
              {coverImage && (
                <div className="flex-1 relative h-48 sm:h-full min-h-50">
                  <Image
                    src={coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover rounded-lg border-2 border-white/20"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Rich Text Content */}
          <div>
            <label className="block text-white font-heading font-bold uppercase tracking-wider mb-2 text-sm">
              Content * 
              <span className="text-xs text-gray-400 normal-case ml-2">(Click image icon to insert images)</span>
            </label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          {/* Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-heading font-bold uppercase tracking-wider mb-2 text-sm">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NewsCategory)}
                className="w-full p-4 rounded-lg bg-[#0d0d0d] border-2 border-white/20 focus:border-white focus:outline-none transition-all text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-black">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-heading font-bold uppercase tracking-wider mb-2 text-sm">
                Tags
              </label>
              <input
                type="text"
                placeholder="esports, gaming, tournament (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-4 rounded-lg bg-[#0d0d0d] border-2 border-white/20 focus:border-white focus:outline-none transition-all text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Publish Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-white/20 bg-[#0d0d0d] text-white focus:ring-white focus:ring-offset-0"
            />
            <span className="text-white font-semibold">Publish immediately</span>
          </label>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || uploadingCover}
            className="w-full bg-white text-black py-4 font-heading font-bold text-lg uppercase tracking-widest hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create News Post"}
          </button>
        </div>
      </div>
    </div>
  );
}