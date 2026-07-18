import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeEngine';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Lyna kezzal - UI/UX Designer & Front-End Developer',
  description: 'Portfolio of Lyna kezzal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
