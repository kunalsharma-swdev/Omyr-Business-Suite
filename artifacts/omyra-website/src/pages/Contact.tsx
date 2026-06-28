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
  };

  return (
    <div className="bg-[#FFF8FC] dark:bg-[#09061A]">

      {/* Hero */}
      <div className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-white via-[#FFF8FC] to-[#FDF4FF] dark:from-[#09061A] dark:via-[#0F0C1E] dark:to-[#0D0920]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-bl from-[#E8177A]/8 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#7C3AED]/6 to-transparent blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 text-center">
          <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.4em] uppercase mb-5 font-medium">Reach Out</p>
          <h1 className="text-5xl md:text-6xl font-serif font-light text-[#1F2937] dark:text-[#F1F0F5] mb-6">
            Get in <span className="italic text-[#E8177A]">Touch</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#E8177A] to-[#7C3AED] mx-auto mb-6 rounded-full" />
          <p className="text-[#6B7280] dark:text-[#8B8499] font-sans text-base max-w-xl mx-auto leading-relaxed">
            We're here to help you find the perfect costume. Reach out for availability, sizing, or any queries.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl pb-20 -mt-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Contact info */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-[#0F0C1E] rounded-2xl p-7 border border-[#E5E7EB]/60 dark:border-[#23203A]/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <h2 className="text-2xl font-serif font-light text-[#1F2937] dark:text-[#F1F0F5] mb-3">Contact Information</h2>
              <p className="text-[#6B7280] dark:text-[#8B8499] text-sm leading-relaxed font-sans">
                The fastest way to reach us is via WhatsApp. We typically respond within a few hours during business days.
              </p>
            </div>

            {[
              {
                icon: Phone, color: "#E8177A",
                title: "Phone & WhatsApp", info: "+91 81975 47412",
                action: <WhatsAppButton text="Chat with Us" variant="outline" className="rounded-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-sm" />,
              },
              {
                icon: Instagram, color: "#E1306C",
                title: "Instagram", info: "@omyra_fancydress_boutique",
                action: (
                  <Button asChild variant="outline" className="rounded-full border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C] hover:text-white text-sm dark:border-[#E1306C]/70 dark:text-[#E1306C]/90">
                    <a href="https://instagram.com/omyra_fancydress_boutique" target="_blank" rel="noopener noreferrer">Follow Us</a>
                  </Button>
                ),
              },
              {
                icon: MapPin, color: "#2563EB",
                title: "Visit Boutique", info: "Visit our store to try on costumes and explore our full collection.",
                action: (
                  <Button asChild variant="outline" className="rounded-full border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white text-sm dark:border-[#2563EB]/70 dark:text-[#2563EB]/90">
                    <a href="https://maps.google.com/?q=Omyra+Fancy+Dress+Boutique" target="_blank" rel="noopener noreferrer">Get Directions</a>
                  </Button>
                ),
              },
            ].map(({ icon: Icon, color, title, info, action }) => (
              <div key={title} className="flex items-start gap-4 p-6 bg-white dark:bg-[#0F0C1E] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#23203A]/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-light text-[#1F2937] dark:text-[#F1F0F5] mb-1">{title}</h3>
                  <p className="text-[#6B7280] dark:text-[#8B8499] text-sm mb-4">{info}</p>
                  {action}
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="bg-white dark:bg-[#0F0C1E] p-8 md:p-10 rounded-3xl border border-[#E5E7EB]/60 dark:border-[#23203A]/80 shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            {formSubmitted ? (
              <div className="text-center py-12 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-light text-[#1F2937] dark:text-[#F1F0F5] mb-3">Message Received!</h3>
                <p className="text-[#6B7280] dark:text-[#8B8499] text-sm mb-8 leading-relaxed">
                  Thank you for reaching out. We will contact you on WhatsApp shortly.
                </p>
                <Button onClick={() => setFormSubmitted(false)} variant="outline" className="rounded-full border-[#E8177A] text-[#E8177A] hover:bg-[#E8177A] hover:text-white">
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif font-light text-[#1F2937] dark:text-[#F1F0F5] mb-6">Send an Enquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-[#1F2937] dark:text-[#F1F0F5] font-sans">Full Name</label>
                    <Input id="name" required placeholder="John Doe" className="rounded-xl border-[#E5E7EB] dark:border-[#23203A] dark:bg-[#16112A] dark:text-[#F1F0F5] dark:placeholder-[#8B8499] focus:border-[#E8177A]" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-[#1F2937] dark:text-[#F1F0F5] font-sans">Phone / WhatsApp Number</label>
                    <Input id="phone" type="tel" required placeholder="+91 98765 43210" className="rounded-xl border-[#E5E7EB] dark:border-[#23203A] dark:bg-[#16112A] dark:text-[#F1F0F5] dark:placeholder-[#8B8499] focus:border-[#E8177A]" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-[#1F2937] dark:text-[#F1F0F5] font-sans">Your Message or Requirements</label>
                    <Textarea
                      id="message" required
                      placeholder="I am looking for a Krishna costume for a 5-year-old..."
                      className="min-h-[130px] rounded-xl border-[#E5E7EB] dark:border-[#23203A] dark:bg-[#16112A] dark:text-[#F1F0F5] dark:placeholder-[#8B8499] focus:border-[#E8177A] resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-xl bg-[#E8177A] text-white font-sans font-semibold text-sm tracking-wide shadow-[0_4px_16px_rgba(232,23,122,0.3)] hover:bg-[#c8126a] hover:shadow-[0_6px_22px_rgba(232,23,122,0.4)] transition-all duration-200">
                    Send Enquiry
                  </button>
                  <p className="text-xs text-center text-[#6B7280] dark:text-[#8B8499] font-sans">We will reply to your enquiry via WhatsApp.</p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#2563EB]" />
            </div>
            <h2 className="text-2xl font-serif font-light text-[#1F2937] dark:text-[#F1F0F5]">Find Our Store</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] dark:border-[#23203A] shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] w-full h-[400px]">
            <iframe
              title="Omyra Fancy Dress Store Location"
              src="https://maps.google.com/maps?q=Omyra+Fancy+Dress+%26+School+Uniforms&output=embed&z=15"
              width="100%" height="100%" style={{ border: 0 }}
              loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 text-center">
            <a href="https://maps.google.com/?q=Omyra+Fancy+Dress+%26+School+Uniforms" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#2563EB] font-sans text-sm font-medium hover:underline">
              <MapPin className="w-4 h-4" /> Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
