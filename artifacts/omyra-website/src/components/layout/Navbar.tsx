import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { getLogoUrl } from "@/lib/supabase";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";
  const isDark = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Catalogue", href: "/catalogue" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-lg border-b border-border py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 z-50">
            <img
              src={getLogoUrl()}
              alt="Omyra Logo"
              className="h-11 w-auto object-contain transition-all duration-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement
                  ?.querySelector(".logo-text")
                  ?.classList.remove("hidden");
              }}
            />
            <span
              className={`logo-text hidden font-serif text-2xl font-light transition-colors ${
                isDark ? "text-white" : "text-foreground"
              }`}
            >
              Omyra
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <ul className="flex gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`font-sans text-sm tracking-wide transition-all duration-300 relative group ${
                      location === link.href
                        ? isDark
                          ? "text-primary"
                          : "text-primary"
                        : isDark
                        ? "text-white/70 hover:text-white"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 ${
                        location === link.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/catalogue">
              <span
                className={`inline-flex items-center justify-center px-6 py-2.5 text-xs font-sans font-medium tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
                  isDark
                    ? "border border-white/30 text-white hover:bg-white hover:text-foreground"
                    : "border border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                Explore Rentals
              </span>
            </Link>
          </div>

          <button
            className={`md:hidden z-50 transition-colors ${
              isDark ? "text-white" : "text-foreground"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-400 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden pt-24`}
      >
        <div className="container mx-auto px-6 py-8 flex flex-col space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-3xl font-serif font-light border-b border-border py-5 ${
                location === link.href ? "text-primary" : "text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/catalogue">
            <span className="inline-flex items-center justify-center mt-10 px-8 py-3.5 bg-primary text-white text-xs font-sans font-medium tracking-[0.2em] uppercase w-full cursor-pointer">
              Explore Rentals
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
