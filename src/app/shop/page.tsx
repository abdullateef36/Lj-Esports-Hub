"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  Trash2,
  PackagePlus,
  Edit2,
  X,
  Briefcase,
  Users,
  Palette,
  Handshake,
  MessageSquare,
} from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import CreateProduct from "@/components/shop/CreateProduct";
import EditProduct from "@/components/shop/EditProduct";
import ServiceApplication from "@/components/shop/ServiceApplication";
import { ShopProduct } from "@/lib/shop";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SERVICES = [
  {
    id: "talent-management",
    title: "Talent Representation & Management",
    icon: Users,
    description:
      "We act as the backbone for the industry's most dedicated talent, allowing you to focus entirely on your performance while we handle the business.",
    features: [
      "Pro Players & Teams: Contract negotiations, career mapping, and performance oversight",
      "Content Creators: Strategic growth plans and brand alignment",
      "Path-to-Pro: EGCI talent scouting and nurturing",
    ],
    color: "from-purple-600 to-pink-600",
  },
  {
    id: "creative-studio",
    title: "Creative Studio & Branding",
    icon: Palette,
    description:
      "First impressions are everything in a digital-first industry. Our creative team ensures your visual identity is as sharp as your gameplay.",
    features: [
      "Identity Design: Professional logos and brand kits",
      "Stream Assets: Custom overlays, alerts, and transitions",
      "Event Production: Tournament graphics and broadcast overlays",
    ],
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "partnerships",
    title: "Strategic Partnerships & Sponsorships",
    icon: Handshake,
    description:
      "We connect the dots between endemic brands and the gaming community to create mutually beneficial opportunities.",
    features: [
      "Sponsorship Acquisition: Securing financial backing from top brands",
      "Partnership Management: Managing relationships and deliverables",
      "Professional Proposals: Data-driven pitch decks",
    ],
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "media-management",
    title: "Media & Community Management",
    icon: MessageSquare,
    description:
      "Building an audience is a full-time job. We handle the noise so you can build a community.",
    features: [
      "Social Media Management: Content scheduling and engagement",
      "Community Building: Moderation and engagement tactics",
      "Public Relations: Press relations in African and global esports",
    ],
    color: "from-orange-600 to-red-600",
  },
];

