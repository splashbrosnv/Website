import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "About | Splash Bros",
  description:
    "Learn about Splash Bros — a local North Vancouver window washing and exterior cleaning business.",
};

export default function AboutPage() {
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
            About Splash Bros
          </h1>
        </div>
      </section>

      {/* Meet the Bros */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal>
              <div className="aspect-[3/4] relative rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0 shadow-xl">
                <Image
                  src="/dane-and-jack.jpg"
                  alt="Dane and Jack - Splash Bros founders"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal delay={100}>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  We&apos;re Dane and Jack
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  We&apos;re two young local business partners proud to serve our
                  community with reliable window washing and exterior cleaning
                  services. This is our third year as an officially declared
                  business, and we&apos;re thankful for the support we&apos;ve
                  received along the way.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  We specialize in window washing, and we also offer power
                  washing. We enjoy building relationships in our community and
                  making sure our customers feel taken care of and happy with the
                  final result.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  Our focus is simple: do solid work, provide friendly service,
                  and help your home or business look its best.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32 bg-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
              Local, Reliable, and Community-Focused
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="mt-8 max-w-3xl mx-auto text-lg text-center leading-relaxed text-gray-600">
              As a North Vancouver business, we value trust, professionalism, and
              quality work. We take pride in showing up on time, doing the job
              properly, and leaving customers with results they can see right
              away.
            </p>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: "Trust", desc: "We earn your confidence through honest, transparent work." },
              { value: "Quality", desc: "Every job is done with care and attention to detail." },
              { value: "Community", desc: "Proudly serving our North Vancouver neighbours." },
            ].map((item, i) => (
              <ScrollReveal key={item.value} delay={i * 150}>
                <div className="bg-white rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-brand-blue">
                    {item.value}
                  </h3>
                  <p className="mt-3 text-gray-600">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
