import './globals.css';
import Navbar from './components/Navbar';
import AgeGate from './components/AgeGate';
import Footer from './components/Footer';
import ThemeProvider from './components/ThemeProvider'; 
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Tropiko | Lambanog Hard Seltzer',
  description: 'The first Lambanog-infused hard seltzer in the Philippines.',
  // THE FIX: Tells Next.js to look in the public folder for the browser tab icon
  icons: {
    icon: '/favicon.png', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Next-Themes requires suppressHydrationWarning on HTML to prevent flash */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {/* Wrap everything inside the body with the ThemeProvider */}
        <ThemeProvider>
          <AgeGate />
          <Navbar />
          
          {children}
          
          <Analytics /> 
          <Footer /> 
        </ThemeProvider>
      </body>
    </html>
  );
}