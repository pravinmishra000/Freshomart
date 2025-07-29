'use client';

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, CartItem, Product, Order } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export interface AppContextType {
  user: User | null;
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  login: (user: User) => void;
  logout: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: (order: Order) => void;
  cartTotal: number;
  cartCount: number;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedUser = localStorage.getItem('freshomart-user');
      const storedCart = localStorage.getItem('freshomart-cart');
      const storedWishlist = localStorage.getItem('freshomart-wishlist');
      const storedOrders = localStorage.getItem('freshomart-orders');

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (error) {
      console.error('Failed to parse from localStorage', error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('freshomart-user', JSON.stringify(user));
    }
  }, [user, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('freshomart-cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('freshomart-wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('freshomart-orders', JSON.stringify(orders));
    }
  }, [orders, isMounted]);

  const login = (userData: User) => {
    setUser(userData);
    toast({ title: 'Success', description: `Welcome back, ${userData.name}!` });
  };

  const logout = () => {
    setUser(null);
    toast({ title: 'Success', description: 'You have been logged out.' });
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    toast({ title: 'Added to cart', description: `${product.name} has been added to your cart.` });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast({ title: 'Removed from cart', description: `Item has been removed from your cart.` });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };
  
  const clearCart = () => {
    setCart([]);
  }

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item.id === product.id)) {
        toast({ variant: 'destructive', title: 'Already in wishlist', description: `${product.name} is already in your wishlist.` });
        return prevWishlist;
      }
      toast({ title: 'Added to wishlist', description: `${product.name} has been added to your wishlist.` });
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
    toast({ title: 'Removed from wishlist', description: `Item has been removed from your wishlist.` });
  };

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some((item) => item.id === productId);
  }, [wishlist]);

  const placeOrder = (order: Order) => {
    setOrders((prevOrders) => [order, ...prevOrders]);
    clearCart();
    toast({ title: 'Order Placed!', description: 'Thank you for your purchase.' });
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  const value = {
    user,
    cart,
    wishlist,
    orders,
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    placeOrder,
    cartTotal,
    cartCount,
  };

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
