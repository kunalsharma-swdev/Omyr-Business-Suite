import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { useCategories } from "@/hooks/use-supabase";
import { CategoryCard } from "@/components/CategoryCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Search, X, ChevronRight, Sparkles, ShieldCheck, Star, Smile, LayoutGrid } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

function formatName(name: string) {
  return name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function CategorySidebar({
  onClose,
  isDrawer = false,
}: {
  onClose?: () => void;
  isDrawer?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [, navigate] = useLocation();
  const { data: categories, isLoading } = useCategories();

  const sorted = useMemo(() => {
    if (!categories) return [];
    const filtered = categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [categories, search]);

  const handleCategoryClick = (name: string) => {
    navigate(`/catalogue/${encodeURIComponent(name)}`);
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-[#E8177A]" />
            <h2 className="font-sans text-sm font-semibold text-[#1F2937] tracking-wide">Browse Categories</h2>
          </div>
          {isDrawer && onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-[#FFF8FC] flex items-center justify-center text-[#6B7280] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories…"
            className="w-full pl-9 pr-4 py-2.5 bg-[#FFF8FC] border border-[#E5E7EB] rounded-xl text-sm font-sans text-[#1F2937] placeholder-[#9CA3AF] focus:outline-none focus:border-[#E8177A] focus:ring-1 focus:ring-[#E8177A]/30 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category list */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {isLoading ? (
          <div className="space-y-1.5 px-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-9 bg-[#F3F4F6] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-10 text-[#9CA3AF] font-sans text-sm">
            No categories found
          </div>
        ) : (
          <ul className="space-y-0.5">
            {sorted.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryClick(cat.name)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left font-sans text-sm text-[#6B7280] hover:bg-[#FFF8FC] hover:text-[#E8177A] transition-all duration-150 group"
                >
                  <span className="font-medium">{formatName(cat.name)}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150 text-[#E8177A]" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-5 py-4 border-t border-[#E5E7EB]">
        <Link href="/catalogue">
          <span
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E8177A] to-[#7C3AED] text-white font-sans text-xs font-semibold tracking-wide shadow-[0_2px_10px_rgba(232,23,122,0.3)] hover:shadow-[0_4px_16px_rgba(232,23,122,0.4)] transition-all duration-200 cursor-pointer"
            onClick={onClose}
          >
            View All Categories
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.title = "Omyra Fancy Dress | Make Every Celebration Special";
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const { data: categories, isLoading, error } = useCategories();

  return (
    <div className="flex min-h-screen bg-[#FFF8FC]">

      {/* ── Desktop Sidebar (sticky, 25%) ── */}
      <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-r border-[#E5E7EB] shadow-[2px_0_16px_rgba(0,0,0,0.04)]">
        <CategorySidebar />
      </aside>

      {/* ── Mobile Category Drawer ── */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full w-[300px] shadow-2xl transform transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <CategorySidebar onClose={() => setDrawerOpen(false)} isDrawer />
        </div>
      </div>

      {/* ── Main Content (75%) ── */}
      <main className="flex-1 overflow-hidden">

        {/* Mobile "Browse Categories" trigger */}
        <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-[#E5E7EB] px-4 py-2.5 flex items-center gap-3 shadow-sm">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8177A]/30 text-[#E8177A] font-sans text-xs font-semibold hover:bg-[#FFF8FC] transition-colors"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Browse Categories
          </button>
          <span className="text-[#6B7280] font-sans text-xs">or scroll to explore</span>
        </div>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#FFF8FC] to-[#FDF4FF] pt-20 lg:pt-28 pb-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#E8177A]/10 via-[#7C3AED]/6 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#FBBF24]/10 to-transparent blur-3xl pointer-events-none" />

          <div className="container mx-auto px-5 md:px-8 relative z-10">
            <div className="max-w-2xl">
              <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.45em] uppercase mb-5 font-medium animate-in fade-in duration-700">
                Fancy Dress · School Uniforms · Rental Boutique
              </p>

              <h1
                className="font-serif font-light text-[#1F2937] leading-[1.05] mb-7 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
              >
                Make Every
                <br />
                <span className="italic text-[#E8177A]">Celebration</span>
                <br />
                Special
              </h1>

              <p className="text-[#6B7280] font-sans text-base max-w-md mb-9 leading-relaxed animate-in fade-in duration-700 delay-200">
                Beautifully crafted costumes for Diwali, School Events, Janmashtami and more — available for rent.
              </p>

              <div className="flex flex-wrap gap-3 mb-8 animate-in fade-in duration-700 delay-300">
                <Link href="/catalogue">
                  <span className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#E8177A] text-white font-sans font-semibold text-sm shadow-[0_4px_20px_rgba(232,23,122,0.35)] hover:shadow-[0_6px_28px_rgba(232,23,122,0.45)] hover:bg-[#c8126a] transition-all duration-200 cursor-pointer">
                    Explore Catalogue
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
                <a
                  href="https://wa.me/918197547412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white border border-[#E5E7EB] text-[#1F2937] font-sans font-semibold text-sm hover:border-[#25D366] hover:text-[#25D366] hover:shadow-[0_4px_16px_rgba(37,211,102,0.2)] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  <SiWhatsapp className="w-4 h-4 text-[#25D366]" />
                  WhatsApp Enquiry
                </a>
              </div>

              <p className="animate-in fade-in duration-700 delay-400">
                <span className="inline-flex items-center gap-2 text-[#9CA3AF] font-sans text-xs tracking-wider">
                  <span className="w-4 h-px bg-[#E8177A]/40" />
                  All products available for rent only
                </span>
              </p>
            </div>
          </div>

          {/* Occasions strip */}
          <div className="container mx-auto px-5 md:px-8 mt-12 relative z-10">
            <div className="flex flex-wrap gap-2">
              {["Diwali", "Independence Day", "Janmashtami", "Christmas", "School Annual Day", "Republic Day", "Navratri", "Cultural Fest"].map((o) => (
                <span
                  key={o}
                  className="px-4 py-1.5 bg-white border border-[#E5E7EB] rounded-full text-[#6B7280] font-sans text-xs font-medium hover:border-[#E8177A] hover:text-[#E8177A] hover:bg-[#FFF8FC] transition-all duration-200 cursor-default shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Categories ── */}
        <section className="py-20 bg-white border-t border-[#E5E7EB]">
          <div className="container mx-auto px-5 md:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.4em] uppercase mb-2 font-medium">Our Collection</p>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1F2937]">Featured Categories</h2>
              </div>
              <Link href="/catalogue">
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[#E8177A] font-sans text-sm font-medium hover:underline cursor-pointer">
                  View all <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#F3F4F6] animate-pulse rounded-2xl aspect-[4/3]" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-[#E8177A] p-8 bg-[#E8177A]/5 rounded-2xl border border-[#E8177A]/15 font-sans text-sm">
                Failed to load categories. Please try refreshing.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {categories?.slice(0, 6).map((category) => (
                  <CategoryCard
                    key={category.id}
                    name={category.name}
                    imageName={category.image_name}
                  />
                ))}
              </div>
            )}

            <div className="mt-8 sm:hidden">
              <Link href="/catalogue">
                <span className="inline-flex items-center gap-2 text-[#E8177A] font-sans text-sm font-medium cursor-pointer">
                  View all categories <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 bg-gradient-to-br from-[#FFF8FC] to-[#FDF4FF] border-t border-[#E5E7EB]">
          <div className="container mx-auto px-5 md:px-8">
            <div className="text-center mb-12">
              <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.4em] uppercase mb-3 font-medium">How It Works</p>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1F2937]">Simple Rental Process</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "Browse",
                  desc: "Explore our catalogue and find the perfect costume for your occasion.",
                  color: "#E8177A",
                },
                {
                  num: "02",
                  title: "WhatsApp Enquiry",
                  desc: "Click the WhatsApp button on any product to check availability and sizing.",
                  color: "#7C3AED",
                },
                {
                  num: "03",
                  title: "Rent & Celebrate",
                  desc: "Pick up your clean, pressed costume and make every moment unforgettable.",
                  color: "#2563EB",
                },
              ].map(({ num, title, desc, color }) => (
                <div
                  key={num}
                  className="bg-white rounded-2xl p-8 border border-[#E5E7EB]/80 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)] transition-shadow duration-400 group"
                >
                  <p
                    className="text-5xl font-serif font-light mb-5 transition-colors duration-300"
                    style={{ color: `${color}30` }}
                  >
                    {num}
                  </p>
                  <h3 className="text-xl font-serif font-light text-[#1F2937] mb-3" style={{ color }}>
                    {title}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed font-sans">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-20 bg-white border-t border-[#E5E7EB]">
          <div className="container mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.4em] uppercase mb-4 font-medium">Why Choose Omyra</p>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1F2937] mb-5 leading-tight">
                  The boutique{" "}
                  <span className="italic text-[#E8177A]">families trust</span>
                </h2>
                <p className="text-[#6B7280] text-base mb-8 leading-relaxed font-sans">
                  Every child deserves to shine on their special day. We offer authentic, hygienic, and beautifully crafted costumes — rented with care.
                </p>
                <ul className="space-y-3.5">
                  {[
                    "Premium Quality Fabrics & Materials",
                    "Professionally Cleaned & Sanitized",
                    "Wide Range of Sizes Available",
                    "Authentic Traditional Designs",
                    "Friendly, Personalised Service",
                  ].map((reason) => (
                    <li key={reason} className="flex items-center gap-3 text-[#6B7280] font-sans text-sm">
                      <span className="w-5 h-5 rounded-full bg-[#E8177A]/10 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8177A]" />
                      </span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: ShieldCheck, label: "Hygiene Guaranteed", color: "#E8177A" },
                  { icon: Star, label: "Premium Quality", color: "#7C3AED" },
                  { icon: Sparkles, label: "Authentic Designs", color: "#2563EB" },
                  { icon: Smile, label: "Family-Friendly", color: "#FBBF24" },
                ].map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="bg-[#FFF8FC] rounded-2xl p-6 border border-[#E5E7EB]/80 text-center hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] transition-shadow duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <p className="font-sans text-sm font-semibold text-[#1F2937]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="py-20 bg-[#FFF8FC] border-t border-[#E5E7EB]">
          <div className="container mx-auto px-5 md:px-8">
            <div className="mb-8">
              <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.4em] uppercase mb-3 font-medium">Find Us</p>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1F2937]">Visit Our Store</h2>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] w-full h-[380px] shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
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
            <div className="mt-4">
              <a
                href="https://maps.google.com/?q=Omyra+Fancy+Dress+%26+School+Uniforms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#2563EB] font-sans text-sm font-medium hover:underline"
              >
                <ChevronRight className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-gradient-to-r from-[#E8177A] to-[#7C3AED]">
          <div className="container mx-auto px-5 md:px-8 text-center">
            <p className="text-white/70 font-sans text-[11px] tracking-[0.4em] uppercase mb-5 font-medium">
              Ready to Celebrate?
            </p>
            <h2
              className="font-serif font-light text-white leading-[1.05] mb-8"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Find the perfect
              <br />
              <span className="italic">costume today</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/catalogue">
                <span className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#E8177A] font-sans font-semibold text-sm shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.2)] transition-all duration-200 cursor-pointer">
                  Browse Catalogue
                </span>
              </Link>
              <WhatsAppButton
                text="Message Us Now"
                className="!rounded-full px-8 py-3.5 text-sm font-semibold h-auto border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white"
                variant="ghost"
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
