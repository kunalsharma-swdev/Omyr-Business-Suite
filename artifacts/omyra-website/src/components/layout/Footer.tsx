import { Link } from "wouter";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { getLogoUrl } from "@/lib/supabase";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t-4 border-primary mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="bg-white p-2 rounded-lg inline-block mb-2">
              <img 
                src={getLogoUrl()} 
                alt="Omyra Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.logo-text')?.classList.remove('hidden');
                }}
              />
              <span className="logo-text hidden font-serif font-bold text-xl text-primary px-2">Omyra</span>
            </div>
            <p className="text-secondary-foreground/80 leading-relaxed font-medium">
              Make Every Celebration Special. Premium fancy dress and school uniform rentals for all occasions.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://instagram.com/omyra_fancydress_boutique" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-secondary-foreground/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/catalogue" className="text-secondary-foreground/80 hover:text-white transition-colors">Catalogue</Link></li>
              <li><Link href="/about" className="text-secondary-foreground/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-secondary-foreground/80 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Occasions */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-6 text-white">Occasions</h3>
            <ul className="space-y-3">
              <li className="text-secondary-foreground/80">School Functions</li>
              <li className="text-secondary-foreground/80">Diwali & Festivals</li>
              <li className="text-secondary-foreground/80">Janmashtami Special</li>
              <li className="text-secondary-foreground/80">Independence Day</li>
              <li className="text-secondary-foreground/80">Christmas Celebrations</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold text-xl mb-6 text-white">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/80">+91 81975 47412</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/80">Visit our boutique for the best rental experience.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 text-center">
          <p className="text-secondary-foreground/60 text-sm">
            &copy; {currentYear} Omyra Fancy Dress & School Uniforms. All rights reserved. 
            Products available for rent only.
          </p>
        </div>
      </div>
    </footer>
  );
}
