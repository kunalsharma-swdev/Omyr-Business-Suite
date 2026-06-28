import { Link } from "wouter";
import { getProductImageUrl } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CategoryCardProps {
  name: string;
  imageName?: string;
}

export function CategoryCard({ name, imageName }: CategoryCardProps) {
  return (
    <Link href={`/catalogue/${encodeURIComponent(name)}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-none bg-card">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={4/3}>
            {imageName ? (
              <img 
                src={getProductImageUrl(imageName)} 
                alt={`${name} costumes`} 
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground font-medium">No Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
              <h3 className="text-white font-serif text-2xl font-bold tracking-wide">{name}</h3>
            </div>
          </AspectRatio>
        </div>
      </Card>
    </Link>
  );
}
