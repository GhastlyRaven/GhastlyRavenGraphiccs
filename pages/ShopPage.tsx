
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
// Added Sparkles to lucide-react imports
import { ChevronRight, Filter, Search, ShoppingBag, Grid, List, Sparkles } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../constants';
import { useApp } from '../App';
import { Product } from '../types';

const ShopPage = () => {
  const { products, addToCart } = useApp();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSub = !activeSubCategory || p.subCategory === activeSubCategory;
      const matchTier = !activeTier || p.tier === activeTier;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSub && matchTier && matchSearch;
    });
  }, [products, activeCategory, activeSubCategory, activeTier, searchQuery]);

  return (
    <div className="bg-[#050505] min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumbs & Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-widest font-bold mb-4">
            <span className="hover:text-purple-400 transition-colors cursor-pointer">Shadow Market</span>
            <ChevronRight size={14} />
            <span className="text-purple-500">{activeCategory}</span>
            {activeSubCategory && (
              <>
                <ChevronRight size={14} />
                <span className="text-purple-300">{activeSubCategory}</span>
              </>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-5xl font-gothic text-white mb-2">{activeCategory === 'All' ? 'Full Collection' : activeCategory}</h1>
              <p className="text-zinc-500 italic">Browse our hand-crafted digital assets</p>
            </div>
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search the shadows..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border-2 border-purple-900/30 rounded-full pl-12 pr-6 py-4 focus:outline-none focus:border-purple-600/50 text-white transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-10">
            <div>
              <h3 className="text-xl font-gothic text-white mb-8 pb-4 border-b border-purple-900/30 flex items-center gap-2">
                <Filter size={18} className="text-purple-500" /> Categories
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={() => { setActiveCategory('All'); setActiveSubCategory(null); setActiveTier(null); }}
                  className={`w-full text-left px-5 py-3 rounded-xl transition-all font-bold ${activeCategory === 'All' ? 'bg-purple-900/40 text-white border border-purple-500/50 shadow-lg' : 'text-zinc-500 hover:bg-zinc-900 hover:text-purple-300'}`}
                >
                  All Graphics
                </button>
                {Object.entries(CATEGORIES_CONFIG).map(([cat, subs]) => (
                  <div key={cat} className="space-y-1">
                    <button 
                      onClick={() => { setActiveCategory(cat); setActiveSubCategory(null); setActiveTier(null); }}
                      className={`w-full text-left px-5 py-3 rounded-xl transition-all font-bold flex justify-between items-center ${activeCategory === cat ? 'bg-purple-900/20 text-purple-300 border border-purple-900/50' : 'text-zinc-400 hover:text-purple-400'}`}
                    >
                      {cat}
                      {activeCategory === cat ? <ChevronRight size={16} className="rotate-90" /> : <ChevronRight size={16} />}
                    </button>
                    
                    {activeCategory === cat && (
                      <div className="pl-6 space-y-2 py-2 animate-in slide-in-from-left-2 duration-300">
                        {Object.entries(subs).map(([sub, tiers]) => (
                          <div key={sub} className="space-y-1">
                            <button 
                              onClick={() => { setActiveSubCategory(sub); setActiveTier(null); }}
                              className={`w-full text-left text-sm py-2 px-4 rounded-lg transition-all ${activeSubCategory === sub ? 'text-purple-400 font-black bg-purple-950/20' : 'text-zinc-500 hover:text-purple-400'}`}
                            >
                              {sub}
                            </button>
                            {activeSubCategory === sub && (
                              <div className="pl-4 space-y-1 mt-1 border-l border-purple-900/30">
                                {tiers.map(tier => (
                                  <button 
                                    key={tier}
                                    onClick={() => setActiveTier(tier)}
                                    className={`w-full text-left text-xs py-1.5 px-4 rounded transition-all ${activeTier === tier ? 'text-white bg-purple-600/30 font-bold' : 'text-zinc-600 hover:text-purple-300'}`}
                                  >
                                    • {tier}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-950/30 to-black rounded-3xl border border-purple-900/30 shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
              <h4 className="font-gothic text-white text-xl mb-4">Custom Commission</h4>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed italic">Have a vision for your brand that isn't here? Our raven artisans take custom requests for all business and pet portraits.</p>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-sm font-bold text-white transition-all backdrop-blur-sm">
                Inquire Now
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-zinc-900">
              <div className="text-zinc-500 text-sm font-bold uppercase tracking-wider">
                {filteredProducts.length} Results Found
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-purple-900/30 text-purple-400 rounded-lg"><Grid size={20} /></button>
                <button className="p-2 bg-zinc-900 text-zinc-600 rounded-lg hover:text-purple-400 transition-colors"><List size={20} /></button>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProducts.map(product => (
                  <div key={product.id} className="group bg-zinc-950/50 rounded-3xl overflow-hidden border border-purple-900/20 hover:border-purple-600/40 transition-all duration-500 shadow-xl hover:shadow-purple-900/10">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.featured && (
                          <span className="bg-yellow-600/80 backdrop-blur-md text-white text-[10px] uppercase font-black px-3 py-1 rounded-full border border-yellow-400/50 flex items-center gap-1">
                             <Sparkles size={10} /> Featured
                          </span>
                        )}
                        {product.tier && (
                          <span className="bg-purple-900/80 backdrop-blur-md text-white text-[10px] uppercase font-black px-3 py-1 rounded-full border border-purple-400/30">
                            {product.tier}
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => addToCart(product)}
                          className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold shadow-2xl transform scale-90 group-hover:scale-100 transition-all hover:bg-purple-500 flex items-center gap-2"
                        >
                          <ShoppingBag size={18} /> Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="text-[10px] text-purple-500 font-black uppercase tracking-[0.2em] mb-2">{product.subCategory || product.category}</div>
                      <h3 className="text-xl font-gothic text-white mb-3 group-hover:text-purple-400 transition-colors">{product.name}</h3>
                      <p className="text-zinc-500 text-sm mb-6 leading-relaxed line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-black text-white">${product.price.toFixed(2)}</div>
                        <div className="text-xs text-zinc-700 font-bold uppercase">Digital File</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-zinc-950 rounded-3xl border-2 border-dashed border-purple-900/20">
                <ShoppingBag size={64} className="mx-auto text-zinc-800 mb-6 animate-pulse" />
                <h3 className="text-2xl font-gothic text-zinc-400 mb-4">No graphics haunting this area.</h3>
                <button onClick={() => { setActiveCategory('All'); setActiveSubCategory(null); setActiveTier(null); }} className="text-purple-500 hover:text-purple-400 font-bold underline underline-offset-4">
                  View Full Collection
                </button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};

export default ShopPage;
