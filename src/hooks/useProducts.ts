"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ShopProduct } from "@/lib/shop";

export function useProducts() {
  const [products, setProducts] = useState<ShopProduct[]>([]);

  useEffect(() => {
    if (!db) return;

    const q = query(
      collection(db, "shop-products"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ShopProduct, "id">),
      }));
      setProducts(data);
    });

    return () => unsubscribe();
  }, []);

  return products;
}
