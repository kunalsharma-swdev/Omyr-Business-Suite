import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { getLogoUrl } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <img 
              src={getLogoUrl()} 
              alt="Omyra Logo" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                // Fallback text if logo fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.logo-text')?.classList.remove('hidden');
              }}
            />
            <span className="logo-text hidden font-serif font-bold text-2xl text-primary">Omyra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className={`font-medium transition-colors hover:text-primary ${
                      location === link.href ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6">
              <Link href="/catalogue">Explore Rentals</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden pt-24`}>
        <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-2xl font-serif border-b border-border pb-4 ${
                location === link.href ? "text-primary font-bold" : "text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="mt-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full w-full py-6 text-lg">
            <Link href="/catalogue">Explore Rentals</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
