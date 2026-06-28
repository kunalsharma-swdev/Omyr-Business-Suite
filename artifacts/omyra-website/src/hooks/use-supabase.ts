import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface Category {
  id: number;
  name: string;
  image_name?: string;
}

export interface Product {
  id: number;
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
            .eq('category', cat.name)
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
        query = query.eq('category', category);
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

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();
        
      if (error) throw error;
      if (!data) throw new Error('Product not found');
      return data as Product;
    },
    enabled: !!id
  });
}
