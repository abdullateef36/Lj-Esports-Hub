"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@/context/UserContext";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { gadgetService } from "@/lib/services/gadgetService";
import { laptopService } from "@/lib/services/laptopService";
import { phoneService } from "@/lib/services/phoneService";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  type: "laptop" | "phone" | "gadget";
  available: boolean;
  addedAt: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (item: Omit<WishlistItem, "addedAt" | "available">) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from Firebase when user logs in
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    const loadWishlist = async () => {
      try {
        setLoading(true);
        const wishlistCol = collection(db, "users", user.uid, "wishlist");
        const snapshot = await getDocs(wishlistCol);
        const items: WishlistItem[] = [];

        for (const docSnap of snapshot.docs) {
          const data = docSnap.data();
          let product = null;

          // Fetch fresh product data
          try {
            if (data.type === "gadget") {
              product = await gadgetService.getGadget(data.id);
            } else if (data.type === "laptop") {
              product = await laptopService.getLaptop(data.id);
            } else if (data.type === "phone") {
              product = await phoneService.getPhone(data.id);
            }

            if (product) {
              items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || data.image,
                type: data.type,
                available: true,
                addedAt: data.addedAt || Date.now(),
              });
            } else {
              items.push({
                id: data.id,
                name: data.name,
                price: data.price,
                image: data.image,
                type: data.type,
                available: false,
                addedAt: data.addedAt || Date.now(),
              });
            }
          } catch (error) {
            console.error("Error fetching product:", error);
            items.push({
              id: data.id,
              name: data.name,
              price: data.price,
              image: data.image,
              type: data.type,
              available: false,
              addedAt: data.addedAt || Date.now(),
            });
          }
        }

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

  // Sync wishlist to Firebase
  const syncWishlistToFirestore = async (newWishlist: WishlistItem[]) => {
    if (!user) return;

    try {
      const wishlistCol = collection(db, "users", user.uid, "wishlist");
      const snapshot = await getDocs(wishlistCol);
      const batch = writeBatch(db);

      // Delete all existing items
      snapshot.docs.forEach((d) => {
        batch.delete(d.ref);
      });

      // Add all current items
      newWishlist.forEach((item) => {
        const itemRef = doc(wishlistCol);
        batch.set(itemRef, {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          type: item.type,
          addedAt: item.addedAt,
        });
      });

      await batch.commit();
    } catch (error) {
      console.error("Error syncing wishlist to Firebase:", error);
    }
  };

  const addToWishlist = async (item: Omit<WishlistItem, "addedAt" | "available">) => {
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    // Check if item already exists
    if (wishlist.some((w) => w.id === item.id)) {
      return;
    }

    const newItem: WishlistItem = {
      ...item,
      available: true,
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

  const isInWishlist = (id: string): boolean => {
    return wishlist.some((item) => item.id === id);
  };

  const clearWishlist = async () => {
    setWishlist([]);
    await syncWishlistToFirestore([]);
  };

  const contextValue: WishlistContextType = {
    wishlist,
    wishlistCount: wishlist.length,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    loading,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
