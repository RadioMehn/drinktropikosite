import Link from 'next/link'

export default function Home() {
  return (
    <section className="relative bg-emerald-900 text-white py-32 px-6 flex items-center justify-center min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-black/20 z-0"></div> 
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight text-emerald-50">
          Piña Paradise
        </h1>
        <p className="text-lg md:text-2xl mb-10 font-light tracking-wide text-emerald-100 max-w-2xl">
          The Premium Coconut-Infused Lambanog Hard Seltzer.
        </p>
        <Link href="/shop" className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-full font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Shop the Collection
        </Link>
      </div>
    </section>
  )
}