'use client';

import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogIn, Menu, Heart, Package, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAppContext } from '@/hooks/useAppContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet"
import { Separator } from './ui/separator';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, cartCount } = useAppContext();
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === '/';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tracking', label: 'My Orders', icon: Package },
    { href: '/profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="container flex h-16 items-center">
        {!isHomePage && (
           <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
             <ChevronLeft className="h-6 w-6" />
           </Button>
        )}
        <div className="flex-1">
           <Link href="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <span className="font-headline text-2xl text-accent">Freshomart</span>
              <span className="text-xs text-primary font-bold -mt-1 uppercase">Fresh & Fast</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
           <Link href="/checkout">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="absolute top-1 right-1 h-5 w-5 justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
             <Link href="/profile">
                <Button variant="ghost" size="icon" aria-label="Wishlist">
                  <Heart className="h-5 w-5" />
                </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
