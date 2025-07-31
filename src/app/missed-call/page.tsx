'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Copy, PhoneCall } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MissedCallPage() {
  const phoneNumber = '+919334390049';
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    toast({
      title: 'Copied to clipboard!',
      description: 'The phone number has been copied.',
    });
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
            <PhoneCall className="h-10 w-10" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Order by Missed Call</CardTitle>
          <CardDescription className="text-lg">
            Give a missed call on the number below and we’ll call you back to place your order!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className="text-4xl font-bold text-foreground tracking-widest bg-muted p-4 rounded-lg flex items-center justify-center gap-4"
          >
            <Phone className="h-8 w-8 text-muted-foreground" />
            <span>{phoneNumber}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="outline" className="w-full" onClick={handleCopy}>
              <Copy className="mr-2 h-5 w-5" /> Copy Number
            </Button>
            <a href={`tel:${phoneNumber}`} className="w-full">
              <Button size="lg" className="w-full">
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
