'use client';

import { useAppContext } from '@/hooks/useAppContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Order, OrderStatus } from '@/lib/types';
import { CheckCircle, Truck, Package, Home } from 'lucide-react';
import Image from 'next/image';

const statusSteps: { status: OrderStatus; icon: React.ElementType }[] = [
    { status: 'Order Placed', icon: Package },
    { status: 'Processing', icon: CheckCircle },
    { status: 'Out for Delivery', icon: Truck },
    { status: 'Delivered', icon: Home },
];

export default function TrackingPage() {
  const router = useRouter();
  const { orders } = useAppContext();
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orders.length > 0) {
      setLatestOrder(orders[0]);
    }
  }, [orders]);


  if (!latestOrder) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold font-headline">No Orders Found</h1>
        <p className="text-muted-foreground mt-2">You haven't placed any orders yet.</p>
        <Button onClick={() => router.push('/')} className="mt-6">Start Shopping</Button>
      </div>
    );
  }

  const currentStatusIndex = statusSteps.findIndex(step => step.status === latestOrder.status);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold font-headline text-center">Order Tracking</h1>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Order #{latestOrder.id.slice(-6)}</CardTitle>
          <div className="text-sm text-muted-foreground">
            Placed on: {new Date(latestOrder.date).toLocaleDateString()} at {new Date(latestOrder.date).toLocaleTimeString()}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="font-semibold mb-4">Status: <span className="text-primary">{latestOrder.status}</span></h3>
                <div className="relative flex justify-between">
                     <div className="absolute left-0 top-1/2 w-full h-0.5 bg-border -translate-y-1/2"></div>
                     <div className="absolute left-0 top-1/2 h-0.5 bg-primary -translate-y-1/2" style={{width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`}}></div>
                    {statusSteps.map((step, index) => {
                        const isActive = index <= currentStatusIndex;
                        return (
                            <div key={step.status} className="z-10 text-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                    <step.icon className="w-5 h-5"/>
                                </div>
                                <p className={`mt-2 text-xs ${isActive ? 'font-semibold' : ''}`}>{step.status}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Separator/>
          <div>
            <h3 className="font-semibold mb-2">Items Ordered</h3>
            <div className="space-y-2">
                {latestOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Image src={item.image} alt={item.name} width={48} height={48} className="rounded-md object-cover" data-ai-hint={item.data_ai_hint} />
                            <div>
                                <span>{item.name}</span>
                                <span className="text-muted-foreground text-sm"> (x{item.quantity})</span>
                            </div>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2">Shipping To</h3>
            <p className="text-muted-foreground">{latestOrder.deliveryAddress}</p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-6 flex justify-between items-center">
          <span className="font-bold text-lg">Total Amount</span>
          <span className="font-bold text-xl text-primary">${latestOrder.total.toFixed(2)}</span>
        </CardFooter>
      </Card>
    </div>
  );
}
