import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';
import { Category } from '@/lib/types';
import React from 'react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-105">
        <CardContent className="p-0 relative text-center">
          <Image
            src={category.image}
            alt={category.name}
            width={300}
            height={300}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint={category.data_ai_hint}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-2xl font-bold font-headline text-white">{category.name}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
