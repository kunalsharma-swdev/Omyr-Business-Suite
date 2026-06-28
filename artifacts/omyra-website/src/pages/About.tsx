import { useEffect } from "react";
import { Link } from "wouter";
import { Sparkles, Users, Award, Clock, Star } from "lucide-react";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Omyra Fancy Dress";
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8FC]">

      {/* Hero */}
      <div className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-white via-[#FFF8FC] to-[#FDF4FF]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-bl from-[#E8177A]/8 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#7C3AED]/6 to-transparent blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 text-center">
          <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.4em] uppercase mb-5 font-medium">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-light text-[#1F2937] mb-6 leading-tight">
            About <span className="italic text-[#E8177A]">Omyra</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#E8177A] to-[#7C3AED] mx-auto mb-6 rounded-full" />
          <p className="text-[#6B7280] font-sans text-base max-w-xl mx-auto leading-relaxed">
            Bringing joy and authenticity to every celebration through premium fancy dress and school uniform rentals.
          </p>
        </div>
      </div>

      {/* Story card */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl -mt-8 relative z-20 pb-16">
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-[#E5E7EB]/60">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-serif font-light text-[#1F2937] mb-8 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#E8177A] rounded-full" />
              Our Story
            </h2>
            <div className="space-y-5 text-[#6B7280] leading-relaxed font-sans">
              <p>
                Omyra Fancy Dress & School Uniforms was born out of a simple need: parents seeking high-quality, authentic, and hygienic costumes for their children's special moments. Whether it's a vibrant Diwali celebration, a school annual day performance, or dressing up as historical figures for Independence Day, we believe every child deserves to look and feel extraordinary.
              </p>
              <p>
                Unlike traditional costume rental shops, we run Omyra like a premium boutique. We source the best fabrics, ensure meticulous detailing for traditional and historical outfits, and maintain rigorous cleaning standards after every single rental.
              </p>
              <p>
                Our goal is to make the rental experience as seamless and joyous as the event itself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 bg-white border-y border-[#E5E7EB]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.4em] uppercase mb-3 font-medium">Our Promise</p>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1F2937] mb-3">
              Our Commitment
            </h2>
            <p className="text-[#6B7280] max-w-lg mx-auto font-sans">
              The pillars that make Omyra the preferred choice for families.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Premium Quality", desc: "No cheap synthetics. We use fabrics that look great on stage and feel comfortable on the skin.", color: "#E8177A" },
              { icon: Sparkles, title: "Immaculate Hygiene", desc: "Every costume is professionally cleaned and sanitized before it reaches your hands.", color: "#7C3AED" },
              { icon: Users, title: "For Everyone", desc: "A wide variety of sizes ensuring a perfect fit for children of all ages.", color: "#2563EB" },
              { icon: Clock, title: "Easy Experience", desc: "A hassle-free process from browsing online to quick WhatsApp booking.", color: "#FBBF24" },
            ].map((value, i) => (
              <div key={i} className="text-center p-7 bg-[#FFF8FC] rounded-2xl border border-[#E5E7EB]/80 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${value.color}15` }}
                >
                  <value.icon className="w-7 h-7" style={{ color: value.color }} />
                </div>
                <h3 className="text-lg font-serif font-light text-[#1F2937] mb-2">{value.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed font-sans">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="py-16 bg-gradient-to-r from-[#E8177A] to-[#7C3AED]">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-[#FBBF24] fill-[#FBBF24]" />)}
          </div>
          <h2 className="text-3xl font-serif font-light text-white mb-4">
            The boutique <span className="italic">families trust</span>
          </h2>
          <p className="text-white/70 font-sans max-w-md mx-auto text-sm mb-8">
            Every child deserves to shine on their special day. We offer authentic, hygienic, and beautifully crafted costumes — rented with care.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              "Premium Quality Fabrics",
              "Professionally Cleaned",
              "All Sizes Available",
              "Authentic Designs",
              "Friendly Service",
            ].map((r) => (
              <li key={r} className="flex items-center gap-2 text-white/80 font-sans text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-white text-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl font-serif font-light text-[#1F2937] mb-3">
            Ready to find the right outfit?
          </h2>
          <p className="text-[#6B7280] font-sans mb-8">
            Browse hundreds of premium costumes available for rent.
          </p>
          <Link href="/catalogue">
            <span className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#E8177A] text-white font-sans font-semibold text-sm tracking-wide shadow-[0_4px_16px_rgba(232,23,122,0.35)] hover:shadow-[0_6px_22px_rgba(232,23,122,0.45)] hover:bg-[#c8126a] transition-all duration-200 cursor-pointer">
              Explore Our Collection
            </span>
          </Link>
        </div>
      </div>

    </div>
  );
}
