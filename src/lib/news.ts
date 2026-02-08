import { Timestamp } from "firebase/firestore";

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: NewsCategory;
  tags: string[];
  author: string;
  authorId: string;
  published: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface NewsComment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userEmail: string;
  comment: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export type NewsCategory = 
  | "Breaking News" 
  | "Tournaments" 
  | "Team Updates" 
  | "Community" 
  | "Industry News" 
  | "Player Spotlight"
  | "Events";