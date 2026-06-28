import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface Category {
  id: number;
  name: string;
  image_name?: string;
}

export interface Product {
  product_name: string;
  description: string;
  category: string;
  image_name: string;
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('*');
      
      if (catError) throw catError;

      // Fetch one product per category for the image
      const categoriesWithImages = await Promise.all(
        categories.map(async (cat) => {
          const { data: products } = await supabase
            .from('products')
            .select('image_name')
            .ilike('category', cat.name)
            .limit(1);
          
          return {
            ...cat,
            image_name: products?.[0]?.image_name || null
          } as Category;
        })
      );

      return categoriesWithImages;
    }
  });
}

export function useProducts(category?: string, page: number = 1, pageSize: number = 25) {
  return useQuery({
    queryKey: ['products', category, page],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

      if (category) {
        query = query.ilike('category', category);
      }

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await query.range(from, to);
      
      if (error) throw error;
      
      return {
        products: data as Product[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize)
      };
    }
  });
}

export function useProduct(productName: string) {
  return useQuery({
    queryKey: ['product', productName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_name', productName)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Product not found');
      return data as Product;
    },
    enabled: !!productName
  });
}
