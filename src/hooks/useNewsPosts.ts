import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { NewsPost } from "@/lib/news";

export function useNewsPosts(publishedOnly = true) {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q;
    
    if (publishedOnly) {
      q = query(
        collection(db, "news-posts"),
        where("published", "==", true),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(
        collection(db, "news-posts"),
        orderBy("createdAt", "desc")
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<NewsPost, "id">),
      }));

      setPosts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [publishedOnly]);

  return { posts, loading };
}