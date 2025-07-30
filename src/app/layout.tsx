import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Freshomart - Tazgi Ghar Tak',
  description: 'Modern grocery delivery app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")}>
        <AppProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 pb-24">{children}</main>
            <BottomNav />
          </div>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
