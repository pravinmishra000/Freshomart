'use client';

import { useParams } from 'next/navigation';
import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const { slug } = params;

  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = products.filter((p) => p.category === slug);

  if (!category) {
    return <div className="text-center">Category not found.</div>;
  }

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold font-headline">{category.name}</h1>
        <p className="text-muted-foreground mt-2">Browse our fresh selection of {category.name.toLowerCase()}.</p>
      </section>

      <section>
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">No products found in this category yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
