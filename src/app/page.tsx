import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/hero-bg.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-fade-in-up">
            Professional Window Washing
            <br />
            in North Vancouver
          </h1>
          <p
            className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Reliable window washing, power washing, and gutter cleaning from a
            trusted local team.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
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
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Welcome to Splash Bros
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="mt-8 text-lg leading-relaxed text-gray-600">
              At Splash Bros, we&apos;re proud to help homes and businesses in
              North Vancouver look their best. Our goal is simple: deliver
              excellent results, provide friendly service, and make every
              customer feel confident they made the right choice.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              We believe great service starts with trust, clear communication,
              and attention to detail. Whether you need spotless windows, cleaner
              exterior surfaces, or cleared gutters, we&apos;re here to help.
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* Before & After */}
      <section className="py-24 sm:py-32 bg-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
              Before &amp; After
            </h2>
            <p className="mt-4 text-center text-gray-600 text-lg">
              See the difference for yourself.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="mt-12">
              <BeforeAfterSlider />
            </div>
          </ScrollReveal>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
              Why Homeowners Choose
              <br className="hidden sm:block" /> Splash Bros
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Friendly & Reliable",
                description:
                  "Friendly, reliable local service you can count on every time.",
                icon: "01",
              },
              {
                title: "Clear Communication",
                description:
                  "Clear communication from start to finish so you always know what to expect.",
                icon: "02",
              },
              {
                title: "Simple Quotes",
                description:
                  "Simple quotes and easy contact — no hassle, no hidden fees.",
                icon: "03",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 100}>
                <div className="bg-white rounded-2xl p-8 h-full">
                  <span className="text-4xl font-bold text-brand-orange/20">
                    {item.icon}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
              Our Services
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Window Washing",
                description:
                  "Our specialty. We deliver clean, streak-free windows that brighten your home or business.",
                image: "/before-after-glass.jpg",
              },
              {
                title: "Power Washing",
                description:
                  "Refresh driveways, patios, walkways, siding, and other exterior surfaces.",
                image: "/before-after-patio.jpg",
              },
            ].map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 150}>
                <div className="group rounded-2xl overflow-hidden bg-gray-100 h-full">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300}>
            <div className="mt-12 text-center">
              <Link
                href="/services"
                className="inline-block rounded-full bg-brand-blue px-8 py-4 text-base font-semibold text-white hover:bg-brand-blue/90 transition-colors"
              >
                View Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-brand-blue">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to Make Your
              <br /> Property Shine?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="mt-6 text-lg text-white/70">
              Get in touch today for a quote or give us a call. We&apos;re happy
              to answer questions and help you find the right service.
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
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
