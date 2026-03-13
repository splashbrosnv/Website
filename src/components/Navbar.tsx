"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Splash Bros"
              width={360}
              height={100}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-gray-600 hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:604-540-3910"
              className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-gray-100 transition-colors"
            >
              Text or Call 604-540-3910
            </a>
            <Link
              href="/contact"
              className="rounded-full bg-brand-orange px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-orange-hover transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-full bg-foreground transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-full bg-foreground transition-opacity ${isOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-full bg-foreground transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-6 py-6 flex flex-col gap-4">
            <Link
              href="/"
              className="text-base font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-base font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
              <a
                href="tel:604-540-3910"
                className="text-center rounded-full border border-gray-200 px-5 py-3 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Text or Call 604-540-3910
              </a>
              <Link
                href="/contact"
                className="text-center rounded-full bg-brand-orange px-5 py-3 text-sm font-medium text-white"
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
