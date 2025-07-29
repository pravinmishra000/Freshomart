'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { suggestProducts } from '@/ai/flows/product-suggestion';
import { Loader, Wand2 } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { products } from '@/lib/data';

export function SuggestionBox() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setSuggestedProducts([]);
    try {
      const result = await suggestProducts({ query });
      // Filter products from data.ts based on the names returned by the AI
      const filteredProducts = products.filter(p => result.productNames.some(sp => p.name.toLowerCase().includes(sp.toLowerCase())));
      setSuggestedProducts(filteredProducts);
    } catch (error) {
      console.error('Error getting product suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-card shadow-sm">
        <div className='flex items-center gap-2'>
            <Wand2 className="h-6 w-6 text-primary"/>
            <h2 className="text-2xl font-headline font-bold">What are you cooking today?</h2>
        </div>
      <p className="text-muted-foreground">Describe what you want to cook, and we'll suggest the ingredients you need!</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'I want to make palak paneer and some salad...'"
          className="flex-grow"
        />
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          Suggest Products
        </Button>
      </form>
      {loading && (
        <div className="text-center p-8">
            <Loader className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-muted-foreground">Finding ingredients for you...</p>
        </div>
      )}
      {suggestedProducts.length > 0 && (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
      )}
    </div>
  );
}
