export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'fruits' | 'vegetables' | 'dairy' | 'grocery';
  stock: number;
  rating: number;
  data_ai_hint: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: 'fruits' | 'vegetables' | 'dairy' | 'grocery';
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
