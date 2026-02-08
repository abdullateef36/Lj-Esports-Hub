"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useNewsComments } from "@/hooks/useNewsComments";
import { useUser } from "@/context/UserContext";
import { MessageSquare, Trash2, Edit2, X, Check } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  postId: string;
}

export default function CommentSection({ postId }: Props) {
  const { user, isAdmin } = useUser();
  const comments = useNewsComments(postId);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleSubmit = async () => {
    if (!user) {
      alert("Please login to comment");
      return;
    }

    if (!comment.trim()) {
      alert("Please enter a comment");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "news-comments"), {
        postId,
        userId: user.uid,
        userName: user.displayName || user.email || "Anonymous",
        userEmail: user.email || "",
        comment: comment.trim(),
        createdAt: serverTimestamp(),
      });

      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      await deleteDoc(doc(db, "news-comments", commentId));
    }
  };

  const startEdit = (commentId: string, currentText: string) => {
    setEditingId(commentId);
    setEditText(currentText);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async (commentId: string) => {
    if (!editText.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      await updateDoc(doc(db, "news-comments", commentId), {
        comment: editText.trim(),
        updatedAt: serverTimestamp(),
      });
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Failed to update comment");
    }
  };

  return (
    <div className="mt-16 pt-8 border-t-2 border-black/10">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="text-black" size={32} />
        <h3 className="text-3xl font-heading font-bold text-black uppercase">
          Comments ({comments.length})
        </h3>
      </div>

      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <textarea
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-lg bg-white border-2 border-black/20 focus:border-black focus:outline-none transition-all text-black placeholder-gray-500 resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-3 bg-black text-white px-8 py-3 rounded-lg font-heading font-bold uppercase tracking-wider hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </motion.div>
      )}

      {!user && (
        <div className="mb-8 p-6 bg-black/5 border-2 border-black/10 rounded-lg text-center">
          <p className="text-gray-600 font-semibold">Please login to leave a comment</p>
        </div>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="mx-auto mb-4 opacity-20" size={48} />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white border-2 border-black/10 rounded-lg hover:border-black/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-heading font-bold text-black uppercase">{comment.userName}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {comment.createdAt?.toDate?.()?.toLocaleString() || "Just now"}
                    {comment.updatedAt && " (edited)"}
                  </p>
                </div>
                {(isAdmin || user?.uid === comment.userId) && (
                  <div className="flex gap-2">
                    {user?.uid === comment.userId && editingId !== comment.id && (
                      <button
                        onClick={() => startEdit(comment.id, comment.comment)}
                        className="p-2 text-black hover:bg-black/10 rounded transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="p-2 text-black hover:bg-black/10 rounded transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>

              {editingId === comment.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-lg bg-white border-2 border-black/20 focus:border-black focus:outline-none transition-all text-black resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(comment.id)}
                      className="flex items-center gap-1 px-4 py-2 bg-black text-white rounded font-heading font-bold text-sm uppercase hover:bg-gray-800 transition-all"
                    >
                      <Check size={14} />
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-1 px-4 py-2 bg-gray-300 text-black rounded font-heading font-bold text-sm uppercase hover:bg-gray-400 transition-all"
                    >
                      <X size={14} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{comment.comment}</p>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}