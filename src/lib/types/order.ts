import { Timestamp } from "firebase/firestore";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface DeliveryInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  lga: string;
  state: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  deliveryInfo: DeliveryInfo;
  subtotal: number;
  tax: number;
  total: number;
  status: "pending" | "in-delivery" | "delivered";
  reference: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OrderFormData {
  userId: string;
  items: OrderItem[];
  deliveryInfo: DeliveryInfo;
  subtotal: number;
  tax: number;
  total: number;
  status: "pending" | "in-delivery" | "delivered";
  reference: string;
}
