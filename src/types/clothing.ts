export interface Product {
  id: string | number;
  name: string;
  price: string;
  price_type: 'Fixed' | 'On Request';
  main_category: string;
  subcategory?: string;
  fabric?: string;
  description: string;
  image: string;
  status: string;
  age_group?: string;
  category?: string;
  sizes?: string[];
  colors?: string[];
  created_at?: string;
}

export interface EnquiryItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
