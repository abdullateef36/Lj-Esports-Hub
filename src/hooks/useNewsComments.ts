import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NewsComment } from "@/lib/news";

export function useNewsComments(postId: string) {
  const [comments, setComments] = useState<NewsComment[]>([]);

  useEffect(() => {
    if (!postId) return;

    const q = query(
      collection(db, "news-comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<NewsComment, "id">),
      }));

      setComments(data);
    });

    return () => unsubscribe();
  }, [postId]);

  return comments;
}