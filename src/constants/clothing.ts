import type { Product } from '../types/clothing';

export const IMAGE_BASE_URL = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/images/';
export const CATEGORY_IMAGE_URL = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/maincategory/';
export const CLOTHING_IMAGE_URL = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/clothings/';
export const BANNER_IMAGE_URL = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/banner/';
export const logo = IMAGE_BASE_URL + 'logo.png';
export const clothingVideo = 'https://zjemljuanmretlnmjdah.supabase.co/storage/v1/object/public/videos/annamzclothings1.mp4';

export const CLOTHING_CATEGORIES = {
  'Sarees': {
    subcategories: [],
    fabrics: ['Chikankari', 'Chanderi', 'Maheshwari Silk', 'Cotton'],
    hasAgeGroup: false,
    hasSizes: false
  },
  'Salwar Suits': {
    subcategories: ['Stitched', 'Unstitched'],
    fabrics: ['Lucknowi Chikankari', 'Chanderi', 'Maheshwari Silk', 'Cotton'],
    hasAgeGroup: false,
    hasSizes: true
  },
  'Kurta & Frock Collection': {
    subcategories: ['Kurta Sets', 'Frocks'],
    fabrics: ['Pure Cotton'],
    hasAgeGroup: true,
    hasSizes: true
  },
  'Footwear': {
    subcategories: ['Lucknowi Jutti'],
    fabrics: [],
    hasAgeGroup: false,
    hasSizes: true
  }
};

export const DEFAULT_PRODUCTS: Product[] = [
  { id: 1, name: 'Chikankari Silk Saree', price: '₹12,500', price_type: 'Fixed', main_category: 'Sarees', category: 'Sarees (Chikankari)', fabric: 'Chikankari', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600', description: 'Exquisite handcrafted Chikankari silk saree.', status: 'Available' },
  { id: 2, name: 'Maheshwari Silk Saree', price: '₹9,500', price_type: 'Fixed', main_category: 'Sarees', category: 'Sarees (Maheshwari Silk)', fabric: 'Maheshwari Silk', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600', description: 'Traditional Maheshwari silk saree with elegant borders.', status: 'Available' },
  { id: 3, name: 'Cotton Kurta Set', price: '₹3,200', price_type: 'Fixed', main_category: 'Kurta & Frock Collection', category: 'Kurta Sets (Pure Cotton)', subcategory: 'Kurta Sets', fabric: 'Pure Cotton', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600', description: 'Pure cotton kurta set for ages 1-15.', status: 'Available', age_group: '1-15' },
  { id: 4, name: 'Lucknowi Jutti', price: '₹1,800', price_type: 'Fixed', main_category: 'Footwear', category: 'Lucknowi Jutti', subcategory: 'Lucknowi Jutti', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600', description: 'Beautifully embroidered Lucknowi jutti for women.', status: 'Available' },
];

export const getCategoryDisplay = (name: string) => {
  if (name === 'Kids Collection' || name === 'Kurta & Frock Collection') return 'Kurta & Frock Collection';
  return name;
};
