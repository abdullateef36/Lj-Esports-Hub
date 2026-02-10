import { Timestamp } from "firebase/firestore";

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  createdBy: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CartItem extends ShopProduct {
  quantity: number;
}

export interface WishlistItem extends ShopProduct {
  addedAt: number;
}
