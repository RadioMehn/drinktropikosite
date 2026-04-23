import './globals.css';
import Navbar from './components/Navbar';
import AgeGate from './components/AgeGate';

export const metadata = {
  title: 'Tropiko | Lambanog Hard Seltzer',
  description: 'The first Lambanog-infused hard seltzer in the Philippines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Add suppressHydrationWarning here
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* ... your components ... */}
      </body>
    </html>
  );
}