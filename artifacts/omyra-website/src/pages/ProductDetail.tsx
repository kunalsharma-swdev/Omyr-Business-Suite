import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { useProduct, useProductImages } from "@/hooks/use-supabase";
import { getProductImageUrl } from "@/lib/supabase";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ShareWhatsAppButton } from "@/components/ShareWhatsAppButton";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, ChevronLeft, Home, AlertCircle, Tag, Sparkles } from "lucide-react";
import { SiInstagram } from "react-icons/si";

export default function ProductDetail() {
  const params = useParams<{ name: string }>();
  const productName = params.name ? decodeURIComponent(params.name) : "";
  const { data: product, isLoading, error } = useProduct(productName);
  const { data: productImages } = useProductImages(productName);

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (product) {
      document.title = `${product.product_name} | Omyra Fancy Dress`;
    }
  }, [product]);

  // Reset active index when product changes
  useEffect(() => { setActiveIndex(0); }, [productName]);

  function formatName(name: string) {
    return name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[#FFF8FC] dark:bg-[#09061A]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-10 mt-8">
            <Skeleton className="w-full lg:w-1/2 aspect-[3/4] rounded-3xl" />
            <div className="w-full lg:w-1/2 space-y-5 pt-4">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-10 w-3/4 rounded-xl" />
              <Skeleton className="h-28 w-full rounded-xl" />
              <Skeleton className="h-12 w-52 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#FFF8FC] dark:bg-[#09061A] flex items-center justify-center">
        <div className="text-center p-12 bg-white dark:bg-[#0F0C1E] border border-[#E5E7EB] dark:border-[#23203A] rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] max-w-lg mx-auto">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-serif font-light text-[#1F2937] dark:text-[#F1F0F5] mb-2">Product Not Found</h2>
          <p className="text-[#6B7280] dark:text-[#8B8499] font-sans text-sm mb-8">
            The product you're looking for might have been removed or the link is broken.
          </p>
          <Link href="/catalogue">
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#E8177A] text-white font-sans font-semibold text-sm shadow-[0_4px_16px_rgba(232,23,122,0.3)] hover:bg-[#c8126a] transition-all duration-200 cursor-pointer">
              Return to Catalogue
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const encodedProductName = encodeURIComponent(product.product_name);
  const whatsappMessage = `Hi, I am interested in renting ${encodedProductName}. Please share availability and details.`;

  // Build gallery: use product_images if available, else fall back to cover image
  const galleryImages: string[] =
    productImages && productImages.length > 0
      ? productImages.map((img) => img.image_name)
      : product.image_name
      ? [product.image_name]
      : [];

  const hasMultiple = galleryImages.length > 1;

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(galleryImages.length - 1, i + 1));

  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
    setTouchStartX(null);
  };

  return (
    <div className="pt-24 pb-20 bg-[#FFF8FC] dark:bg-[#09061A]">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">

        {/* Breadcrumbs */}
        <nav className="flex items-center text-xs font-medium text-[#6B7280] dark:text-[#8B8499] mb-8 overflow-x-auto whitespace-nowrap pb-1 gap-1.5 font-sans">
          <Link href="/" className="hover:text-[#E8177A] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#E5E7EB] dark:text-[#23203A]" />
          <Link href="/catalogue" className="hover:text-[#E8177A] transition-colors">Catalogue</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#E5E7EB] dark:text-[#23203A]" />
          <Link href={`/catalogue/${encodeURIComponent(product.category)}`} className="hover:text-[#E8177A] transition-colors">
            {formatName(product.category)}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#E5E7EB] dark:text-[#23203A]" />
          <span className="text-[#1F2937] dark:text-[#F1F0F5] font-medium truncate max-w-[200px]">{formatName(product.product_name)}</span>
        </nav>

        <div className="bg-white dark:bg-[#0F0C1E] rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)] border border-[#E5E7EB]/60 dark:border-[#23203A]/80 overflow-hidden">
          <div className="flex flex-col lg:flex-row">

            {/* ── Image Gallery ── */}
            <div className="w-full lg:w-[48%] flex flex-col bg-gradient-to-br from-[#FFF8FC] dark:from-[#16112A] to-[#F3E8FF] dark:to-[#0F0C1E]">

              {/* Main image */}
              <div
                className="relative flex items-center justify-center min-h-[380px] lg:min-h-[520px] overflow-hidden select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {galleryImages.length > 0 ? (
                  <img
                    key={activeIndex}
                    src={getProductImageUrl(galleryImages[activeIndex])}
                    alt={`${formatName(product.product_name)} — image ${activeIndex + 1}`}
                    className="w-full h-full object-cover animate-in fade-in duration-300"
                    style={{ maxHeight: "560px" }}
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-[#6B7280] dark:text-[#8B8499] py-20">
                    <Sparkles className="w-10 h-10 text-[#E5E7EB] dark:text-[#23203A]" />
                    <span className="font-sans text-sm">No image available</span>
                  </div>
                )}

                {/* Prev / Next arrows — only when multiple images */}
                {hasMultiple && (
                  <>
                    <button
                      onClick={goPrev}
                      disabled={activeIndex === 0}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-[#0F0C1E]/90 backdrop-blur-sm shadow-md flex items-center justify-center text-[#1F2937] dark:text-[#F1F0F5] hover:bg-white dark:hover:bg-[#16112A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goNext}
                      disabled={activeIndex === galleryImages.length - 1}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-[#0F0C1E]/90 backdrop-blur-sm shadow-md flex items-center justify-center text-[#1F2937] dark:text-[#F1F0F5] hover:bg-white dark:hover:bg-[#16112A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Dot indicators — mobile only, multiple images */}
                {hasMultiple && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-200 ${i === activeIndex ? "w-5 bg-white shadow" : "w-1.5 bg-white/50"}`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 dark:bg-[#0F0C1E]/95 backdrop-blur-sm text-[#E8177A] font-sans text-[10px] font-bold tracking-[0.18em] uppercase rounded-full shadow-sm">
                    <Tag className="w-3 h-3" />
                    {formatName(product.category)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1.5 bg-[#E8177A] text-white font-sans text-[10px] font-bold tracking-[0.15em] uppercase rounded-full shadow-sm">
                    For Rent
                  </span>
                </div>

                {/* Image counter badge — multiple images */}
                {hasMultiple && (
                  <div className="absolute bottom-3 right-3 hidden lg:block">
                    <span className="px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white font-sans text-[11px] rounded-full">
                      {activeIndex + 1} / {galleryImages.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail strip — only when multiple images */}
              {hasMultiple && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-white/60 dark:bg-[#0F0C1E]/60 border-t border-[#E5E7EB]/60 dark:border-[#23203A]/60 scrollbar-thin">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        i === activeIndex
                          ? "border-[#E8177A] shadow-[0_0_0_2px_rgba(232,23,122,0.2)]"
                          : "border-transparent opacity-50 hover:opacity-80 hover:border-[#E5E7EB] dark:hover:border-[#23203A]"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img
                        src={getProductImageUrl(img)}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="w-full lg:w-[52%] p-8 md:p-12 flex flex-col">
              <h1 className="text-3xl md:text-4xl font-serif font-light text-[#1F2937] dark:text-[#F1F0F5] mb-5 leading-tight">
                {formatName(product.product_name)}
              </h1>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#E8177A] to-[#7C3AED] rounded-full mb-6" />

              {product.description && (
                <p className="text-[#6B7280] dark:text-[#8B8499] leading-relaxed font-sans text-base mb-8">
                  {product.description}
                </p>
              )}

              {/* Rental notice */}
              <div className="bg-gradient-to-r from-[#FFF8FC] dark:from-[#16112A] to-[#F3E8FF] dark:to-[#0F0C1E] border border-[#E8177A]/15 dark:border-[#E8177A]/20 rounded-2xl p-5 mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E8177A]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#E8177A]" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-[#1F2937] dark:text-[#F1F0F5] text-sm mb-1">Available for Rental · 24-Hour Period</h4>
                    <p className="text-[#6B7280] dark:text-[#8B8499] text-sm leading-relaxed">
                      This costume is available for rent only. The rental period is <span className="font-medium text-[#1F2937] dark:text-[#F1F0F5]">24 hours</span> — the costume must be returned the next day. Reach out on WhatsApp or Instagram for pricing and to book your dates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery options */}
              <div className="flex gap-3 mb-5">
                <div className="flex-1 flex items-center gap-2.5 p-3.5 bg-[#FFF8FC] dark:bg-[#16112A] rounded-xl border border-[#E5E7EB]/80 dark:border-[#23203A]/80">
                  <div className="w-7 h-7 rounded-full bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#7C3AED]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <p className="text-[#1F2937] dark:text-[#F1F0F5] font-sans text-xs font-semibold">Store Pickup</p>
                    <p className="text-[#9CA3AF] dark:text-[#6B6480] font-sans text-[11px]">Collect from our boutique</p>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-2.5 p-3.5 bg-[#FFF8FC] dark:bg-[#16112A] rounded-xl border border-[#E5E7EB]/80 dark:border-[#23203A]/80">
                  <div className="w-7 h-7 rounded-full bg-[#E8177A]/10 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#E8177A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2L19 8M10 12v4M14 12v4" /></svg>
                  </div>
                  <div>
                    <p className="text-[#1F2937] dark:text-[#F1F0F5] font-sans text-xs font-semibold">Home Delivery</p>
                    <p className="text-[#9CA3AF] dark:text-[#6B6480] font-sans text-[11px]">Delivered to your door</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {["Premium Quality", "Sanitized", "All Sizes"].map((b) => (
                  <div key={b} className="text-center p-3 bg-[#FFF8FC] dark:bg-[#16112A] rounded-xl border border-[#E5E7EB]/80 dark:border-[#23203A]/80">
                    <p className="text-[#1F2937] dark:text-[#F1F0F5] font-sans text-xs font-semibold">{b}</p>
                  </div>
                ))}
              </div>

              <div className="mt-auto space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <WhatsAppButton
                    text="Enquire on WhatsApp"
                    message={whatsappMessage}
                    className="rounded-full px-7 py-3 text-sm font-semibold shadow-[0_4px_16px_rgba(37,211,102,0.3)] flex-1"
                  />
                  <a
                    href="https://instagram.com/omyra_fancydress_boutique"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold rounded-full border-2 border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all duration-200 flex-1"
                  >
                    <SiInstagram className="w-4 h-4" />
                    Instagram
                  </a>
                </div>
                <div className="pt-1 border-t border-[#E5E7EB] dark:border-[#23203A]">
                  <p className="text-[#9CA3AF] dark:text-[#6B6480] font-sans text-xs mb-2">Share this costume with family or friends</p>
                  <ShareWhatsAppButton
                    title={formatName(product.product_name)}
                    variant="full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href={`/catalogue/${encodeURIComponent(product.category)}`}>
            <span className="inline-flex items-center gap-2 text-[#6B7280] dark:text-[#8B8499] hover:text-[#E8177A] font-sans text-sm font-medium transition-colors duration-200 cursor-pointer group">
              <ChevronRight className="w-4 h-4 rotate-180 transition-transform duration-200 group-hover:-translate-x-1" />
              More {formatName(product.category)} costumes
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
