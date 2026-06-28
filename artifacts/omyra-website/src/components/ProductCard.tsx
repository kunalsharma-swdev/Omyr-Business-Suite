import { Link } from "wouter";
import { getProductImageUrl } from "@/lib/supabase";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  description: string;
  imageName: string;
}

export function ProductCard({ id, name, category, description, imageName }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col border-border">
        <div className="relative overflow-hidden bg-muted">
          <AspectRatio ratio={1}>
            {imageName ? (
              <img 
                src={getProductImageUrl(imageName)} 
                alt={name} 
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </AspectRatio>
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-primary font-semibold shadow-sm hover:bg-white">
              {category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5 flex-grow flex flex-col">
          <h3 className="font-serif text-xl font-bold text-foreground mb-2 line-clamp-2">{name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-auto">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
