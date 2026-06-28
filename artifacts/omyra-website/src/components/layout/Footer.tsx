import { Link } from "wouter";
import { Instagram, MapPin, Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { getLogoUrl } from "@/lib/supabase";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09000f] text-white/50 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 pb-16 border-b border-white/10">
          <div className="space-y-6">
            <img
              src={getLogoUrl()}
              alt="Omyra Logo"
              className="h-10 w-auto object-contain brightness-0 invert opacity-80"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement
                  ?.querySelector(".logo-text")
                  ?.classList.remove("hidden");
              }}
            />
            <span className="logo-text hidden font-serif text-2xl font-light text-white">
              Omyra
            </span>
            <p className="text-white/30 leading-relaxed font-sans text-sm font-light">
              Premium fancy dress and school uniform rentals for every
              celebration — crafted with care.
            </p>
            <div className="flex gap-2.5 pt-1">
              <a
                href="https://instagram.com/omyra_fancydress_boutique"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 text-white/40"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/918197547412"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/15 flex items-center justify-center hover:border-[#25D366] hover:text-[#25D366] transition-all duration-300 text-white/40"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/25 mb-8">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Catalogue", href: "/catalogue" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white font-sans text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/25 mb-8">
              Occasions
            </h3>
            <ul className="space-y-4">
              {[
                "School Functions",
                "Diwali & Festivals",
                "Janmashtami",
                "Independence Day",
                "Christmas",
              ].map((occasion) => (
                <li
                  key={occasion}
                  className="text-white/35 font-sans text-sm flex items-center gap-3"
                >
                  <span className="w-3 h-px bg-primary/50 shrink-0" />
                  {occasion}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/25 mb-8">
              Get in Touch
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                <span className="text-white/40 font-sans text-sm">
                  +91 81975 47412
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                <span className="text-white/40 font-sans text-sm">
                  Visit our boutique for the best rental experience.
                </span>
              </li>
              <li>
                <a
                  href="https://wa.me/918197547412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 border border-white/15 text-white/50 text-xs font-sans tracking-[0.15em] uppercase hover:border-primary hover:text-primary transition-all duration-300"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-sans tracking-wider">
            &copy; {currentYear} Omyra Fancy Dress & School Uniforms. All rights
            reserved.
          </p>
          <p className="text-white/15 text-xs font-sans tracking-wider">
            All products available for rent only.
          </p>
        </div>
      </div>
    </footer>
  );
}
