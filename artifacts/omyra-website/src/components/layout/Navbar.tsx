import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { getLogoUrl } from "@/lib/supabase";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Catalogue", href: "/catalogue" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.08)] py-2.5"
            : "bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] py-3.5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 z-50 group">
              <img
                src={getLogoUrl()}
                alt="Omyra Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const sibling = e.currentTarget.parentElement?.querySelector(".logo-text");
                  if (sibling) (sibling as HTMLElement).classList.remove("hidden");
                }}
              />
              <span className="logo-text hidden font-serif text-2xl font-light text-[#1F2937]">
                Omyra
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <ul className="flex gap-7">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`font-sans text-sm font-medium tracking-wide transition-all duration-200 relative group py-1 ${
                        location === link.href
                          ? "text-[#E8177A]"
                          : "text-[#6B7280] hover:text-[#1F2937]"
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-[#E8177A] rounded-full transition-all duration-300 ${
                          location === link.href ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/catalogue">
                <span className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#E8177A] text-white text-xs font-sans font-semibold tracking-[0.12em] uppercase hover:bg-[#c8126a] transition-all duration-200 shadow-[0_2px_12px_rgba(232,23,122,0.35)] hover:shadow-[0_4px_16px_rgba(232,23,122,0.45)] cursor-pointer">
                  Browse Rentals
                </span>
              </Link>
            </div>

            <button
              className="md:hidden z-50 w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FFF8FC] transition-colors text-[#1F2937]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6 pb-8">
            <ul className="flex flex-col space-y-1 mb-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`block py-3.5 px-4 rounded-xl font-sans text-lg font-light transition-colors duration-200 ${
                      location === link.href
                        ? "text-[#E8177A] bg-[#FFF8FC]"
                        : "text-[#1F2937] hover:bg-[#FFF8FC]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/catalogue" className="mt-auto">
              <span className="flex items-center justify-center w-full py-3.5 rounded-full bg-[#E8177A] text-white font-sans font-semibold tracking-wide text-sm cursor-pointer shadow-[0_4px_16px_rgba(232,23,122,0.35)]">
                Browse Rentals
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
