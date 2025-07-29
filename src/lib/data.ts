import type { Category, Product } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Fruits', slug: 'fruits', image: 'https://placehold.co/300x300', data_ai_hint: 'fruit basket' },
  { id: '2', name: 'Vegetables', slug: 'vegetables', image: 'https://placehold.co/300x300', data_ai_hint: 'fresh vegetables' },
  { id: '3', name: 'Dairy', slug: 'dairy', image: 'https://placehold.co/300x300', data_ai_hint: 'milk cheese' },
  { id: '4', name: 'Grocery', slug: 'grocery', image: 'https://placehold.co/300x300', data_ai_hint: 'grocery items' },
];

export const products: Product[] = [
  // Fruits
  { id: 'p1', name: 'Fresh Apples', price: 2.5, description: 'Crisp and juicy red apples.', image: 'https://placehold.co/400x400', category: 'fruits', stock: 100, rating: 4.5, data_ai_hint: 'red apple' },
  { id: 'p2', name: 'Organic Bananas', price: 1.8, description: 'A bunch of ripe organic bananas.', image: 'https://placehold.co/400x400', category: 'fruits', stock: 150, rating: 4.7, data_ai_hint: 'banana bunch' },
  { id: 'p3', name: 'Sweet Oranges', price: 3.0, description: 'Sweet and tangy oranges, full of vitamin C.', image: 'https://placehold.co/400x400', category: 'fruits', stock: 80, rating: 4.6, data_ai_hint: 'fresh orange' },
  { id: 'p4', name: 'Juicy Grapes', price: 4.2, description: 'A bundle of sweet, seedless green grapes.', image: 'https://placehold.co/400x400', category: 'fruits', stock: 60, rating: 4.8, data_ai_hint: 'green grapes' },

  // Vegetables
  { id: 'p5', name: 'Crisp Lettuce', price: 1.2, description: 'Fresh iceberg lettuce, perfect for salads.', image: 'https://placehold.co/400x400', category: 'vegetables', stock: 90, rating: 4.4, data_ai_hint: 'fresh lettuce' },
  { id: 'p6', name: 'Ripe Tomatoes', price: 2.0, description: 'Juicy red tomatoes for cooking or salads.', image: 'https://placehold.co/400x400', category: 'vegetables', stock: 120, rating: 4.5, data_ai_hint: 'red tomato' },
  { id: 'p7', name: 'Fresh Carrots', price: 1.5, description: 'A bunch of bright orange carrots.', image: 'https://placehold.co/400x400', category: 'vegetables', stock: 200, rating: 4.6, data_ai_hint: 'carrot bunch' },
  { id: 'p8', name: 'Green Broccoli', price: 2.8, description: 'A head of fresh, green broccoli.', image: 'https://placehold.co/400x400', category: 'vegetables', stock: 70, rating: 4.7, data_ai_hint: 'green broccoli' },

  // Dairy
  { id: 'p9', name: 'Whole Milk', price: 3.5, description: 'One gallon of fresh whole milk.', image: 'https://placehold.co/400x400', category: 'dairy', stock: 50, rating: 4.8, data_ai_hint: 'milk carton' },
  { id: 'p10', name: 'Cheddar Cheese', price: 5.0, description: 'A block of sharp cheddar cheese.', image: 'https://placehold.co/400x400', category: 'dairy', stock: 40, rating: 4.9, data_ai_hint: 'cheese block' },
  { id: 'p11', name: 'Plain Yogurt', price: 2.2, description: 'A container of creamy plain yogurt.', image: 'https://placehold.co/400x400', category: 'dairy', stock: 60, rating: 4.5, data_ai_hint: 'yogurt container' },
  { id: 'p12', name: 'Unsalted Butter', price: 4.0, description: 'A stick of unsalted butter.', image: 'https://placehold.co/400x400', category: 'dairy', stock: 80, rating: 4.7, data_ai_hint: 'butter stick' },

  // Grocery
  { id: 'p13', name: 'Whole Wheat Bread', price: 3.2, description: 'A loaf of freshly baked whole wheat bread.', image: 'https://placehold.co/400x400', category: 'grocery', stock: 100, rating: 4.6, data_ai_hint: 'bread loaf' },
  { id: 'p14', name: 'Organic Eggs', price: 4.5, description: 'A dozen large brown organic eggs.', image: 'https://placehold.co/400x400', category: 'grocery', stock: 80, rating: 4.8, data_ai_hint: 'egg carton' },
  { id: 'p15', name: 'Pasta', price: 1.8, description: 'A box of spaghetti pasta.', image: 'https://placehold.co/400x400', category: 'grocery', stock: 200, rating: 4.5, data_ai_hint: 'pasta box' },
  { id: 'p16', name: 'Olive Oil', price: 8.0, description: 'A bottle of extra virgin olive oil.', image: 'https://placehold.co/400x400', category: 'grocery', stock: 50, rating: 4.9, data_ai_hint: 'olive oil' },
];
