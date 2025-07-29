'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function Home() {
  const bestSellers = products.slice(0, 8);

  const banners = [
    { src: 'https://placehold.co/1200x400', alt: 'Fresh Vegetables Banner', data_ai_hint: 'vegetables groceries' },
    { src: 'https://placehold.co/1200x400', alt: 'Daily Essentials Banner', data_ai_hint: 'dairy products' },
    { src: 'https://placehold.co/1200x400', alt: 'Organic Fruits Banner', data_ai_hint: 'fresh fruit' },
  ];

  return (
    <div className="space-y-12">
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
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={banner.src}
                      alt={banner.alt}
                      width={1200}
                      height={400}
                      className="w-full h-auto object-cover"
                      data-ai-hint={banner.data_ai_hint}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4" />
          <CarouselNext className="absolute right-4" />
        </Carousel>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-bold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
      
      <Separator />

      <section>
        <h2 className="text-3xl font-headline font-bold mb-6 text-center">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
