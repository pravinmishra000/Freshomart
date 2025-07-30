'use client';

import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { categories, products } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { SuggestionBox } from '@/components/SuggestionBox';
import { Input } from '@/components/ui/input';
import { Mic, Search } from 'lucide-react';

export default function Home() {
  const bestSellers = products.sort((a, b) => b.rating - a.rating).slice(0, 10);
  const discountedProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);

  const banners = [
    { src: 'https://placehold.co/1200x400', alt: 'Organic Fruits Banner', data_ai_hint: 'organic fruits basket', tagline: '100% Organic, Fresh from Farms.' },
    { src: 'https://placehold.co/1200x400', alt: 'Fresh Vegetables Banner', data_ai_hint: 'fresh vegetables market', tagline: 'Picked Fresh. Delivered Fast.' },
    { src: 'https://placehold.co/1200x400', alt: 'Dairy Essentials Banner', data_ai_hint: 'dairy products on table', tagline: 'Pure. Chilled. Wholesome.' },
    { src: 'https://placehold.co/1200x400', alt: 'Daily Grocery Banner', data_ai_hint: 'daily essentials kitchen', tagline: 'Daily Needs, Daily Delivered.' },
  ];

  return (
    <div className="space-y-8">
       <div className="sticky top-16 -mx-4 -mt-8 bg-background/80 backdrop-blur-lg z-20 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for atta, dal, chawal..." className="pl-10 h-12 rounded-full shadow-sm" />
          <Mic className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      <section>
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden relative">
                  <CardContent className="p-0">
                    <Image
                      src={banner.src}
                      alt={banner.alt}
                      width={1200}
                      height={400}
                      className="w-full h-auto object-cover"
                      data-ai-hint={banner.data_ai_hint}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg">{banner.tagline}</h2>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4" />
          <CarouselNext className="absolute right-4" />
        </Carousel>
      </section>

      {discountedProducts.length > 0 && (
          <>
            <section>
              <h2 className="text-3xl font-headline font-bold mb-6 text-center">💥 Deals & Discounts</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {discountedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
            <Separator />
          </>
      )}
      
      <section>
        <SuggestionBox />
      </section>

      <section>
        <h2 className="text-3xl font-headline font-bold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
      
      <Separator />

      <section>
        <h2 className="text-3xl font-headline font-bold mb-6 text-center">Best Sellers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
