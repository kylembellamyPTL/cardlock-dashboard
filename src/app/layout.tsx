import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cardlock Dashboard',
  description: 'Internal dashboard powered by Next.js and Supabase'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
