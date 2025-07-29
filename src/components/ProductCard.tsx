'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Product } from '@/lib/types';
import { useAppContext } from '@/hooks/useAppContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppContext();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if(inWishlist) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product);
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <Link href={`/product/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0 relative">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={product.data_ai_hint}
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className={cn(
                "absolute top-2 right-2 rounded-full h-8 w-8 bg-background/70 hover:bg-background",
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
          <p className="text-xl font-bold text-primary">
            ₹{product.price.toFixed(2)}
            <span className="text-sm font-normal text-muted-foreground">{product.unit}</span>
          </p>
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
