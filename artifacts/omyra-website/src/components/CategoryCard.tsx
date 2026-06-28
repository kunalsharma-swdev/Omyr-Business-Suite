import { Link } from "wouter";
import { getProductImageUrl } from "@/lib/supabase";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  imageName?: string;
}

function formatName(name: string) {
  return name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function CategoryCard({ name, imageName }: CategoryCardProps) {
  return (
    <Link href={`/catalogue/${encodeURIComponent(name)}`}>
      <div className="group cursor-pointer overflow-hidden relative rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.14)] transition-all duration-500">
        <AspectRatio ratio={4 / 3}>
          {imageName ? (
            <img
              src={getProductImageUrl(imageName)}
              alt={`${formatName(name)} costumes`}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-108"
              style={{ transform: "scale(1)", transition: "transform 700ms ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FFF8FC] to-[#F3F4F6] flex items-center justify-center">
              <span className="text-[#6B7280] font-sans text-sm">No Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent transition-opacity duration-500" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/60 font-sans text-[10px] tracking-[0.25em] uppercase mb-1.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  View Collection
                </p>
                <h3 className="text-white font-serif text-2xl font-light leading-tight">
                  {formatName(name)}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>
    </Link>
  );
}
