
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import { useApp } from '../App';

const MovieReel = () => {
  const samples = [
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=500',
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=500',
    'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=500',
    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=500',
    'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=500',
    'https://images.unsplash.com/photo-1501446529957-6226bd447c46?q=80&w=500',
    'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=500',
    'https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=500',
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=500',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=500'
  ];

  return (
    <div className="relative py-12 bg-black overflow-hidden group border-y border-purple-900/20">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
      
      <div className="flex gap-4 movie-reel-track">
        {[...samples, ...samples].map((url, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 w-[250px] aspect-[3/4] bg-zinc-900 border-x-8 border-black relative group/item"
          >
            <div className="absolute inset-0 border-y-[12px] border-zinc-800 flex flex-col justify-between p-1 z-20 pointer-events-none">
              <div className="flex justify-around">
                {[1,2,3].map(j => <div key={j} className="w-4 h-6 bg-black rounded-sm" />)}
              </div>
              <div className="flex justify-around">
                {[1,2,3].map(j => <div key={j} className="w-4 h-6 bg-black rounded-sm" />)}
              </div>
            </div>
            <img 
              src={url} 
              alt="Past Work" 
              className="w-full h-full object-cover grayscale opacity-70 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const { products } = useApp();
  const featured = products.filter(p => p.featured).slice(0, 3);

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4 py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000" 
            alt="Gothic background" 
            className="w-full h-full object-cover animate-pulse duration-[10s]"
          />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-20" />
        </div>

        <div className="relative z-30 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-400 text-sm font-bold uppercase tracking-widest mb-8 animate-bounce">
            <Sparkles size={16} /> Digital Excellence Est. 2024
          </div>
          <h1 className="text-6xl md:text-9xl font-gothic mb-8 tracking-tighter text-white drop-shadow-[0_0_25px_rgba(147,51,234,0.6)] leading-tight">
            GHASTLY RAVEN<br/><span className="text-purple-600 italic">GRAPHICS</span>
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 mb-12 font-serif italic max-w-3xl mx-auto leading-relaxed">
            Dark aesthetics for digital creators. Exclusive seamless files, high-end branding, and custom gothic artistry.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link 
              to="/shop" 
              className="px-12 py-5 bg-purple-700 hover:bg-purple-600 text-white rounded-full font-bold transition-all transform hover:scale-105 hover:rotate-1 shadow-[0_0_30px_rgba(88,28,135,0.6)] flex items-center gap-3 text-lg"
            >
              Enter The Shop <ChevronRight size={24} />
            </Link>
            <Link 
              to="/faq" 
              className="px-12 py-5 border-2 border-purple-500/50 hover:bg-purple-950/20 text-white rounded-full font-bold transition-all flex items-center gap-3 text-lg"
            >
              Contact The Coven
            </Link>
          </div>
        </div>
      </section>

      {/* Movie Reel Section */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-gothic text-white mb-4">The Raven's Portfolio</h2>
          <p className="text-purple-500 italic font-serif">A cinematic journey through past commissions</p>
          <div className="w-32 h-1 bg-purple-700 mx-auto mt-8 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.8)]" />
        </div>
        <MovieReel />
      </section>

      {/* Featured Graphics */}
      <section className="py-32 container mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-gothic text-white mb-2">Featured Creations</h2>
            <p className="text-zinc-500">Hand-picked highlights from our current collection</p>
          </div>
          <Link to="/shop" className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-2 group transition-colors">
            View All Graphics <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featured.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-purple-900/30 bg-zinc-950 transition-all duration-500 group-hover:border-purple-500/50 group-hover:-translate-y-2">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-xs text-purple-400 font-bold uppercase tracking-widest mb-2 block">{product.tier || product.subCategory}</span>
                    <h3 className="text-2xl font-gothic text-white mb-4">{product.name}</h3>
                    <Link 
                      to="/shop" 
                      className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black"
                    >
                      Quick View <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-24 bg-gradient-to-r from-purple-950/20 to-black border-y border-purple-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-gothic text-white mb-8">Custom Business Branding</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
            Elevate your shop with tailor-made logos, scan-to-pay displays, and interaction graphics designed specifically for your brand.
          </p>
          <Link 
            to="/shop?cat=Business" 
            className="px-12 py-4 bg-zinc-900 border border-purple-500/50 text-white rounded-full font-bold hover:bg-purple-900 transition-all"
          >
            Start Your Branding Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
