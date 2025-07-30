'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Clock, TrendingUp, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Product } from '@/lib/types';
import { useAppContext } from '@/hooks/useAppContext';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import React, { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

const getBadgeColor = (badge: string) => {
    switch(badge) {
        case 'Hot Deal': return 'bg-red-500 hover:bg-red-600';
        case 'Deal of the Day': return 'bg-yellow-500 hover:bg-yellow-600 text-black';
        case 'Limited Stock': return 'bg-blue-500 hover:bg-blue-600';
        case 'Best Value': return 'bg-green-500 hover:bg-green-600';
        case 'Fresh Pick': return 'bg-teal-500 hover:bg-teal-600';
        default: return 'bg-primary';
    }
}

const calculateTimeLeft = (endTime: string) => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
        };
    }
    return timeLeft;
};


export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();
  const inWishlist = isInWishlist(product.id);
  const [timeLeft, setTimeLeft] = useState(product.dealEndTime ? calculateTimeLeft(product.dealEndTime) : {});

  useEffect(() => {
    if (!product.dealEndTime) return;

    const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(product.dealEndTime));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if(inWishlist) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product);
    }
  }

  const isDiscounted = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = isDiscounted ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;

  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg flex flex-col group border-0 shadow-none hover:shadow-none bg-transparent">
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0 relative mb-2">
          <div className="aspect-square w-full rounded-xl overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              data-ai-hint={product.data_ai_hint}
            />
          </div>
          {isDiscounted && (
             <Badge variant="destructive" className="absolute top-2 left-2 z-10 text-xs font-bold shadow-md">
                {discountPercentage}% OFF
             </Badge>
          )}
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          {timeLeft.hours !== undefined && (
             <div className="text-xs text-destructive mb-1 flex items-center gap-1 font-medium">
                <Clock className="h-3 w-3"/>
                Ends in {timeLeft.hours > 0 && `${timeLeft.hours}h`} {timeLeft.minutes > 0 && `${timeLeft.minutes}m`}
             </div>
           )}
          <p className="text-sm font-semibold leading-tight h-10">
            {product.name}
          </p>
          <p className="text-xs text-muted-foreground">{product.unit}</p>
        </CardContent>
        <CardFooter className="p-0 pt-2 flex justify-between items-center">
            <div className="flex flex-col items-start">
              {isDiscounted && (
                  <p className="text-xs text-muted-foreground line-through">
                      ₹{product.originalPrice?.toFixed(2)}
                  </p>
              )}
              <p className="text-base font-bold text-foreground">
                  ₹{product.price.toFixed(2)}
              </p>
            </div>
            <Button 
                size="icon"
                className="w-10 h-10 rounded-full font-bold transition-transform duration-200 group-hover:scale-105"
                onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
                }}
            >
                <Plus className="h-5 w-5" />
            </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
