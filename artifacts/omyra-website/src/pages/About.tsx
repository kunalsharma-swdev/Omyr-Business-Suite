import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Award, Clock } from "lucide-react";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Omyra Fancy Dress";
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      {/* Hero */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">About Omyra</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Bringing joy and authenticity to every celebration through premium fancy dress and school uniform rentals.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-lg border border-border -mt-32 relative z-20">
          <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Our Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
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

      {/* Values */}
      <div className="bg-white py-20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Our Commitment</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The pillars that make Omyra the preferred choice for families.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Premium Quality", desc: "No cheap synthetics. We use fabrics that look great on stage and feel comfortable on the skin." },
              { icon: Sparkles, title: "Immaculate Hygiene", desc: "Every costume is professionally cleaned and sanitized before it reaches your hands." },
              { icon: Users, title: "For Everyone", desc: "A wide variety of sizes ensuring a perfect fit for children of all ages." },
              { icon: Clock, title: "Easy Experience", desc: "A hassle-free process from browsing online to quick WhatsApp booking." }
            ].map((value, i) => (
              <div key={i} className="text-center p-8 bg-background rounded-2xl border border-border">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-serif font-bold text-secondary mb-6">Ready to find the right outfit?</h2>
        <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 text-lg">
          <Link href="/catalogue">Explore Our Collection</Link>
        </Button>
      </div>
    </div>
  );
}
