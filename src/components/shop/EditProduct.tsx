"use client";

import { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadImage } from "@/lib/cloudinary";
import { Package, X, Upload, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ShopProduct } from "@/lib/shop";

interface Props {
  product: ShopProduct;
  onClose: () => void;
}

const categories = [
  "Apparel",
  "Accessories",
  "Gaming Gear",
  "Collectibles",
  "Lifestyle",
];

export default function EditProduct({ product, onClose }: Props) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState(product.image);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [inStock, setInStock] = useState(product.inStock);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (file?: File | null) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setImage(url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name || !price || !image || !description) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!db) throw new Error("Firestore not initialized");

      await updateDoc(doc(db, "shop-products", product.id), {
        name,
        price: parseFloat(price),
        image,
        description,
        category,
        inStock,
        updatedAt: serverTimestamp(),
      });

      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="bg-white text-black max-w-2xl w-full rounded-2xl border-4 border-black p-6 lg:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-black hover:bg-black hover:text-white transition-all"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Package size={24} />
          <h2 className="text-2xl font-heading font-bold uppercase">
            Edit Product
          </h2>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="number"
            placeholder="Price (USD) *"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
          />

          <div className="border-2 border-dashed border-black p-4">
            <label className="flex items-center gap-3 cursor-pointer font-heading font-bold uppercase text-sm">
              <Upload size={18} />
              {isUploading ? "Uploading..." : "Replace Product Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
                disabled={isUploading}
              />
            </label>
            {image ? (
              <div className="mt-3 flex items-center gap-3">
                <ImageIcon size={16} />
                <span className="text-sm break-all">{image}</span>
              </div>
            ) : (
              <p className="text-xs text-gray-600 mt-2">
                Upload a new image via Cloudinary.
              </p>
            )}
          </div>

          <textarea
            placeholder="Product Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-3 cursor-pointer font-semibold">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-5 h-5"
            />
            In Stock
          </label>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isUploading}
            className="w-full bg-black text-white px-6 py-3 font-heading font-bold uppercase tracking-wider hover:bg-gray-900 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update Product"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
