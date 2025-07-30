import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-muted/40 mt-12">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mr-4 flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <div className="flex flex-col">
                    <span className="font-bold font-headline text-lg">Freshomart</span>
                    <span className="text-xs text-muted-foreground -mt-1">Tazgi Ghar Tak</span>
                </div>
            </div>

          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            © {new Date().getFullYear()} Freshomart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
