"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, AlertCircle } from "lucide-react";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ServiceApplicationProps {
  serviceId: string;
  serviceName: string;
  user: User;
  onClose: () => void;
}

export default function ServiceApplication({
  serviceId,
  serviceName,
  user,
  onClose,
}: ServiceApplicationProps) {
  const [formData, setFormData] = useState({
    fullName: user.displayName || "",
    email: user.email || "",
    phone: "",
    organization: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      if (!db) throw new Error("Database not initialized");

      // Save application to Firestore
      const applicationData = {
        serviceId,
        serviceName,
        userId: user.uid,
        userEmail: user.email,
        ...formData,
        status: "pending",
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "service-applications"), applicationData);

      // Send email notification to admin
      const adminEmailResponse = await fetch("/api/send-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "admin",
          applicationId: docRef.id,
          serviceId,
          serviceName,
          applicant: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            organization: formData.organization,
            message: formData.message,
          },
        }),
      });

      if (!adminEmailResponse.ok) {
        console.error("Failed to send admin notification email");
      }

      // Send confirmation email to user
      const userEmailResponse = await fetch("/api/send-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "user",
          serviceName,
          applicant: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          },
        }),
      });

      if (!userEmailResponse.ok) {
        console.error("Failed to send user confirmation email");
      }

      setSubmitStatus("success");
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white border-4 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b-4 border-black flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-heading font-bold uppercase">
              Apply for Service
            </h2>
            <button
              onClick={onClose}
              className="cursor-pointer p-2 border-2 border-black hover:bg-black hover:text-white transition-all"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <CheckCircle size={64} className="mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-heading font-bold uppercase mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-600">
                  We&apos;ve received your application for {serviceName}. You&apos;ll receive a
                  confirmation email shortly, and our team will get back to you soon.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-6 p-4 bg-gray-100 border-2 border-black">
                  <h3 className="font-heading font-bold uppercase mb-2">
                    {serviceName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Fill out the form below to apply for this service. Our team will review
                    your application and get back to you within 2-3 business days.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-heading font-bold uppercase mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-heading font-bold uppercase mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-heading font-bold uppercase mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-sm font-heading font-bold uppercase mb-2"
                      >
                        Organization/Team
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-heading font-bold uppercase mb-2"
                    >
                      Tell us about your needs *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe your project, goals, timeline, and any specific requirements..."
                      className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border-2 border-red-600 flex items-start gap-3"
                    >
                      <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-heading font-bold uppercase text-sm text-red-600 mb-1">
                          Submission Failed
                        </p>
                        <p className="text-sm text-red-700">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className=" cursor-pointer flex-1 border-2 border-black px-6 py-3 font-heading font-bold uppercase tracking-wider hover:bg-gray-100 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cursor-pointer flex-1 bg-black text-white px-6 py-3 font-heading font-bold uppercase tracking-wider hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send size={18} />
                          Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}