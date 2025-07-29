'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Clock } from 'lucide-react';
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
        case 'Deal of the Day': return 'bg-yellow-500 hover:bg-yellow-600';
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col group">
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0 relative">
          <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-1">
            {product.badges?.map(badge => (
                <Badge key={badge} className={cn("text-xs text-white", getBadgeColor(badge))}>
                    {badge}
                </Badge>
            ))}
          </div>
          {isDiscounted && (
             <Badge variant="destructive" className="absolute top-2 right-10 z-10 text-xs">
                {discountPercentage}% OFF
             </Badge>
          )}
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.data_ai_hint}
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className={cn(
                "absolute top-2 right-2 rounded-full h-8 w-8 bg-background/70 hover:bg-background z-10",
                inWishlist && "text-red-500 hover:text-red-600"
            )}
            onClick={handleWishlistClick}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          </Button>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-headline font-semibold mb-1 leading-tight h-12">
            {product.name}
          </CardTitle>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-primary">
                ₹{product.price.toFixed(2)}
            </p>
            {isDiscounted && (
                <p className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice?.toFixed(2)}
                </p>
            )}
            <span className="text-sm font-normal text-muted-foreground">{product.unit}</span>
          </div>
           {timeLeft.hours !== undefined && (
             <div className="text-xs text-destructive mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3"/>
                Ends in {timeLeft.hours > 0 && `${timeLeft.hours}h`} {timeLeft.minutes > 0 && `${timeLeft.minutes}m`}
             </div>
           )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
