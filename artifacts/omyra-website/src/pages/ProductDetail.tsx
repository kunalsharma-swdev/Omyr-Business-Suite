import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useProduct } from "@/hooks/use-supabase";
import { getProductImageUrl } from "@/lib/supabase";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Home, Info, AlertCircle } from "lucide-react";

export default function ProductDetail() {
  const params = useParams<{ name: string }>();
  const productName = params.name ? decodeURIComponent(params.name) : "";
  const { data: product, isLoading, error } = useProduct(productName);

  useEffect(() => {
    if (product) {
      document.title = `${product.product_name} | Omyra Fancy Dress`;
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 mt-8">
            <Skeleton className="w-full lg:w-1/2 aspect-[4/5] rounded-2xl" />
            <div className="w-full lg:w-1/2 space-y-6 pt-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-14 w-48 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-background flex items-center justify-center">
        <div className="text-center p-12 bg-white border border-border rounded-2xl shadow-sm max-w-lg mx-auto">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-8">The product you're looking for might have been removed or the link is broken.</p>
          <Link href="/catalogue" className="text-primary font-medium hover:underline">
            Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const encodedProductName = encodeURIComponent(product.product_name);
  const whatsappMessage = `Hi, I am interested in renting ${encodedProductName}. Please share availability and details.`;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm font-medium text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-primary flex items-center transition-colors">
            <Home className="w-4 h-4 mr-1" /> Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-border" />
          <Link href="/catalogue" className="hover:text-primary transition-colors">Catalogue</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-border" />
          <Link href={`/catalogue/${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-border" />
          <span className="text-foreground truncate max-w-[200px]">{product.product_name}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-md border border-border overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Section */}
            <div className="w-full lg:w-1/2 relative bg-muted flex items-center justify-center min-h-[400px]">
              {product.image_name ? (
                <img 
                  src={getProductImageUrl(product.image_name)} 
                  alt={product.product_name}
                  className="w-full h-full object-cover animate-in fade-in duration-700"
                />
              ) : (
                <span className="text-muted-foreground">No image available</span>
              )}
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-6 text-primary border-primary/30 bg-primary/5 px-3 py-1 text-sm rounded-full">
                {product.category}
              </Badge>
              
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                {product.product_name}
              </h1>
              
              <div className="prose prose-gray max-w-none mb-10">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description || "No description available for this item."}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-10 flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Rental Only</h4>
                  <p className="text-blue-800/80 text-sm">
                    This product is available for rent only. Contact us on WhatsApp for availability, pricing, and booking details.
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <WhatsAppButton 
                  text="Enquire on WhatsApp" 
                  message={whatsappMessage}
                  className="w-full sm:w-auto px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
