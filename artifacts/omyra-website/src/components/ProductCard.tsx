import { Link } from "wouter";
import { getProductImageUrl } from "@/lib/supabase";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductCardProps {
  productName: string;
  category: string;
  description: string;
  imageName: string;
}

function formatName(name: string) {
  return name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function ProductCard({
  productName,
  category,
  description,
  imageName,
}: ProductCardProps) {
  return (
    <Link href={`/product/${encodeURIComponent(productName)}`}>
      <div
        data-testid={`card-product-${productName}`}
        className="group cursor-pointer overflow-hidden h-full flex flex-col border border-border bg-white hover:shadow-lg transition-all duration-500"
      >
        <div className="relative overflow-hidden bg-muted">
          <AspectRatio ratio={3 / 4}>
            {imageName ? (
              <img
                src={getProductImageUrl(imageName)}
                alt={productName}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-muted-foreground font-sans text-sm">
                  No Image
                </span>
              </div>
            )}
            <div className="absolute top-0 left-0 right-0 p-4">
              <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-primary font-sans text-[10px] tracking-[0.2em] uppercase">
                {formatName(category)}
              </span>
            </div>
          </AspectRatio>
        </div>
        <div className="p-5 flex-grow flex flex-col border-t border-border">
          <h3 className="font-serif text-2xl font-light text-foreground mb-2 line-clamp-2 leading-tight">
            {formatName(productName)}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-auto font-sans font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
