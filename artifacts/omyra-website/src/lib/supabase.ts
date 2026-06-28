import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper for logo
export const getLogoUrl = () => {
  return supabase.storage.from('assets').getPublicUrl('logo.png').data.publicUrl;
};

// Helper for product images
export const getProductImageUrl = (imageName: string | null | undefined) => {
  if (!imageName) return '';
  return supabase.storage.from('products').getPublicUrl(imageName).data.publicUrl;
};
