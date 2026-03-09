import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold tracking-tight">Splash Bros</h3>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Professional window washing, power washing, and gutter cleaning in
              North Vancouver, BC.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contact
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="mailto:splashbrosnv@gmail.com"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  splashbrosnv@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:778-868-2514"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  778-868-2514
                </a>
              </li>
              <li className="text-sm text-gray-300">
                North Vancouver, BC
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Splash Bros. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
