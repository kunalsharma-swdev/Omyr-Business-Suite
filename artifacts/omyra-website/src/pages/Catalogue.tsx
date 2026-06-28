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
    <div className="min-h-screen pt-24 pb-20 bg-background">
      {/* Page Header */}
      <div className="bg-secondary text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Catalogue</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Explore our diverse collection of rental costumes for every celebration.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-destructive/10 text-destructive rounded-2xl max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-2">Oops!</h2>
            <p>We couldn't load the categories right now. Please try again later.</p>
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category) => (
              <div key={category.id} className="animate-in fade-in zoom-in duration-500 fill-mode-both" style={{ animationDelay: `${category.id * 50}ms` }}>
                <CategoryCard 
                  name={category.name} 
                  imageName={category.image_name} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-16 bg-white rounded-2xl border border-border">
            <h2 className="text-2xl font-bold text-muted-foreground">No categories found.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
