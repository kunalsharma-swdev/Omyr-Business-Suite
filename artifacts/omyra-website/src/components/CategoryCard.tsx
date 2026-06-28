import { Link } from "wouter";
import { getProductImageUrl } from "@/lib/supabase";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
      <div className="group cursor-pointer overflow-hidden relative">
        <AspectRatio ratio={4 / 3}>
          {imageName ? (
            <img
              src={getProductImageUrl(imageName)}
              alt={`${formatName(name)} costumes`}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground font-sans text-sm">
                No Image
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80" />
          <div className="absolute inset-0 flex flex-col justify-end p-7">
            <p className="text-white/50 font-sans text-[10px] tracking-[0.3em] uppercase mb-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
              View Collection
            </p>
            <h3 className="text-white font-serif text-3xl font-light tracking-wide">
              {formatName(name)}
            </h3>
          </div>
        </AspectRatio>
      </div>
    </Link>
  );
}
