"use client"

import { useState } from 'react'

export default function Home() {
  const [packVariant, setPackVariant] = useState<'single' | 'fourPack'>('single')

  const pricingData = {
    single: { price: '₱120.00', label: 'Single Bottle', desc: '330ml Amber Glass' },
    fourPack: { price: '₱450.00', label: '4-Pack Carrier', desc: 'Corrugated Carrier Box' }
  }

  const handleAddToCart = () => {
    alert(`Added ${pricingData[packVariant].label} to your cart!`)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white py-32 px-6 flex items-center justify-center min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div> {/* Overlay for future background image */}
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight text-emerald-50">
            Piña Paradise
          </h1>
          <p className="text-lg md:text-2xl mb-10 font-light tracking-wide text-emerald-100 max-w-2xl">
            The Premium Coconut-Infused Lambanog Hard Seltzer.
          </p>
          <a href="#shop" className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-full font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Shop the Collection
          </a>
        </div>
      </section>

      {/* Shop / Product Section */}
      <section id="shop" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Product Image Placeholder */}
            <div className="bg-stone-100 rounded-3xl aspect-[4/5] flex items-center justify-center shadow-inner border border-stone-200 relative overflow-hidden">
              <span className="text-stone-400 font-medium">Piña Paradise Product Photography</span>
            </div>

            {/* Product Details & Form */}
            <div className="flex flex-col">
              <h2 className="font-serif text-4xl text-emerald-950 mb-4 font-bold">Piña Paradise Seltzer</h2>
              <p className="text-stone-600 mb-8 text-lg leading-relaxed">
                A crisp, refreshing hard seltzer blending the tropical notes of natural coconut with the remarkably smooth finish of premium, double-distilled lambanog.
              </p>

              {/* Intuitive Variant Selector */}
              <div className="mb-8">
                <span className="block text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Select Packaging</span>
                <div className="grid grid-cols-2 gap-4">
                  {/* Single Option */}
                  <button 
                    onClick={() => setPackVariant('single')}
                    className={`p-4 rounded-xl text-left border-2 transition-all ${
                      packVariant === 'single' 
                      ? 'border-amber-600 bg-amber-50 shadow-md' 
                      : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-bold text-stone-900">{pricingData.single.label}</div>
                    <div className="text-sm text-stone-500 mt-1">{pricingData.single.desc}</div>
                  </button>

                  {/* 4-Pack Option */}
                  <button 
                    onClick={() => setPackVariant('fourPack')}
                    className={`p-4 rounded-xl text-left border-2 transition-all ${
                      packVariant === 'fourPack' 
                      ? 'border-amber-600 bg-amber-50 shadow-md' 
                      : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-bold text-stone-900">{pricingData.fourPack.label}</div>
                    <div className="text-sm text-stone-500 mt-1">{pricingData.fourPack.desc}</div>
                  </button>
                </div>
              </div>

              {/* Price & Checkout */}
              <div className="flex items-center justify-between mt-auto pt-8 border-t border-stone-100">
                <div className="text-4xl font-serif font-bold text-emerald-950">
                  {pricingData[packVariant].price}
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="bg-emerald-900 hover:bg-emerald-800 text-white px-10 py-4 rounded-full font-bold tracking-wide transition-colors shadow-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Lambanog Explanation */}
      <section id="spirit" className="py-24 px-6 bg-stone-900 text-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-amber-500 mb-8 font-bold">The Spirit of the Islands</h2>
          <div className="space-y-6 text-lg leading-relaxed text-stone-300">
            <p>
              Not all spirits are created equal. We believe in elevating local traditions, which is why Tropiko is crafted using only the highest quality, <strong className="text-white">FDA-certified lambanog</strong>.
            </p>
            <p>
              Through a meticulous <strong className="text-white">double-distillation</strong> process, we strip away impurities to create a remarkably smooth, refined base. This ensures that our natural coconut infusion shines through without any harsh bite. It’s a clean, safe, and proudly Philippine seltzer.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="about" className="py-24 px-6 bg-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-emerald-950 mb-4 font-bold">Who We Are</h2>
          <p className="text-amber-600 font-bold uppercase tracking-widest mb-8 text-sm">Modernizing a Philippine Classic</p>
          <div className="text-stone-700 text-lg leading-relaxed space-y-6">
            <p>
              Tropiko was born out of a desire to rethink how local spirits are experienced. We noticed a gap between traditional lambanog and the modern, accessible beverage market. Our goal was to create a drink that respects its heritage while offering the crisp, sessionable qualities of a premium hard seltzer.
            </p>
            <p>
              From finalizing our flavor profile to designing the perfect packaging for our amber bottles, every step is a testament to our commitment to quality, local ingredients, and exceptional taste.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}