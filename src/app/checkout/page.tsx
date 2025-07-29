'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/hooks/useAppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

const checkoutSchema = z.object({
  address: z.string().min(10, 'Please enter a valid address'),
  paymentMethod: z.enum(['UPI', 'COD'], { required_error: 'Please select a payment method' }),
});

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, placeOrder, user, updateCartQuantity, removeFromCart } = useAppContext();
  
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      address: '',
      paymentMethod: 'UPI',
    },
  });

  function onSubmit(values: z.infer<typeof checkoutSchema>) {
    if (!user) {
        router.push('/login?redirect=/checkout');
        return;
    }
    const newOrder = {
      id: new Date().getTime().toString(),
      items: cart,
      total: cartTotal,
      date: new Date().toISOString(),
      status: 'Order Placed' as const,
      deliveryAddress: values.address,
      paymentMethod: values.paymentMethod,
    };
    placeOrder(newOrder);
    router.push('/tracking');
  }

  if (cart.length === 0) {
    return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold font-headline">Your Cart is Empty</h1>
            <p className="text-muted-foreground mt-2">Add some items to get started.</p>
            <Button onClick={() => router.push('/')} className="mt-6">Go Shopping</Button>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-8 text-center">Checkout</h1>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.data_ai_hint} />
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} x {item.quantity}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Shipping & Payment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Delivery Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Main St, Anytown, USA" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Payment Method</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="UPI" />
                                        </FormControl>
                                        <FormLabel className="font-normal">UPI / Google Pay / PhonePe</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="COD" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Cash on Delivery (COD)</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" size="lg">Place Order</Button>
                    </CardFooter>
                </Card>
            </div>
        </form>
        </Form>
    </div>
  );
}
