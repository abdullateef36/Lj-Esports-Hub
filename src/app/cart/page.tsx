"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";

interface PaystackResponse {
  reference: string;
  status: string;
  message: string;
  trxref: string;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: Record<string, unknown>;
        onClose: () => void;
        callback: (response: PaystackResponse) => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

export default function CartPage() {
  const { user } = useUser();
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const formatCurrency = useMemo(
    () =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }),
    []
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleCheckout = () => {
    if (!user) {
      alert("Please log in to continue.");
      return;
    }
    if (!window.PaystackPop) {
      alert("Payment system is loading. Please try again.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!fullName || !email || !phone || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    const reference = `lj_order_${Date.now()}`;
    const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!key) {
      alert("Missing Paystack public key.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key,
      email,
      amount: Math.round(cartTotal * 100),
      currency: "NGN",
      ref: reference,
      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: fullName },
          { display_name: "Phone", variable_name: "phone", value: phone },
          { display_name: "Address", variable_name: "address", value: address },
        ],
      },
      onClose: () => {
        alert("Payment window closed.");
      },
      callback: async () => {
        await clearCart();
        alert("Payment successful! Your order is confirmed.");
      },
    });

    handler.openIframe();
  };

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
            <ShoppingCart size={40} />
            <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase">
              Your Cart
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-350 mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.4fr_0.6fr] gap-10">
          <div>
            {cart.length === 0 ? (
              <div className="border-4 border-black p-8 text-center">
                <p className="text-lg">Your cart is empty.</p>
                <Link
                  href="/shop"
                  className="inline-block mt-4 px-6 py-3 bg-black text-white font-heading font-bold uppercase tracking-wider"
                >
                  Back to Shop
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border-4 border-black p-4 flex gap-4 items-center"
                  >
                    <div className="relative w-24 h-24 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold uppercase text-lg">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">
                        {formatCurrency.format(item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 border-2 border-black hover:bg-black hover:text-white transition-all"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto p-1 border-2 border-black hover:bg-black hover:text-white transition-all"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right font-bold">
                      {formatCurrency.format(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-4 border-black p-6 h-fit">
            <h2 className="font-heading text-2xl font-bold uppercase mb-4">
              Checkout
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border-2 border-black"
              />
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-black"
              />
              <input
                type="tel"
                placeholder="Phone *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border-2 border-black"
              />
              <input
                type="text"
                placeholder="Address *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border-2 border-black"
              />
            </div>

            <div className="flex items-center justify-between mt-6 mb-4">
              <span className="font-heading font-bold uppercase">Total</span>
              <span className="text-2xl font-bold">
                {formatCurrency.format(cartTotal)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white px-6 py-3 font-heading font-bold uppercase tracking-wider hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard size={18} />
              Pay with Paystack
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
