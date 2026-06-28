import { useEffect } from "react";
import { Link } from "wouter";
import { useCategories } from "@/hooks/use-supabase";
import { CategoryCard } from "@/components/CategoryCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { getLogoUrl } from "@/lib/supabase";
import { 
  Sparkles, 
  ShoppingBag, 
  MessageCircle, 
  CalendarDays,
  CheckCircle2,
  Heart
} from "lucide-react";

export default function Home() {
  useEffect(() => {
    document.title = "Omyra Fancy Dress | Make Every Celebration Special";
  }, []);

  const { data: categories, isLoading, error } = useCategories();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-primary via-secondary to-blue-600">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-md p-4 rounded-2xl mb-8 animate-in fade-in zoom-in duration-700">
            <img 
              src={getLogoUrl()} 
              alt="Omyra Logo" 
              className="h-24 md:h-32 w-auto object-contain drop-shadow-xl"
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight animate-in slide-in-from-bottom-8 duration-700 delay-150">
            Make Every Celebration <span className="text-accent italic">Special</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-4 animate-in slide-in-from-bottom-8 duration-700 delay-300 font-medium">
            Premium Fancy Dress & School Uniform Rentals
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 animate-in slide-in-from-bottom-8 duration-700 delay-500">
            From Diwali to School Annual Days, we provide vibrant, high-quality costumes. 
            <span className="block mt-2 font-semibold text-accent">All products are available for rent only.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-700">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-full w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
              <Link href="/catalogue">Explore Catalogue</Link>
            </Button>
            <WhatsAppButton 
              text="Contact on WhatsApp" 
              className="px-8 py-6 text-lg rounded-full w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
            />
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground font-medium mb-8 uppercase tracking-widest text-sm">Perfect for every occasion</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { label: "Diwali", slug: "diwali" },
              { label: "Independence Day", slug: "independence_day" },
              { label: "Janmashtami", slug: "janmashtami" },
              { label: "Christmas", slug: "christmas" },
              { label: "School Events", slug: "school_events" },
              { label: "Annual Functions", slug: "annual_functions" },
            ].map(({ label, slug }) => (
              <Link key={slug} href={`/catalogue/${slug}`}>
                <span className="px-6 py-3 bg-background rounded-full text-foreground font-semibold border border-border shadow-sm flex items-center gap-2 cursor-pointer hover:border-primary hover:text-primary hover:shadow-md transition-all duration-200">
                  <Sparkles className="w-4 h-4 text-accent" />
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">Discover Our Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our wide range of beautifully crafted costumes ready to rent for your next event.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse aspect-[4/3]"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-destructive p-8 bg-destructive/10 rounded-xl">
              Failed to load categories. Please try refreshing.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories?.slice(0, 6).map((category) => (
                <CategoryCard 
                  key={category.id} 
                  name={category.name} 
                  imageName={category.image_name} 
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-8">
              <Link href="/catalogue">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Easy Rental Process</h2>
            <p className="text-lg text-muted-foreground">Getting the perfect costume is just a message away.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-[16.66%] right-[16.66%] h-0.5 bg-border -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-border">
              <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-inner">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">1. Browse</h3>
              <p className="text-muted-foreground">Explore our extensive catalogue and find the perfect costume for your occasion.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-border">
              <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-6 shadow-inner">
                <MessageCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">2. WhatsApp Enquiry</h3>
              <p className="text-muted-foreground">Found what you like? Click the WhatsApp button to check availability and sizing.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-border">
              <div className="w-20 h-20 rounded-full bg-purple-50 text-secondary flex items-center justify-center mb-6 shadow-inner">
                <CalendarDays className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-3">3. Rent & Celebrate</h3>
              <p className="text-muted-foreground">Confirm your booking, pick up your clean, pressed costume, and enjoy the event!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Why Families Choose Omyra</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                We believe that every child deserves to shine on their special day. 
                Our boutique focuses on providing high-quality, authentic, and hygienic 
                costumes so you can focus on making memories.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Premium Quality Fabrics & Materials",
                  "Professionally Cleaned & Sanitized",
                  "Wide Range of Sizes Available",
                  "Authentic Traditional Designs",
                  "Friendly Customer Service"
                ].map((reason, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="font-medium text-lg">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-white/10 flex items-center justify-center border border-white/20">
              {/* Fallback pattern block if no image is available, using a placeholder concept representing quality */}
              <div className="text-center p-8">
                <Heart className="w-24 h-24 text-primary mx-auto mb-6 opacity-80" />
                <h3 className="text-3xl font-serif font-bold text-accent mb-2">Quality Guaranteed</h3>
                <p className="text-white/90">Every costume tells a story</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to find the perfect costume?</h2>
              <p className="text-xl text-white/90 mb-10">
                Browse our collection online or reach out directly to check availability for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 rounded-full">
                  <Link href="/catalogue">Browse Catalogue</Link>
                </Button>
                <WhatsAppButton text="Message Us Now" className="px-8 rounded-full border border-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
