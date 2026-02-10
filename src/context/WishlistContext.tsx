"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@/context/UserContext";
import { ShopProduct, WishlistItem } from "@/lib/shop";

interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (item: ShopProduct) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    const loadWishlist = async () => {
      try {
        setLoading(true);
        const wishlistCol = collection(db, "users", user.uid, "wishlist");
        const snapshot = await getDocs(wishlistCol);
        const items: WishlistItem[] = snapshot.docs.map(
          (docSnap) => docSnap.data() as WishlistItem
        );
        setWishlist(items);
      } catch (error) {
        console.error("Error loading wishlist:", error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [user]);

  const syncWishlistToFirestore = async (newWishlist: WishlistItem[]) => {
    if (!user || !db) return;

    try {
      const wishlistCol = collection(db, "users", user.uid, "wishlist");
      const snapshot = await getDocs(wishlistCol);
      const batch = writeBatch(db);

      snapshot.docs.forEach((d) => batch.delete(d.ref));

      newWishlist.forEach((item) => {
        const itemRef = doc(wishlistCol);
        batch.set(itemRef, {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          description: item.description,
          inStock: item.inStock,
          createdBy: item.createdBy,
          addedAt: item.addedAt,
        });
      });

      await batch.commit();
    } catch (error) {
      console.error("Error syncing wishlist:", error);
    }
  };

  const addToWishlist = async (item: ShopProduct) => {
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    if (wishlist.some((w) => w.id === item.id)) {
      return;
    }

    const newItem: WishlistItem = {
      ...item,
      addedAt: Date.now(),
    };

    const newWishlist = [...wishlist, newItem];
    setWishlist(newWishlist);
    await syncWishlistToFirestore(newWishlist);
  };

  const removeFromWishlist = async (id: string) => {
    const newWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(newWishlist);
    await syncWishlistToFirestore(newWishlist);
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  const clearWishlist = async () => {
    setWishlist([]);
    await syncWishlistToFirestore([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
