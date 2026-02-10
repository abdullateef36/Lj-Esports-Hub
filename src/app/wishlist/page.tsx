"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatCurrency = useMemo(
    () =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }),
    []
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <section className="bg-black text-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <Heart size={40} />
            <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase">
              Wishlist
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          {wishlist.length === 0 ? (
            <div className="border-4 border-black p-8 text-center">
              <p className="text-lg">Your wishlist is empty.</p>
              <Link
                href="/shop"
                className="inline-block mt-4 px-6 py-3 bg-black text-white font-heading font-bold uppercase tracking-wider"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border-4 border-black"
                >
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl font-bold uppercase mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {formatCurrency.format(item.price)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(item)}
                        className="flex-1 bg-black text-white px-4 py-2 font-heading font-bold uppercase text-xs tracking-wider hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={14} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="flex-1 border-2 border-black px-4 py-2 font-heading font-bold uppercase text-xs tracking-wider hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
