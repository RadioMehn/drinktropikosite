import '../app/globals.css'
import { Montserrat, Playfair_Display } from 'next/font/google'
import Link from 'next/link'

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat' 
})

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair' 
})

export const metadata = {
  title: 'Tropiko | Piña Paradise',
  description: 'Premium Coconut-Infused Lambanog Hard Seltzer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="bg-stone-50 text-stone-900 font-sans antialiased flex flex-col min-h-screen">
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-black tracking-widest text-emerald-950">
              TROPIKO
            </div>
            <ul className="hidden md:flex gap-8 font-semibold text-sm tracking-wide text-stone-600">
            <li><Link href="/" className="hover:text-amber-600 transition-colors">HOME</Link></li>
            <li><Link href="/shop" className="hover:text-amber-600 transition-colors">SHOP</Link></li>
            <li><Link href="/about" className="hover:text-amber-600 transition-colors">ABOUT US</Link></li>
          </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-emerald-950 text-emerald-50 py-12 text-center">
          <p className="font-medium tracking-wide">&copy; 2026 Tropiko. All Rights Reserved.</p>
          <p className="text-sm mt-2 opacity-70">Drink Responsibly. Proudly crafted in the Philippines.</p>
        </footer>

      </body>
    </html>
  )
}