import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { useProducts } from "@/hooks/use-supabase";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

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

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-primary/10 py-12 mb-10">
        <div className="container mx-auto px-4">
          <Link href="/catalogue" className="inline-flex items-center text-primary font-medium hover:underline mb-6 transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalogue
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary capitalize">{decodedCategory}</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            {isLoading ? "Loading collection..." : `Showing ${data?.products.length || 0} products available for rent`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-4">
                <Skeleton className="h-[300px] w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-destructive/10 text-destructive rounded-2xl max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p>Failed to load products for this category. Please try again.</p>
          </div>
        ) : data && data.products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {data.products.map((product, i) => (
                <div key={product.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${i * 50}ms` }}>
                  <ProductCard 
                    id={product.id}
                    name={product.product_name}
                    category={product.category}
                    description={product.description}
                    imageName={product.image_name}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 mt-16 pt-8 border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <span className="text-sm font-medium text-muted-foreground">
                  Page {page} of {data.totalPages}
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                  className="rounded-full"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-border shadow-sm max-w-2xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">No products found</h2>
            <p className="text-muted-foreground mb-8">We currently don't have any products listed in this category online, but we might have them in store!</p>
            <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white">
              <Link href="/catalogue">Explore Other Categories</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
