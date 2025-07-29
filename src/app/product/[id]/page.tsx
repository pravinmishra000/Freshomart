'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useAppContext } from '@/hooks/useAppContext';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (!product) {
    return <div className="text-center">Product not found.</div>;
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden border">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
            data-ai-hint={product.data_ai_hint}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold font-headline">{product.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-500">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              {product.rating % 1 !== 0 && <Star className="h-5 w-5 fill-current" style={{ clipPath: `inset(0 ${100 - (product.rating % 1) * 100}% 0 0)` }} />}
              {[...Array(5 - Math.ceil(product.rating))].map((_, i) => (
                <Star key={i} className="h-5 w-5" />
              ))}
            </div>
            <span className="text-muted-foreground">({product.rating.toFixed(1)})</span>
          </div>
          <p className="text-lg text-muted-foreground">{product.description}</p>
          <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <Separator />
          <div className="flex items-center space-x-4">
            <label className="font-medium">Quantity:</label>
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => handleQuantityChange(-1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                className="h-10 w-16 text-center border-0 focus-visible:ring-0"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
              />
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => handleQuantityChange(1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button size="lg" className="w-full" onClick={() => addToCart(product, quantity)}>
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-3xl font-headline font-bold mb-6 text-center">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p}/>)}
        </div>
      </div>
    </div>
  );
}
