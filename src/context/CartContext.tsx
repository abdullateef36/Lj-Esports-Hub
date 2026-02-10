"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUser } from "@/context/UserContext";
import { CartItem, ShopProduct } from "@/lib/shop";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: ShopProduct) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) {
      setCart([]);
      setLoading(false);
      return;
    }

    const loadCart = async () => {
      try {
        setLoading(true);
        const cartCol = collection(db, "users", user.uid, "cart");
        const snapshot = await getDocs(cartCol);
        const items: CartItem[] = snapshot.docs.map(
          (docSnap) => docSnap.data() as CartItem
        );
        setCart(items);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  const syncCartToFirestore = async (newCart: CartItem[]) => {
    if (!user || !db) return;

    try {
      const cartCol = collection(db, "users", user.uid, "cart");
      const snapshot = await getDocs(cartCol);
      const batch = writeBatch(db);

      snapshot.docs.forEach((d) => batch.delete(d.ref));

      newCart.forEach((item) => {
        const itemRef = doc(cartCol);
        batch.set(itemRef, item);
      });

      await batch.commit();
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const addToCart = async (item: ShopProduct) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const existing = cart.find((c) => c.id === item.id);
    let newCart: CartItem[];

    if (existing) {
      newCart = cart.map((c) =>
        c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(newCart);
    await syncCartToFirestore(newCart);
  };

  const updateQuantity = async (id: string, delta: number) => {
    const newCart = cart
      .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
      .filter((c) => c.quantity > 0);

    setCart(newCart);
    await syncCartToFirestore(newCart);
  };

  const removeFromCart = async (id: string) => {
    const newCart = cart.filter((c) => c.id !== id);
    setCart(newCart);
    await syncCartToFirestore(newCart);
  };

  const clearCart = async () => {
    setCart([]);
    await syncCartToFirestore([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
