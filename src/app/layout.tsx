import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import ErudaProvider from '@/lib/eruda';

import { TRPCReactProvider } from '@/trpc/react';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'DWAR journal',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
        <body className="min-h-screen">
          <TRPCReactProvider>
            <ErudaProvider>{children}</ErudaProvider>
          </TRPCReactProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
