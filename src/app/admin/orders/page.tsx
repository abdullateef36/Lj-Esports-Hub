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
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { orderService } from "@/lib/services/orderService";
import { Order } from "@/lib/types/order";

export default function AdminOrdersPage() {
  const { user, isAdmin } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [filter, setFilter] = useState<
    "all" | "pending" | "in-delivery" | "delivered"
  >("all");

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
    const loadOrders = async () => {
      try {
        setLoading(true);
        const allOrders = await orderService.getAllOrders();
        setOrders(allOrders);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && isAdmin) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [user, isAdmin]);

  const handleStatusUpdate = async (
    orderId: string,
    newStatus: "pending" | "in-delivery" | "delivered"
  ) => {
    try {
      setUpdatingId(orderId);
      await orderService.updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const getStatusIcon = (status: string) => {
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

  const getStatusColor = (status: string) => {
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center border-4 border-black p-10">
          <Shield className="w-14 h-14 mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold uppercase mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don&apos;t have permission to access this page.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-heading font-bold uppercase tracking-wider"
          >
            Go Home
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
            className="space-y-3"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
            <div className="flex items-center gap-3">
              <Shield className="w-9 h-9" />
              <h1 className="text-4xl lg:text-6xl font-heading font-bold uppercase">
                Manage Orders
              </h1>
            </div>
            <p className="text-white/70 max-w-2xl">
              Review, filter, and update order statuses across the store.
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
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Orders", value: orders.length },
                  {
                    label: "Pending",
                    value: orders.filter((o) => o.status === "pending").length,
                  },
                  {
                    label: "In Delivery",
                    value: orders.filter((o) => o.status === "in-delivery").length,
                  },
                  {
                    label: "Delivered",
                    value: orders.filter((o) => o.status === "delivered").length,
                  },
                ].map((stat) => (
                  <div key={stat.label} className="border-4 border-black p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mb-6 flex-wrap">
                {(["all", "pending", "in-delivery", "delivered"] as const).map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 border-2 font-semibold uppercase text-xs tracking-wider transition-colors ${
                        filter === status
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black hover:bg-black hover:text-white"
                      }`}
                    >
                      {status === "all"
                        ? "All Orders"
                        : status === "in-delivery"
                        ? "In Delivery"
                        : status}
                    </button>
                  )
                )}
              </div>

              {filteredOrders.length === 0 ? (
                <div className="border-4 border-black p-10 text-center">
                  <Package className="w-14 h-14 mx-auto mb-4" />
                  <h2 className="font-heading text-2xl font-bold uppercase mb-2">
                    No Orders Found
                  </h2>
                  <p className="text-gray-600">
                    No orders match the current filter.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order, index) => (
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
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-heading text-xl font-bold uppercase">
                                Order {order.id.slice(-8).toUpperCase()}
                              </h3>
                              <div
                                className={`inline-flex items-center gap-2 px-3 py-1 border text-xs font-semibold uppercase ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {getStatusIcon(order.status)}
                                {order.status === "in-delivery"
                                  ? "In Delivery"
                                  : order.status}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              Customer: {order.deliveryInfo.fullName} •{" "}
                              {order.items.length} item
                              {order.items.length !== 1 ? "s" : ""}
                            </p>
                            <p className="text-lg font-bold mt-2">
                              {formatCurrency.format(order.total)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 text-sm text-gray-600">
                            <p>
                              {new Date(order.createdAt.toDate()).toLocaleDateString(
                                "en-NG"
                              )}
                            </p>
                            {expandedOrderId === order.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </button>

                      {expandedOrderId === order.id && (
                        <div className="border-t-4 border-black p-6 space-y-6 bg-gray-50">
                          <div>
                            <h4 className="font-heading text-lg font-bold uppercase mb-3">
                              Customer Info
                            </h4>
                            <div className="bg-white border-2 border-black p-4 space-y-2 text-sm">
                              <p>
                                <span className="text-gray-600">Name:</span>{" "}
                                <span className="font-medium">
                                  {order.deliveryInfo.fullName}
                                </span>
                              </p>
                              <p>
                                <span className="text-gray-600">Email:</span>{" "}
                                <span className="font-medium">
                                  {order.deliveryInfo.email}
                                </span>
                              </p>
                              <p>
                                <span className="text-gray-600">Phone:</span>{" "}
                                <span className="font-medium">
                                  {order.deliveryInfo.phone}
                                </span>
                              </p>
                              <p>
                                <span className="text-gray-600">Address:</span>{" "}
                                <span className="font-medium">
                                  {order.deliveryInfo.address}
                                </span>
                              </p>
                              <p>
                                <span className="text-gray-600">Location:</span>{" "}
                                <span className="font-medium">
                                  {order.deliveryInfo.lga},{" "}
                                  {order.deliveryInfo.state}
                                </span>
                              </p>
                              {order.reference && (
                                <p>
                                  <span className="text-gray-600">
                                    Payment Ref:
                                  </span>{" "}
                                  <span className="font-mono text-xs">
                                    {order.reference}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-heading text-lg font-bold uppercase mb-3">
                              Items
                            </h4>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-3 bg-white border-2 border-black p-3"
                                >
                                  <div className="relative w-12 h-12 bg-gray-100 overflow-hidden shrink-0">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                      sizes="48px"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium line-clamp-1">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      {item.quantity}x{" "}
                                      {formatCurrency.format(
                                        item.price * item.quantity
                                      )}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="bg-white border-2 border-black p-4 mt-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Subtotal:</span>
                                <span>{formatCurrency.format(order.subtotal)}</span>
                              </div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Tax:</span>
                                <span>{formatCurrency.format(order.tax)}</span>
                              </div>
                              <div className="flex justify-between font-bold text-base border-t-2 border-black pt-2">
                                <span>Total:</span>
                                <span>{formatCurrency.format(order.total)}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-heading text-lg font-bold uppercase mb-3">
                              Update Status
                            </h4>
                            <div className="flex gap-2 flex-wrap">
                              {(["pending", "in-delivery", "delivered"] as const).map(
                                (status) => (
                                  <button
                                    key={status}
                                    onClick={() => handleStatusUpdate(order.id, status)}
                                    disabled={
                                      updatingId === order.id ||
                                      order.status === status
                                    }
                                    className={`px-4 py-2 border-2 font-semibold uppercase text-xs tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                      order.status === status
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-black border-black hover:bg-black hover:text-white"
                                    }`}
                                  >
                                    {updatingId === order.id &&
                                    order.status !== status
                                      ? "Updating..."
                                      : status === "in-delivery"
                                      ? "In Delivery"
                                      : status}
                                  </button>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
