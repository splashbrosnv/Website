"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import ScrollReveal from "@/components/ScrollReveal";

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const addressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function initAutocomplete() {
      if (!addressRef.current || !window.google?.maps?.places) return;
      const autocomplete = new window.google.maps.places.Autocomplete(
        addressRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: "ca" },
        }
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address && addressRef.current) {
          addressRef.current.value = place.formatted_address;
        }
      });
    }

    if (window.google?.maps?.places) {
      initAutocomplete();
    } else {
      const interval = setInterval(() => {
        if (window.google?.maps?.places) {
          clearInterval(interval);
          initAutocomplete();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 bg-gray-100">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">
            Contact Splash Bros
          </h1>
          <p
            className="mt-6 text-lg text-gray-600 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            We&apos;d love to hear from you. Reach out for a quote, give us a
            call, or send us an email and we&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-2xl font-bold">Get in Touch</h2>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="mt-8 flex flex-col gap-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Location
                    </h3>
                    <p className="mt-1 text-lg">North Vancouver, BC</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-600 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors"
                        placeholder="778-000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="Window Washing">Window Washing</option>
                      <option value="Power Washing">Power Washing</option>
                      <option value="Multiple Services">
                        Multiple Services
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Property Address
                    </label>
                    <input
                      ref={addressRef}
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="off"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors"
                      placeholder="Start typing your address..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-full bg-brand-blue px-8 py-4 text-base font-semibold text-white hover:bg-brand-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending..." : "Request a Quote"}
                  </button>

                  {status === "sent" && (
                    <p className="text-green-600 font-medium">
                      Thank you! We&apos;ll get back to you soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-600 font-medium">
                      Something went wrong. Please try again or call us
                      directly.
                    </p>
                  )}
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
