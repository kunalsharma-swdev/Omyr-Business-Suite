import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Instagram, MapPin, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | Omyra Fancy Dress";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // In a real app this would send data to a backend
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="bg-[#09000f] text-white py-24 mb-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(232,23,122,0.18) 0%, transparent 60%)" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-primary/60 font-sans text-[11px] tracking-[0.4em] uppercase mb-6">
            Reach Out
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6">Get in Touch</h1>
          <div className="w-12 h-px bg-white/15 mx-auto mb-6" />
          <p className="text-white/40 font-sans text-base max-w-xl mx-auto font-light">
            We're here to help you find the perfect costume. Reach out for availability, sizing, or any queries.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Contact Information</h2>
              <p className="text-muted-foreground text-lg mb-8">
                The fastest way to reach us is via WhatsApp. We typically respond within a few hours during business days.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-border shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone & WhatsApp</h3>
                  <p className="text-muted-foreground mb-4">+91 81975 47412</p>
                  <WhatsAppButton text="Chat with Us" variant="outline" className="border-primary text-primary hover:bg-primary/5" />
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-border shadow-sm">
                <div className="w-12 h-12 bg-[#E1306C]/10 text-[#E1306C] rounded-full flex items-center justify-center shrink-0">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Instagram</h3>
                  <p className="text-muted-foreground mb-4">@omyra_fancydress_boutique</p>
                  <Button asChild variant="outline" className="border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C]/5">
                    <a href="https://instagram.com/omyra_fancydress_boutique" target="_blank" rel="noopener noreferrer">
                      Follow Us
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-border shadow-sm">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Visit Boutique</h3>
                  <p className="text-muted-foreground mb-4">Visit our store to try on costumes and explore our full collection.</p>
                  <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <a href="https://maps.google.com/?q=Omyra+Fancy+Dress+Boutique" target="_blank" rel="noopener noreferrer">
                      Get Directions
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-border shadow-lg">
            {formSubmitted ? (
              <div className="text-center py-16 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4 text-foreground">Message Received!</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Thank you for reaching out. We will contact you on WhatsApp shortly to assist with your request.
                </p>
                <Button onClick={() => setFormSubmitted(false)} variant="outline" className="rounded-full">
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Send an Enquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                    <Input id="name" required placeholder="John Doe" className="bg-background" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone / WhatsApp Number</label>
                    <Input id="phone" type="tel" required placeholder="+91 98765 43210" className="bg-background" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">Your Message or Requirements</label>
                    <Textarea 
                      id="message" 
                      required 
                      placeholder="I am looking for a Krishna costume for a 5-year-old..." 
                      className="min-h-[150px] bg-background resize-none" 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg rounded-xl transition-all hover:shadow-md">
                    Send Enquiry
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    We will reply to your enquiry via WhatsApp.
                  </p>
                </form>
              </>
            )}
          </div>

        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-primary shrink-0" />
            <h2 className="text-2xl font-serif font-bold text-foreground">Find Our Store</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border shadow-lg w-full h-[400px]">
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
          <div className="mt-4 text-center">
            <a
              href="https://maps.google.com/?q=Omyra+Fancy+Dress+%26+School+Uniforms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <MapPin className="w-4 h-4" />
              Open in Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
