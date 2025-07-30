'use client';

import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogIn, Menu, Heart, Package } from 'lucide-react';
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

export function Header() {
  const { user, cartCount } = useAppContext();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tracking', label: 'My Orders', icon: Package },
    { href: '/profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold font-headline text-lg">Freshomart</span>
              <span className="text-xs text-muted-foreground -mt-1">Tazgi Ghar Tak</span>
            </div>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.slice(0,1).map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <SheetHeader className="p-4 text-left">
                  <SheetTitle asChild>
                     <Link href="/" className="mr-6 flex items-center space-x-2 mb-4">
                      <ShoppingCart className="h-6 w-6 text-primary" />
                       <div className="flex flex-col">
                        <span className="font-bold font-headline text-lg">Freshomart</span>
                        <span className="text-xs text-muted-foreground -mt-1">Tazgi Ghar Tak</span>
                      </div>
                    </Link>
                  </SheetTitle>
                  <Separator />
               </SheetHeader>
                <nav className="flex flex-col space-y-4 px-4">
                    {navLinks.map(link => (
                    <SheetClose asChild key={link.href}>
                        <Link href={link.href} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                           {link.icon && <link.icon className="h-5 w-5" />}
                           <span>{link.label}</span>
                        </Link>
                    </SheetClose>
                    ))}
                </nav>
            </SheetContent>
          </Sheet>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
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
            {user ? (
              <Link href="/profile">
                <Button variant="ghost" size="icon" aria-label="Profile">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" aria-label="Login">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
