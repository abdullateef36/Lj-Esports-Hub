"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { orderService } from "@/lib/services/orderService";
import { Order } from "@/lib/types/order";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user, isAdmin } = useUser();
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    if (!user) return;

    const loadOrder = async () => {
      try {
        setLoading(true);
        const orderData = await orderService.getOrder(id);

        if (!orderData) {
          setError("Order not found");
          return;
        }

        if (!isAdmin && orderData.userId !== user.uid) {
          setError("You don't have access to this order");
          return;
        }

        setOrder(orderData);
      } catch (error) {
        console.error("Error loading order:", error);
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [user, isAdmin, id]);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-6 h-6" />;
      case "in-delivery":
        return <Truck className="w-6 h-6" />;
      case "delivered":
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  const getStatusStyle = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "in-delivery":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center border-4 border-black p-10">
          <Package className="w-14 h-14 mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold uppercase mb-2">
            Please Log In
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view orders.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-heading font-bold uppercase tracking-wider"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white text-black">
        <div className="border-b-4 border-black">
          <div className="max-w-350 mx-auto px-6 lg:px-12 py-6">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 text-black hover:text-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </Link>
          </div>
        </div>

        <div className="max-w-350 mx-auto px-6 lg:px-12 py-12">
          <div className="border-4 border-black p-10 text-center">
            <Package className="w-14 h-14 mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold uppercase mb-2">
              {error || "Order not found"}
            </h2>
            <Link
              href="/orders"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-heading font-bold uppercase tracking-wider mt-4"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <section className="bg-black text-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </Link>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase">
              Order {order.id.slice(-8).toUpperCase()}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-350 mx-auto px-6 lg:px-12 space-y-6">
          <div className={`border-4 p-6 ${getStatusStyle(order.status)}`}>
            <div className="flex items-center gap-3 mb-2">
              {getStatusIcon(order.status)}
              <h2 className="text-2xl font-bold uppercase">
                {order.status === "in-delivery" ? "In Delivery" : order.status}
              </h2>
            </div>
            <p className="text-sm">
              Order placed on{" "}
              {new Date(order.createdAt.toDate()).toLocaleDateString("en-NG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="border-4 border-black p-6">
            <h2 className="font-heading text-2xl font-bold uppercase mb-4">
              Delivery Info
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Name
                </p>
                <p className="font-semibold">{order.deliveryInfo.fullName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Phone
                </p>
                <p className="font-semibold">{order.deliveryInfo.phone}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Email
                </p>
                <p className="font-semibold">{order.deliveryInfo.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Location
                </p>
                <p className="font-semibold">
                  {order.deliveryInfo.lga}, {order.deliveryInfo.state}
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <p className="text-xs uppercase tracking-wider text-gray-600">
                Address
              </p>
              <p className="font-semibold">{order.deliveryInfo.address}</p>
            </div>
          </div>

          <div className="border-4 border-black p-6">
            <h2 className="font-heading text-2xl font-bold uppercase mb-4">
              Items ({order.items.length})
            </h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-2 border-black p-3"
                >
                  <div className="relative w-16 h-16 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-semibold">
                    {formatCurrency.format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black p-6">
            <h2 className="font-heading text-2xl font-bold uppercase mb-4">
              Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  {formatCurrency.format(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">
                  {formatCurrency.format(order.tax)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t-2 border-black pt-3">
                <span>Total</span>
                <span>{formatCurrency.format(order.total)}</span>
              </div>
            </div>
            {order.reference && (
              <div className="mt-4 text-xs text-gray-600">
                Payment Reference:{" "}
                <span className="font-mono text-black">{order.reference}</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
