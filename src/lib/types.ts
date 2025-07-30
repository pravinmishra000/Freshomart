export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // The price before discount
  unit: string;
  description: string;
  image: string;
  category: 'fruits' | 'vegetables' | 'dairy' | 'grocery' | 'beverages' | 'cleaning';
  subCategory: string;
  stock: number;
  rating: number;
  data_ai_hint: string;
  dealEndTime?: string; // ISO string for countdown timer
  badges?: ('Hot Deal' | 'Limited Stock' | 'Deal of the Day' | 'Best Value' | 'Fresh Pick')[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: 'fruits' | 'vegetables' | 'dairy' | 'grocery' | 'beverages' | 'cleaning';
  data_ai_hint: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'Order Placed' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: OrderStatus;
  deliveryAddress: string;
  paymentMethod: 'UPI' | 'COD';
}
