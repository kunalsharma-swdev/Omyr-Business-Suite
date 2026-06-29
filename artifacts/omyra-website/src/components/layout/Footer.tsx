import { Link } from "wouter";
import { Instagram, MapPin, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { getLogoUrl } from "@/lib/supabase";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A0D2E] dark:bg-[#07040F] text-white pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">

          <div className="space-y-5">
            <img
              src={getLogoUrl()}
              alt="Omyra Logo"
              className="h-9 w-auto object-contain brightness-0 invert opacity-90"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const sibling = e.currentTarget.parentElement?.querySelector(".logo-text");
                if (sibling) (sibling as HTMLElement).classList.remove("hidden");
              }}
            />
            <span className="logo-text hidden font-serif text-2xl font-light text-white">Omyra</span>
            <p className="text-white/50 leading-relaxed font-sans text-sm font-light">
              Premium fancy dress and school uniform rentals for every celebration — crafted with care.
            </p>
            <div className="flex gap-2.5 pt-1">
              <a
                href="https://instagram.com/omyra_fancydress_boutique"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#E8177A] hover:text-[#E8177A] transition-all duration-300 text-white/50"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918197547412"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300 text-white/50"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/35 mb-6 font-medium">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Catalogue", href: "/catalogue" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white font-sans text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#E8177A] group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/35 mb-6 font-medium">
              Occasions
            </h3>
            <ul className="space-y-3">
              {[
                "School Functions",
                "Diwali & Festivals",
                "Janmashtami",
                "Independence Day",
                "Christmas",
              ].map((occasion) => (
                <li key={occasion} className="text-white/40 font-sans text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8177A]/50 shrink-0" />
                  {occasion}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/35 mb-6 font-medium">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E8177A]/70 shrink-0 mt-0.5" />
                <span className="text-white/50 font-sans text-sm">+91 81975 47412</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E8177A]/70 shrink-0 mt-0.5" />
                <span className="text-white/50 font-sans text-sm">
                  Visit our boutique for the best rental experience.
                </span>
              </li>
              <li className="flex flex-col gap-2">
                <a
                  href="https://wa.me/918197547412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-1 px-4 py-2.5 rounded-full border border-[#25D366]/40 text-[#25D366]/80 text-xs font-sans font-medium hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-200"
                >
                  <SiWhatsapp className="w-3.5 h-3.5" />
                  WhatsApp Us
                </a>
                <a
                  href="https://ig.me/m/omyra_fancydress_boutique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E1306C]/40 text-[#E1306C]/80 text-xs font-sans font-medium hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all duration-200"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  Instagram DM
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-sans">
            &copy; {currentYear} Omyra Fancy Dress & School Uniforms. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-sans tracking-wider">
            All products available for rent only.
          </p>
        </div>
      </div>
    </footer>
  );
}
