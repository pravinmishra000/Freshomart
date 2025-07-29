'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/hooks/useAppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ProductCard';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, wishlist, orders } = useAppContext();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold font-headline">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <Button onClick={logout} variant="outline" className="mt-4">
            Log Out
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="wishlist">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wishlist">My Wishlist</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>
        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>Your Wishlist</CardTitle>
              <CardDescription>Products you've saved for later.</CardDescription>
            </CardHeader>
            <CardContent>
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Your wishlist is empty.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Your Orders</CardTitle>
              <CardDescription>A list of your past and current orders.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={order.id}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold">Order #{order.id.slice(-6)}</p>
                                <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                                <p className="text-sm font-medium text-primary">{order.status}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">${order.total.toFixed(2)}</p>
                                {index === 0 && order.status !== 'Delivered' && (
                                    <Link href="/tracking">
                                        <Button variant="link" className="p-0 h-auto">Track Order</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                        {index < orders.length - 1 && <Separator className="my-4" />}
                    </div>
                ))
              ) : (
                <p className="text-muted-foreground">You have no order history.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
