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
    <div className="min-h-screen bg-[#FFF8FC]">

      {/* Hero */}
      <div className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-white via-[#FFF8FC] to-[#FDF4FF]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-bl from-[#E8177A]/8 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#7C3AED]/6 to-transparent blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 text-center">
          <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.4em] uppercase mb-5 font-medium">
            Reach Out
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-light text-[#1F2937] mb-6">
            Get in <span className="italic text-[#E8177A]">Touch</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#E8177A] to-[#7C3AED] mx-auto mb-6 rounded-full" />
          <p className="text-[#6B7280] font-sans text-base max-w-xl mx-auto leading-relaxed">
            We're here to help you find the perfect costume. Reach out for availability, sizing, or any queries.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl pb-20 -mt-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Contact info */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-7 border border-[#E5E7EB]/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-2xl font-serif font-light text-[#1F2937] mb-3">Contact Information</h2>
              <p className="text-[#6B7280] text-sm leading-relaxed font-sans">
                The fastest way to reach us is via WhatsApp. We typically respond within a few hours during business days.
              </p>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E5E7EB]/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)] group hover:shadow-[0_4px_20px_rgba(232,23,122,0.1)] hover:border-[#E8177A]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#E8177A]/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#E8177A]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-light text-[#1F2937] mb-1">Phone & WhatsApp</h3>
                <p className="text-[#6B7280] text-sm mb-4">+91 81975 47412</p>
                <WhatsAppButton text="Chat with Us" variant="outline" className="rounded-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-sm" />
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E5E7EB]/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)] group hover:shadow-[0_4px_20px_rgba(225,48,108,0.1)] hover:border-[#E1306C]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#E1306C]/10 flex items-center justify-center shrink-0">
                <Instagram className="w-5 h-5 text-[#E1306C]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-light text-[#1F2937] mb-1">Instagram</h3>
                <p className="text-[#6B7280] text-sm mb-4">@omyra_fancydress_boutique</p>
                <Button asChild variant="outline" className="rounded-full border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C] hover:text-white text-sm">
                  <a href="https://instagram.com/omyra_fancydress_boutique" target="_blank" rel="noopener noreferrer">
                    Follow Us
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E5E7EB]/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)] group hover:shadow-[0_4px_20px_rgba(37,99,235,0.1)] hover:border-[#2563EB]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-light text-[#1F2937] mb-1">Visit Boutique</h3>
                <p className="text-[#6B7280] text-sm mb-4">Visit our store to try on costumes and explore our full collection.</p>
                <Button asChild variant="outline" className="rounded-full border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white text-sm">
                  <a href="https://maps.google.com/?q=Omyra+Fancy+Dress+Boutique" target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#E5E7EB]/60 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            {formSubmitted ? (
              <div className="text-center py-12 animate-in zoom-in duration-500">
                <div className="w-18 h-18 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 w-20 h-20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-light text-[#1F2937] mb-3">Message Received!</h3>
                <p className="text-[#6B7280] text-sm mb-8 leading-relaxed">
                  Thank you for reaching out. We will contact you on WhatsApp shortly to assist with your request.
                </p>
                <Button onClick={() => setFormSubmitted(false)} variant="outline" className="rounded-full border-[#E8177A] text-[#E8177A] hover:bg-[#E8177A] hover:text-white">
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif font-light text-[#1F2937] mb-6">Send an Enquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-[#1F2937] font-sans">Full Name</label>
                    <Input id="name" required placeholder="John Doe" className="rounded-xl border-[#E5E7EB] focus:border-[#E8177A] focus:ring-[#E8177A]/20" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-[#1F2937] font-sans">Phone / WhatsApp Number</label>
                    <Input id="phone" type="tel" required placeholder="+91 98765 43210" className="rounded-xl border-[#E5E7EB] focus:border-[#E8177A] focus:ring-[#E8177A]/20" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-[#1F2937] font-sans">Your Message or Requirements</label>
                    <Textarea
                      id="message"
                      required
                      placeholder="I am looking for a Krishna costume for a 5-year-old..."
                      className="min-h-[130px] rounded-xl border-[#E5E7EB] focus:border-[#E8177A] focus:ring-[#E8177A]/20 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#E8177A] text-white font-sans font-semibold text-sm tracking-wide shadow-[0_4px_16px_rgba(232,23,122,0.3)] hover:bg-[#c8126a] hover:shadow-[0_6px_22px_rgba(232,23,122,0.4)] transition-all duration-200"
                  >
                    Send Enquiry
                  </button>
                  <p className="text-xs text-center text-[#6B7280] font-sans">
                    We will reply to your enquiry via WhatsApp.
                  </p>
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
            <h2 className="text-2xl font-serif font-light text-[#1F2937]">Find Our Store</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.08)] w-full h-[400px]">
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
              className="inline-flex items-center gap-2 text-[#2563EB] font-sans text-sm font-medium hover:underline"
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
