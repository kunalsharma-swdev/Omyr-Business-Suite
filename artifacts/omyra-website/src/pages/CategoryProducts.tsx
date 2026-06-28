import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { useProducts } from "@/hooks/use-supabase";
import { ProductCard } from "@/components/ProductCard";
import { ShareWhatsAppButton } from "@/components/ShareWhatsAppButton";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, ArrowLeft, ShoppingBag } from "lucide-react";

export default function CategoryProducts() {
  const params = useParams<{ category: string }>();
  const decodedCategory = params.category ? decodeURIComponent(params.category) : "";
  const [page, setPage] = useState(1);
  const pageSize = 25;

  useEffect(() => {
    if (decodedCategory) {
      document.title = `${decodedCategory} Costumes | Omyra Fancy Dress`;
    }
  }, [decodedCategory]);

  const { data, isLoading, error } = useProducts(decodedCategory, page, pageSize);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  function formatName(name: string) {
    return name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  }

  return (
    <div className="min-h-screen bg-[#FFF8FC] dark:bg-[#09061A]">

      {/* Header */}
      <div className="relative pt-24 pb-12 bg-gradient-to-br from-white via-[#FFF8FC] to-[#FDF4FF] dark:from-[#09061A] dark:via-[#0F0C1E] dark:to-[#0D0920] border-b border-[#E5E7EB] dark:border-[#23203A]">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gradient-to-bl from-[#E8177A]/6 to-transparent blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-[#6B7280] dark:text-[#8B8499] hover:text-[#E8177A] font-sans text-sm font-medium transition-colors duration-200 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Catalogue
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.35em] uppercase mb-2 font-medium">Category</p>
              <h1 className="text-4xl md:text-5xl font-serif font-light text-[#1F2937] dark:text-[#F1F0F5] capitalize">
                {formatName(decodedCategory)}
              </h1>
              {!isLoading && data && (
                <p className="text-[#6B7280] dark:text-[#8B8499] mt-2 font-sans text-sm">
                  {data.products.length} of {data.totalCount} costumes available for rent
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#E8177A]/8 dark:bg-[#E8177A]/10 rounded-full border border-[#E8177A]/20">
                <ShoppingBag className="w-4 h-4 text-[#E8177A]" />
                <span className="text-[#E8177A] font-sans text-xs font-semibold tracking-wide">Rental Only</span>
              </div>
              <ShareWhatsAppButton
                title={formatName(decodedCategory)}
                subtitle="category"
                variant="pill"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[280px] w-full rounded-2xl" />
                <Skeleton className="h-5 w-3/4 rounded-full" />
                <Skeleton className="h-4 w-full rounded-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-[#E8177A]/5 border border-[#E8177A]/20 text-[#E8177A] rounded-2xl max-w-lg mx-auto">
            <h2 className="text-xl font-serif font-light mb-2">Failed to load products</h2>
            <p className="font-sans text-sm">Please try refreshing the page.</p>
          </div>
        ) : data && data.products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7">
              {data.products.map((product, i) => (
                <div
                  key={product.product_name}
                  className="animate-in fade-in slide-in-from-bottom-3 duration-400 fill-mode-both"
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <ProductCard
                    productName={product.product_name}
                    category={product.category}
                    description={product.description}
                    imageName={product.image_name}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-14 pt-8 border-t border-[#E5E7EB] dark:border-[#23203A]">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E5E7EB] dark:border-[#23203A] text-[#6B7280] dark:text-[#8B8499] font-sans text-sm font-medium hover:border-[#E8177A] hover:text-[#E8177A] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: Math.min(data.totalPages, 7) }, (_, i) => {
                    const p = i + 1;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                          page === p
                            ? "bg-[#E8177A] text-white shadow-[0_2px_8px_rgba(232,23,122,0.35)]"
                            : "text-[#6B7280] dark:text-[#8B8499] hover:bg-[#FFF8FC] dark:hover:bg-[#16112A] hover:text-[#E8177A]"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  {data.totalPages > 7 && (
                    <span className="text-[#6B7280] dark:text-[#8B8499] font-sans text-sm px-1">…{data.totalPages}</span>
                  )}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E5E7EB] dark:border-[#23203A] text-[#6B7280] dark:text-[#8B8499] font-sans text-sm font-medium hover:border-[#E8177A] hover:text-[#E8177A] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-[#0F0C1E] rounded-2xl border border-[#E5E7EB] dark:border-[#23203A] max-w-2xl mx-auto">
            <ShoppingBag className="w-12 h-12 text-[#E5E7EB] dark:text-[#23203A] mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-light text-[#1F2937] dark:text-[#F1F0F5] mb-3">No products found</h2>
            <p className="text-[#6B7280] dark:text-[#8B8499] font-sans text-sm mb-8 max-w-sm mx-auto">
              We currently don't have any products listed in this category online, but we might have them in store!
            </p>
            <Link href="/catalogue">
              <span className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#E8177A] text-white font-sans font-semibold text-sm shadow-[0_4px_16px_rgba(232,23,122,0.3)] hover:bg-[#c8126a] transition-all duration-200 cursor-pointer">
                Explore Other Categories
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
