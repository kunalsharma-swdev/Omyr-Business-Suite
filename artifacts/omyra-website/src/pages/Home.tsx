import { useEffect } from "react";
import { Link } from "wouter";
import { useCategories } from "@/hooks/use-supabase";
import { CategoryCard } from "@/components/CategoryCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  useEffect(() => {
    document.title = "Omyra Fancy Dress | Make Every Celebration Special";
  }, []);

  const { data: categories, isLoading, error } = useCategories();

  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09000f]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 55% at 50% -5%, rgba(232,23,122,0.22) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, #09000f, transparent)" }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center pt-20">
          <p className="text-primary/60 font-sans text-[11px] tracking-[0.4em] uppercase mb-12 animate-in fade-in duration-700">
            Fancy Dress &amp; School Uniforms · Rental Boutique
          </p>

          <h1
            className="font-serif font-light text-white leading-[0.92] tracking-tight mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
            style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}
          >
            Make Every
            <br />
            <span className="italic text-primary">Celebration</span>
            <br />
            Special
          </h1>

          <div className="w-14 h-px bg-white/15 mx-auto my-10" />

          <p className="text-white/35 font-sans text-sm md:text-base max-w-md mx-auto mb-14 font-light leading-relaxed animate-in fade-in duration-700 delay-300">
            Beautifully crafted costumes for Diwali, School Events, Janmashtami
            and more — available for rent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-in fade-in duration-700 delay-500">
            <Link href="/catalogue">
              <span className="inline-flex items-center justify-center px-10 py-3.5 border border-white/25 text-white/85 text-xs font-sans font-medium tracking-[0.22em] uppercase hover:bg-white hover:text-foreground transition-all duration-300 cursor-pointer">
                Explore Catalogue
              </span>
            </Link>
            <a
              href="https://wa.me/918197547412"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-3.5 bg-primary text-white text-xs font-sans font-medium tracking-[0.22em] uppercase hover:bg-primary/90 transition-all duration-300"
            >
              WhatsApp Enquiry
            </a>
          </div>

          <p className="mt-14 animate-in fade-in duration-700 delay-700">
            <span className="inline-flex items-center gap-2 border border-primary/40 text-primary/80 text-[10px] font-sans tracking-[0.3em] uppercase px-5 py-2">
              All products available for rent only
            </span>
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── Occasions Strip ──────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-[10px] text-muted-foreground/40 font-sans tracking-[0.4em] uppercase mb-8">
            Occasions We Serve
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Diwali",
              "Independence Day",
              "Janmashtami",
              "Christmas",
              "School Annual Day",
              "Republic Day",
              "Navratri",
              "Cultural Fest",
            ].map((occasion) => (
              <span
                key={occasion}
                className="px-5 py-2 border border-border text-muted-foreground/70 text-xs font-sans tracking-wider hover:border-primary hover:text-primary transition-all duration-300 cursor-default"
              >
                {occasion}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Categories ──────────────────────────────── */}
      <section className="py-28 bg-[#fafafa]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16">
            <p className="text-[10px] text-muted-foreground/40 font-sans tracking-[0.4em] uppercase mb-4">
              Our Collection
            </p>
            <h2 className="text-5xl md:text-6xl font-serif font-light text-foreground">
              Browse by Category
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-muted animate-pulse aspect-[4/3]"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-destructive p-8 bg-destructive/10">
              Failed to load categories. Please try refreshing.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {categories?.slice(0, 6).map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  imageName={category.image_name}
                />
              ))}
            </div>
          )}

          <div className="mt-12">
            <Link href="/catalogue">
              <span className="inline-flex items-center justify-center px-10 py-3.5 border border-border text-muted-foreground text-xs font-sans font-medium tracking-[0.22em] uppercase hover:border-foreground hover:text-foreground transition-all duration-300 cursor-pointer">
                View All Categories
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-28 bg-[#09000f]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-20">
            <p className="text-[10px] text-primary/60 font-sans tracking-[0.4em] uppercase mb-4">
              How It Works
            </p>
            <h2 className="text-5xl md:text-6xl font-serif font-light text-white">
              Simple Rental Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              {
                num: "01",
                title: "Browse",
                desc: "Explore our catalogue and find the perfect costume for your occasion.",
              },
              {
                num: "02",
                title: "WhatsApp Enquiry",
                desc: "Click the WhatsApp button on any product to check availability and sizing.",
              },
              {
                num: "03",
                title: "Rent & Celebrate",
                desc: "Pick up your clean, pressed costume and make every moment unforgettable.",
              },
            ].map(({ num, title, desc }) => (
              <div
                key={num}
                className="p-10 border border-white/8 group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-7xl font-serif font-light text-primary/20 mb-8 group-hover:text-primary/35 transition-colors duration-500">
                  {num}
                </p>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">
                  {title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-sans">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────── */}
      <section className="py-28 bg-[#09000f]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-primary/60 font-sans text-[11px] tracking-[0.4em] uppercase mb-8">
                Why Choose Omyra
              </p>
              <h2 className="text-5xl md:text-6xl font-serif font-light text-white mb-10 leading-[1.05]">
                The boutique
                <br />
                <span className="italic text-primary">families trust</span>
              </h2>
              <p className="text-white/35 text-base mb-14 leading-relaxed font-light font-sans">
                Every child deserves to shine on their special day. We offer
                authentic, hygienic, and beautifully crafted costumes — rented
                with care.
              </p>
              <ul className="space-y-5">
                {[
                  "Premium Quality Fabrics & Materials",
                  "Professionally Cleaned & Sanitized",
                  "Wide Range of Sizes Available",
                  "Authentic Traditional Designs",
                  "Friendly, Personalised Service",
                ].map((reason) => (
                  <li
                    key={reason}
                    className="flex items-center gap-5 text-white/55 font-sans text-sm"
                  >
                    <span className="w-6 h-px bg-primary shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center min-h-[400px] border border-white/8 p-16 text-center">
              <div className="w-16 h-px bg-primary/30 mx-auto mb-10" />
              <h3 className="text-4xl font-serif font-light text-white mb-5">
                Quality
                <br />
                Guaranteed
              </h3>
              <div className="w-8 h-px bg-white/15 mx-auto mb-6" />
              <p className="text-white/25 font-sans text-sm tracking-wider uppercase">
                Every costume tells a story
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ──────────────────────────────────────────────── */}
      <section className="py-28 bg-white border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-14">
            <p className="text-[10px] text-muted-foreground/40 font-sans tracking-[0.4em] uppercase mb-4">
              Find Us
            </p>
            <h2 className="text-5xl md:text-6xl font-serif font-light text-foreground">
              Visit Our Store
            </h2>
          </div>

          <div className="overflow-hidden border border-border w-full h-[420px]">
            <iframe
              title="Omyra Fancy Dress Store Location"
              src="https://maps.google.com/maps?q=Omyra+Fancy+Dress+%26+School+Uniforms&output=embed&z=15"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-6">
            <a
              href="https://maps.google.com/?q=Omyra+Fancy+Dress+%26+School+Uniforms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs font-sans tracking-[0.22em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <span className="w-8 h-px bg-current" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-28 bg-[#09000f] border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary/60 font-sans text-[11px] tracking-[0.4em] uppercase mb-8">
            Ready to Celebrate?
          </p>
          <h2
            className="font-serif font-light text-white leading-[1.0] mb-14"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Find the perfect
            <br />
            <span className="italic text-primary">costume today</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/catalogue">
              <span className="inline-flex items-center justify-center px-10 py-3.5 border border-white/25 text-white/85 text-xs font-sans font-medium tracking-[0.22em] uppercase hover:bg-white hover:text-foreground transition-all duration-300 cursor-pointer">
                Browse Catalogue
              </span>
            </Link>
            <WhatsAppButton
              text="Message Us Now"
              className="!rounded-none px-10 py-3.5 text-xs tracking-[0.22em] uppercase font-medium h-auto"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
