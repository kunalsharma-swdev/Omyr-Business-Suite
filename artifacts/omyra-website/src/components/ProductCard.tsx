import { Link } from "wouter";
import { getProductImageUrl } from "@/lib/supabase";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MessageCircle } from "lucide-react";

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

export function ProductCard({ productName, category, description, imageName }: ProductCardProps) {
  return (
    <Link href={`/product/${encodeURIComponent(productName)}`}>
      <div
        data-testid={`card-product-${productName}`}
        className="group cursor-pointer overflow-hidden h-full flex flex-col bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition-all duration-400 border border-[#E5E7EB]/60"
      >
        <div className="relative overflow-hidden bg-[#FFF8FC] rounded-t-2xl">
          <AspectRatio ratio={3 / 4}>
            {imageName ? (
              <img
                src={getProductImageUrl(imageName)}
                alt={productName}
                className="object-cover w-full h-full transition-transform duration-600 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF8FC] to-[#F3E8FF]">
                <span className="text-[#6B7280] font-sans text-sm">No Image</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            <div className="absolute top-3 left-3">
              <span className="inline-block px-3 py-1 bg-white/95 backdrop-blur-sm text-[#E8177A] font-sans text-[10px] font-semibold tracking-[0.18em] uppercase rounded-full shadow-sm">
                {formatName(category)}
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="inline-block px-3 py-1 bg-[#E8177A] text-white font-sans text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full shadow-sm">
                Rent
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2.5 shadow-md">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span className="text-[#1F2937] font-sans text-xs font-semibold">WhatsApp Enquiry</span>
              </div>
            </div>
          </AspectRatio>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-serif text-lg font-light text-[#1F2937] mb-1.5 line-clamp-2 leading-snug group-hover:text-[#E8177A] transition-colors duration-200">
            {formatName(productName)}
          </h3>
          {description && (
            <p className="text-[#6B7280] text-xs line-clamp-2 mt-auto font-sans leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
