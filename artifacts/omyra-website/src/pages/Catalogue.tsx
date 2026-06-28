import { useEffect } from "react";
import { useCategories } from "@/hooks/use-supabase";
import { CategoryCard } from "@/components/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Catalogue() {
  useEffect(() => {
    document.title = "Costume Catalogue | Omyra Fancy Dress";
  }, []);

  const { data: categories, isLoading, error } = useCategories();

  return (
    <div className="min-h-screen bg-[#FFF8FC]">

      {/* Hero */}
      <div className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-br from-white via-[#FFF8FC] to-[#FDF4FF]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-bl from-[#E8177A]/8 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#7C3AED]/6 to-transparent blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10 text-center">
          <p className="text-[#E8177A] font-sans text-[11px] tracking-[0.4em] uppercase mb-5 font-medium">
            Rental Boutique
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-light text-[#1F2937] mb-5 leading-tight">
            Our <span className="italic text-[#E8177A]">Catalogue</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#E8177A] to-[#7C3AED] mx-auto mb-5 rounded-full" />
          <p className="text-[#6B7280] font-sans text-base max-w-lg mx-auto leading-relaxed">
            Explore our diverse collection of rental costumes for every celebration.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[220px] w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4 rounded-full" />
                <Skeleton className="h-4 w-1/2 rounded-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-[#E8177A]/5 border border-[#E8177A]/20 text-[#E8177A] rounded-2xl max-w-lg mx-auto">
            <h2 className="text-xl font-serif font-light mb-2">Couldn't load categories</h2>
            <p className="font-sans text-sm">Please try refreshing the page.</p>
          </div>
        ) : categories && categories.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-[#6B7280] font-sans text-sm">
                <span className="font-semibold text-[#1F2937]">{categories.length}</span> categories available
              </p>
              <p className="text-[#6B7280] font-sans text-xs tracking-wider uppercase">All products for rent</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, i) => (
                <div
                  key={category.id}
                  className="animate-in fade-in zoom-in duration-500 fill-mode-both"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <CategoryCard
                    name={category.name}
                    imageName={category.image_name}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center p-16 bg-white rounded-2xl border border-[#E5E7EB]">
            <h2 className="text-xl font-serif font-light text-[#6B7280]">No categories found.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
