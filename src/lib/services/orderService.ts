import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order, OrderFormData } from "@/lib/types/order";

const ORDERS_COLLECTION = "orders";

export const orderService = {
  async createOrder(data: OrderFormData): Promise<string> {
    if (!db) throw new Error("Database not initialized");

    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  },

  async getOrder(id: string): Promise<Order | null> {
    if (!db) throw new Error("Database not initialized");

    const orderRef = doc(db, ORDERS_COLLECTION, id);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) return null;

    return {
      id: orderSnap.id,
      ...orderSnap.data(),
    } as Order;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    if (!db) throw new Error("Database not initialized");

    const q = query(
      collection(db, ORDERS_COLLECTION),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as Order[];
  },

  async getAllOrders(): Promise<Order[]> {
    if (!db) throw new Error("Database not initialized");

    const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as Order[];
  },

  async updateOrderStatus(
    id: string,
    status: "pending" | "in-delivery" | "delivered"
  ): Promise<void> {
    if (!db) throw new Error("Database not initialized");

    const orderRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  },
};
