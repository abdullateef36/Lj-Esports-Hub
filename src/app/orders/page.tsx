"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Shield,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { orderService } from "@/lib/services/orderService";
import { Order } from "@/lib/types/order";

export default function OrdersPage() {
  const { user, isAdmin } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

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
    if (!user) {
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = isAdmin
          ? await orderService.getAllOrders()
          : await orderService.getUserOrders(user.uid);
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user, isAdmin]);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in-delivery":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
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

  const handleStatusChange = async (
    orderId: string,
    status: Order["status"]
  ) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update order status.");
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

  return (
    <div className="min-h-screen bg-white text-black">
      <section className="bg-black text-white">
        <div className="max-w-350 mx-auto px-6 lg:px-12 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <Shield className="w-9 h-9" />
              ) : (
                <Package className="w-9 h-9" />
              )}
              <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase">
                {isAdmin ? "Manage Orders" : "My Orders"}
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl">
              {isAdmin
                ? "Review and update order statuses across the store."
                : "Track your order status and view purchase details."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-350 mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="border-4 border-black p-10 text-center">
              <Package className="w-14 h-14 mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-bold uppercase mb-2">
                No Orders Yet
              </h2>
              <p className="text-gray-600 mb-6">
                {isAdmin
                  ? "There are no orders to manage yet."
                  : "You haven't placed any orders yet."}
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-heading font-bold uppercase tracking-wider"
              >
                Back to Shop
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-4 border-black"
                >
                  <button
                    onClick={() =>
                      setExpandedOrderId(
                        expandedOrderId === order.id ? null : order.id
                      )
                    }
                    className="w-full p-6 text-left"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-600">
                          Order
                        </p>
                        <h3 className="font-heading text-2xl font-bold uppercase">
                          {order.id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(order.createdAt.toDate()).toLocaleDateString(
                            "en-NG",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 border text-xs font-semibold uppercase ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status === "in-delivery"
                            ? "In Delivery"
                            : order.status}
                        </div>
                        <div className="text-lg font-bold">
                          {formatCurrency.format(order.total)}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-gray-600">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </button>

                  {expandedOrderId === order.id && (
                    <div className="border-t-4 border-black p-6 space-y-6">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-600">
                            Delivery
                          </p>
                          <p className="font-semibold">{order.deliveryInfo.fullName}</p>
                          <p>{order.deliveryInfo.email}</p>
                          <p>{order.deliveryInfo.phone}</p>
                          <p>
                            {order.deliveryInfo.address},{" "}
                            {order.deliveryInfo.lga}, {order.deliveryInfo.state}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-600">
                            Reference
                          </p>
                          <p className="font-mono text-sm">{order.reference}</p>
                        </div>
                      </div>

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

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="text-lg font-bold">
                          Total: {formatCurrency.format(order.total)}
                        </div>
                        {isAdmin ? (
                          <div className="flex items-center gap-3">
                            <label className="text-xs uppercase tracking-wider text-gray-600">
                              Update Status
                            </label>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.id,
                                  e.target.value as Order["status"]
                                )
                              }
                              className="border-2 border-black px-3 py-2 text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="in-delivery">In Delivery</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </div>
                        ) : (
                          <Link
                            href={`/orders/${order.id}`}
                            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-heading font-bold uppercase tracking-wider"
                          >
                            View Details
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
