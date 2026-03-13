import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "Services | Splash Bros",
  description:
    "Window washing, power washing, and gutter cleaning services in North Vancouver. Minimum service call $99.",
};

const services = [
  {
    title: "Window Washing",
    description:
      "Window washing is our specialty. We provide clean, streak-free results that improve the appearance of your home or business and let more natural light in.",
    image: "/before-after-glass.jpg",
    features: [
      "Interior & exterior windows",
      "Streak-free results",
      "Residential & commercial",
      "Screen cleaning included",
    ],
  },
  {
    title: "Power Washing",
    description:
      "Our power washing service helps remove dirt, buildup, and grime from exterior surfaces, leaving your property looking refreshed and well-maintained.",
    image: "/before-after-patio.jpg",
    features: [
      "Driveways & walkways",
      "Patios & decks",
      "Surface restoration",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <Image
          src="/hero-bg.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white animate-fade-in-up">
            Our Services
          </h1>
          <p className="mt-6 text-lg text-white/70 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            We specialize in window washing and also offer power washing and
            gutter cleaning for homes and businesses in North Vancouver.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-24">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 100}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:direction-rtl" : ""
                  }`}
                >
                  <div
                    className={`aspect-[4/3] rounded-2xl overflow-hidden relative ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                      {service.title}
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                    <ul className="mt-8 flex flex-col gap-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <span className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-brand-blue">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Need a Quote?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="mt-6 text-lg text-white/70">
              Contact us today to get started. We&apos;ll help you choose the
              right service for your property.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-brand-orange px-8 py-4 text-base font-semibold text-white hover:bg-brand-orange-hover transition-colors"
              >
                Get a Quote
              </Link>
              <a
                href="tel:604-540-3910"
                className="rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Text or Call 604-540-3910
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
