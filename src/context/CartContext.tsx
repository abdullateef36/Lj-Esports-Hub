"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@/context/UserContext";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { gadgetService } from "@/lib/services/gadgetService";
import { laptopService } from "@/lib/services/laptopService";
import { phoneService } from "@/lib/services/phoneService";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: "laptop" | "phone" | "gadget";
  available: boolean;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  availableCartCount: number;
  availableCartTotal: number;
  addToCart: (item: Omit<CartItem, "quantity" | "available">) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from Firebase when user logs in
  useEffect(() => {
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }

    const loadCart = async () => {
      try {
        setLoading(true);
        const cartCol = collection(db, "users", user.uid, "cart");
        const snapshot = await getDocs(cartCol);
        const items: CartItem[] = [];

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
              // Update with fresh data
              items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || data.image,
                quantity: data.quantity,
                type: data.type,
                available: true,
              });
            } else {
              // Product deleted, mark as unavailable
              items.push({
                id: data.id,
                name: data.name,
                price: data.price,
                image: data.image,
                quantity: data.quantity,
                type: data.type,
                available: false,
              });
            }
          } catch (error) {
            console.error("Error fetching product:", error);
            // If fetch fails, keep old data but mark as unavailable
            items.push({
              id: data.id,
              name: data.name,
              price: data.price,
              image: data.image,
              quantity: data.quantity,
              type: data.type,
              available: false,
            });
          }
        }

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

  // Sync cart to Firebase
  const syncCartToFirestore = async (newCart: CartItem[]) => {
    if (!user) return;

    try {
      const cartCol = collection(db, "users", user.uid, "cart");
      const snapshot = await getDocs(cartCol);
      const batch = writeBatch(db);

      // Delete all existing items
      snapshot.docs.forEach((d) => {
        batch.delete(d.ref);
      });

      // Add all current items
      newCart.forEach((item) => {
        const itemRef = doc(cartCol);
        batch.set(itemRef, item);
      });

      await batch.commit();
    } catch (error) {
      console.error("Error syncing cart to Firebase:", error);
    }
  };

  const addToCart = async (item: Omit<CartItem, "quantity" | "available">) => {
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
      newCart = [...cart, { ...item, quantity: 1, available: true }];
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
  const availableCartCount = cart.filter(item => item.available).reduce((sum, item) => sum + item.quantity, 0);
  const availableCartTotal = cart.filter(item => item.available).reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        availableCartCount,
        availableCartTotal,
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
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}