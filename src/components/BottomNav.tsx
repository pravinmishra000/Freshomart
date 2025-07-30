'use client';

import { Home, Package, AppWindow, Printer } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/profile', label: 'Order Again', icon: Package }, // Assuming "Order Again" is part of profile
  { href: '/#categories', label: 'Categories', icon: AppWindow }, // Assuming categories are on the homepage
];

export function BottomNav() {
  const pathname = usePathname();

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-muted group',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
         <button
            onClick={handlePrint}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted group text-muted-foreground"
        >
            <Printer className="w-6 h-6 mb-1" />
            <span className="text-xs">Print</span>
        </button>
      </div>
    </div>
  );
}
