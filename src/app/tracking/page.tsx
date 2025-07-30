'use client';

import { useAppContext } from '@/hooks/useAppContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Order, OrderStatus } from '@/lib/types';
import { CheckCircle, Truck, Package, Home, Bike } from 'lucide-react';
import Image from 'next/image';

const statusSteps: { status: OrderStatus; icon: React.ElementType }[] = [
    { status: 'Order Placed', icon: Package },
    { status: 'Processing', icon: CheckCircle },
    { status: 'Out for Delivery', icon: Truck },
    { status: 'Delivered', icon: Home },
];

// Dummy coordinates for simulation
const startCoords = { lat: 28.6139, lng: 77.2090 }; // Delhi
const endCoords = { lat: 28.5355, lng: 77.3910 }; // Noida

export default function TrackingPage() {
  const router = useRouter();
  const { orders, placeOrder } = useAppContext(); // Using placeOrder to update order status
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [riderPosition, setRiderPosition] = useState(startCoords);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (orders.length > 0) {
      const order = orders[0];
      setLatestOrder(order);
      const initialStatusIndex = statusSteps.findIndex(step => step.status === order.status);
      setCurrentStatusIndex(initialStatusIndex >= 0 ? initialStatusIndex : 0);
    }
  }, [orders]);

  useEffect(() => {
    if (!latestOrder || latestOrder.status === 'Delivered' || latestOrder.status === 'Cancelled') {
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1; // Increment progress every second
        if (newProgress >= 100) {
          setCurrentStatusIndex(prevIndex => {
             const newIndex = prevIndex + 1;
             if (newIndex < statusSteps.length && latestOrder) {
                const newStatus = statusSteps[newIndex].status;
                const updatedOrder = {...latestOrder, status: newStatus};
                // This is a "hack" to update the order in context.
                // In a real app, you'd have a specific function for this.
                const updatedOrders = orders.map(o => o.id === latestOrder.id ? updatedOrder : o);
                localStorage.setItem('freshomart-orders', JSON.stringify(updatedOrders));
                setLatestOrder(updatedOrder);
             }
             return newIndex;
          });
          return 0; // Reset progress for next stage
        }
        return newProgress;
      });
    }, 200); // Update progress every 200ms

    return () => clearInterval(interval);
  }, [latestOrder, orders]);


  useEffect(() => {
     if (currentStatusIndex === 2) { // 'Out for Delivery'
        const duration = 100 * 200; // 100 steps * 200ms/step
        const stepInterval = duration / 100;
        let step = 0;

        const riderInterval = setInterval(() => {
            step++;
            const progress = step / 100;
            const newLat = startCoords.lat + (endCoords.lat - startCoords.lat) * progress;
            const newLng = startCoords.lng + (endCoords.lng - startCoords.lng) * progress;
            setRiderPosition({ lat: newLat, lng: newLng });
            if (progress >= 1) {
                clearInterval(riderInterval);
            }
        }, stepInterval);
        return () => clearInterval(riderInterval);
     }
  }, [currentStatusIndex]);

  if (!latestOrder) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold font-headline">No Orders Found</h1>
        <p className="text-muted-foreground mt-2">You haven't placed any orders yet.</p>
        <Button onClick={() => router.push('/')} className="mt-6">Start Shopping</Button>
      </div>
    );
  }

  const riderStyle = {
    top: `${(1 - (riderPosition.lat - endCoords.lat) / (startCoords.lat - endCoords.lat)) * 100}%`,
    left: `${((riderPosition.lng - startCoords.lng) / (endCoords.lng - startCoords.lng)) * 100}%`,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold font-headline text-center">Order Tracking</h1>
      
      {currentStatusIndex >= 2 && currentStatusIndex < 3 && (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Live Tracking</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
                   <Image src="https://placehold.co/800x400" layout="fill" objectFit="cover" alt="Map" data-ai-hint="city map satellite" />
                   <div className="absolute transition-all duration-1000 ease-linear" style={riderStyle}>
                        <div className="relative">
                            <Bike className="w-8 h-8 text-primary bg-white rounded-full p-1 shadow-lg" />
                            <div className="absolute top-0 left-0 w-8 h-8 bg-primary rounded-full animate-ping -z-10"></div>
                        </div>
                   </div>
                </div>
            </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Order #{latestOrder.id.slice(-6)}</CardTitle>
          <div className="text-sm text-muted-foreground">
            Placed on: {new Date(latestOrder.date).toLocaleDateString()} at {new Date(latestOrder.date).toLocaleTimeString()}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="font-semibold mb-4">Status: <span className="text-primary">{statusSteps[currentStatusIndex]?.status || 'Delivered'}</span></h3>
                <div className="relative flex justify-between">
                     <div className="absolute left-0 top-1/2 w-full h-0.5 bg-border -translate-y-1/2"></div>
                     <div className="absolute left-0 top-1/2 h-0.5 bg-primary -translate-y-1/2" style={{width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`}}></div>
                    {statusSteps.map((step, index) => {
                        const isActive = index <= currentStatusIndex;
                        return (
                            <div key={step.status} className="z-10 text-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto transition-colors duration-300 ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                    <step.icon className="w-5 h-5"/>
                                </div>
                                <p className={`mt-2 text-xs transition-colors duration-300 ${isActive ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>{step.status}</p>
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
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
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
          <span className="font-bold text-xl text-primary">₹{latestOrder.total.toFixed(2)}</span>
        </CardFooter>
      </Card>
    </div>
  );
}