export default function ShopPage() {
  const { user, isAdmin } = useUser();
  const products = useProducts();
  const {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const {
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ShopProduct | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "services">("products");

  const formatCurrency = useMemo(
    () =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }),
    []
  );

  const deleteProduct = async (productId: string) => {
    if (!db) return;
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "shop-products", productId));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(white 1px, transparent 1px),
                linear-gradient(90deg, white 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag size={40} />
                <h1 className="text-5xl lg:text-7xl font-heading font-bold uppercase">
                  Shop & Services
                </h1>
              </div>
              <p className="text-lg lg:text-xl text-white/80 max-w-2xl">
                Premium merch, gear, collectibles, and professional esports services for the LJ community.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {isAdmin && user && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-white text-black px-6 py-3 font-heading font-bold uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <PackagePlus size={18} />
                  Add Product
                </button>
              )}

              <Link
                href={isAdmin ? "/admin/orders" : "/orders"}
                className="relative border-2 border-white text-white px-6 py-3 font-heading font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-2"
              >
                {isAdmin ? "Manage Orders" : "Orders"}
              </Link>

              <button
                onClick={() => setWishlistOpen(true)}
                className="relative border-2 border-white text-white px-6 py-3 font-heading font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-2"
              >
                <Heart size={18} />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative bg-white text-black px-6 py-3 font-heading font-bold uppercase tracking-wider hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b-4 border-black sticky top-0 bg-white z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex-1 py-4 px-6 font-heading font-bold uppercase tracking-wider transition-all ${
                activeTab === "products"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <ShoppingBag className="inline-block mr-2" size={20} />
              Physical Products
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`flex-1 py-4 px-6 font-heading font-bold uppercase tracking-wider transition-all border-l-4 border-black ${
                activeTab === "services"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <Briefcase className="inline-block mr-2" size={20} />
              Professional Services
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {activeTab === "products" && (
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {products.length === 0 ? (
              <div className="text-center py-20 border-4 border-black">
                <ShoppingBag size={64} className="mx-auto mb-4" />
                <h2 className="text-2xl font-heading font-bold uppercase mb-2">
                  No Products Yet
                </h2>
                <p className="text-gray-600">
                  New drops coming soon. Check back for fresh gear.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="border-4 border-black group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 bg-white text-black text-xs font-heading font-bold uppercase tracking-wider px-3 py-1">
                        {product.category}
                      </div>
                      {!product.inStock && (
                        <div className="absolute top-3 right-3 bg-black text-white text-xs font-heading font-bold uppercase tracking-wider px-3 py-1">
                          Out of Stock
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-heading text-2xl font-bold uppercase mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold">
                          {formatCurrency.format(product.price)}
                        </span>
                        <button
                          onClick={() =>
                            isInWishlist(product.id)
                              ? removeFromWishlist(product.id)
                              : addToWishlist(product)
                          }
                          className={`p-2 border-2 border-black transition-all ${
                            isInWishlist(product.id)
                              ? "bg-black text-white"
                              : "bg-white text-black hover:bg-black hover:text-white"
                          }`}
                          aria-label="Toggle wishlist"
                        >
                          <Heart size={16} />
                        </button>
                      </div>

                      {isAdmin ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="flex-1 border-2 border-black px-4 py-2 font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="flex-1 border-2 border-black px-4 py-2 font-heading font-bold uppercase text-xs hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className="w-full bg-black text-white px-4 py-3 font-heading font-bold uppercase tracking-wider hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Services Section */}
      {activeTab === "services" && (
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-heading font-bold uppercase mb-4">
                Our Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At Limitless Journey, we offer a 360-degree approach to the esports ecosystem. 
                Whether you are an aspiring pro, an established creator, or a brand looking to enter 
                the gaming space, we provide the professional framework to ensure your success.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-4 border-black group hover:shadow-2xl transition-all"
                  >
                    <div className={`bg-linear-to-br ${service.color} p-6 relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-10">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `
                              linear-gradient(white 1px, transparent 1px),
                              linear-gradient(90deg, white 1px, transparent 1px)
                            `,
                            backgroundSize: "20px 20px",
                          }}
                        />
                      </div>
                      <div className="relative z-10">
                        <Icon size={40} className="text-white mb-3" />
                        <h3 className="font-heading text-2xl font-bold uppercase text-white">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-700 mb-6">
                        {service.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black mt-2 shrink-0" />
                            <p className="text-sm text-gray-600">{feature}</p>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setSelectedService(service.id)}
                        className="w-full bg-black text-white px-6 py-3 font-heading font-bold uppercase tracking-wider hover:bg-gray-900 transition-all"
                      >
                        Apply for Service
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full md:w-96 bg-white border-l-4 border-black z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b-4 border-black">
                <h2 className="text-2xl font-heading font-bold uppercase flex items-center gap-2">
                  <ShoppingCart size={22} />
                  Your Cart
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                  aria-label="Close cart"
                >
                  <X size={18} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <ShoppingCart size={48} className="mb-4" />
                  <p className="text-gray-600">Your cart is empty.</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 border-2 border-black"
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
                          <h4 className="font-heading font-bold uppercase text-sm">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {formatCurrency.format(item.price)}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 border-2 border-black hover:bg-black hover:text-white transition-all"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center font-semibold text-sm">
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
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t-4 border-black">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-heading font-bold uppercase">
                        Total
                      </span>
                      <span className="text-2xl font-bold">
                        {formatCurrency.format(cartTotal)}
                      </span>
                    </div>
                    <Link
                      href="/cart"
                      className="block w-full bg-black text-white px-6 py-3 font-heading font-bold uppercase tracking-wider hover:bg-gray-900 transition-all text-center"
                    >
                      Checkout
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {wishlistOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setWishlistOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full md:w-96 bg-white border-l-4 border-black z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b-4 border-black">
                <h2 className="text-2xl font-heading font-bold uppercase flex items-center gap-2">
                  <Heart size={22} />
                  Wishlist
                </h2>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
                  aria-label="Close wishlist"
                >
                  <X size={18} />
                </button>
              </div>

              {wishlist.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <Heart size={48} className="mb-4" />
                  <p className="text-gray-600">Your wishlist is empty.</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 border-2 border-black"
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
                        <h4 className="font-heading font-bold uppercase text-sm">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {formatCurrency.format(item.price)}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => addToCart(item)}
                            className="px-3 py-1 border-2 border-black text-xs font-heading font-bold uppercase hover:bg-black hover:text-white transition-all"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="ml-auto p-1 border-2 border-black hover:bg-black hover:text-white transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      {showCreateModal && user && (
        <CreateProduct user={user} onClose={() => setShowCreateModal(false)} />
      )}

      {editingProduct && (
        <EditProduct product={editingProduct} onClose={() => setEditingProduct(null)} />
      )}

      {selectedService && user && (
        <ServiceApplication
          serviceId={selectedService}
          serviceName={SERVICES.find((s) => s.id === selectedService)?.title || ""}
          user={user}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}