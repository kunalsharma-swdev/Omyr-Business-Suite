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
      <div className="bg-secondary text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We're here to help you find the perfect costume for your event. Reach out to us for availability, sizing, or any other queries.
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
      </div>
    </div>
  );
}
