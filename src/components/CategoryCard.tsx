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
    <Link href={`/category/${category.slug}`} className="group">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-full aspect-square rounded-xl overflow-hidden bg-muted transition-all duration-300 group-hover:shadow-lg">
          <Image
            src={category.image}
            alt={category.name}
            width={150}
            height={150}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint={category.data_ai_hint}
          />
        </div>
        <h3 className="text-sm font-semibold text-foreground truncate">{category.name}</h3>
      </div>
    </Link>
  );
}
