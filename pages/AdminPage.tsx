
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Package, MessageSquare, Plus, PlusCircle, Trash2, Edit3, Save, X, Star, Settings } from 'lucide-react';
import { useApp } from '../App';
import { Product } from '../types';
import { CATEGORIES_CONFIG } from '../constants';

const AdminPage = () => {
  const { user, products, setProducts, orders, contactSubmissions } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'messages' | 'layout'>('inventory');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', 
    price: 0, 
    category: 'Small Shop Files', 
    subCategory: 'Seamless', 
    tier: 'Exclusive', 
    description: '', 
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800',
    featured: false
  });

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-red-500 font-gothic mb-4">ACCESS DENIED</h1>
          <p className="text-zinc-500 mb-8">Only the Raven Master may enter this domain.</p>
          <button onClick={() => navigate('/')} className="px-8 py-3 bg-zinc-900 text-white rounded-full">Return Home</button>
        </div>
      </div>
    );
  }

  const handleAddProduct = () => {
    const productToAdd: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name || 'Untitled',
      price: Number(newProduct.price) || 0,
      category: newProduct.category || 'Other',
      subCategory: newProduct.subCategory,
      tier: newProduct.tier,
      description: newProduct.description || '',
      image: newProduct.image || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800',
      featured: newProduct.featured
    };
    setProducts([...products, productToAdd]);
    setIsAddingProduct(false);
    setNewProduct({ name: '', price: 0, category: 'Small Shop Files', subCategory: 'Seamless', tier: 'Exclusive', description: '', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800', featured: false });
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Admin Sidebar Header */}
      <div className="bg-zinc-950 border-b border-purple-900/30 p-8">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-4xl font-gothic text-white mb-1">Coven Master Dashboard</h1>
            <p className="text-purple-400 italic text-sm">Controlling the aesthetic and inventory.</p>
          </div>
          <div className="flex bg-black p-1 rounded-2xl border border-zinc-900 shadow-inner">
            {[
              { id: 'inventory', label: 'Inventory', icon: LayoutGrid },
              { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
              { id: 'messages', label: `Inbox (${contactSubmissions.length})`, icon: MessageSquare },
              { id: 'layout', label: 'Layout', icon: Settings }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-purple-900 text-white shadow-lg' : 'text-zinc-500 hover:text-purple-300'}`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {activeTab === 'inventory' && (
          <div className="space-y-12">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-gothic text-white">Full Inventory</h2>
              <button 
                onClick={() => setIsAddingProduct(true)}
                className="flex items-center gap-2 px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-purple-900/30"
              >
                <PlusCircle size={20} /> Add New Graphic
              </button>
            </div>

            {isAddingProduct && (
              <div className="bg-zinc-900/50 backdrop-blur-md p-10 rounded-3xl border-2 border-purple-500/30 animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl text-white font-gothic">Summon New Asset</h3>
                  <button onClick={() => setIsAddingProduct(false)} className="text-zinc-500 hover:text-white p-2 bg-black rounded-full"><X size={24} /></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                  <div className="space-y-4">
                    <label className="block text-xs text-zinc-500 font-bold uppercase tracking-widest">Graphic Name</label>
                    <input 
                      type="text" value={newProduct.name} 
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-xs text-zinc-500 font-bold uppercase tracking-widest">Base Price ($)</label>
                    <input 
                      type="number" value={newProduct.price} 
                      onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                      className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-xs text-zinc-500 font-bold uppercase tracking-widest">Main Category</label>
                    <select 
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                    >
                      {Object.keys(CATEGORIES_CONFIG).map(cat => <option key={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-xs text-zinc-500 font-bold uppercase tracking-widest">Featured Status</label>
                    <button 
                      onClick={() => setNewProduct({...newProduct, featured: !newProduct.featured})}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${newProduct.featured ? 'bg-yellow-600/20 border-yellow-500 text-yellow-500' : 'bg-black border-zinc-800 text-zinc-500'}`}
                    >
                      <Star size={18} fill={newProduct.featured ? "currentColor" : "none"} /> {newProduct.featured ? 'Featured' : 'Standard'}
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <label className="block text-xs text-zinc-500 font-bold uppercase tracking-widest">Product Description</label>
                  <textarea 
                    value={newProduct.description}
                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    rows={4}
                    className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 resize-none"
                  ></textarea>
                </div>

                <button 
                  onClick={handleAddProduct}
                  className="w-full py-5 bg-purple-700 hover:bg-purple-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-purple-900/40"
                >
                  <Save size={24} /> Add to Collection
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(p => (
                <div key={p.id} className="bg-zinc-950 rounded-3xl border border-zinc-900 p-8 group relative">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img src={p.image} className="w-24 h-24 rounded-2xl object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                      {p.featured && <Star size={20} className="absolute -top-2 -right-2 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xl text-white font-gothic mb-1 truncate">{p.name}</h4>
                      <p className="text-xs text-purple-500 font-bold uppercase mb-2">{`${p.category} > ${p.subCategory}`}
</p>
                      <div className="text-2xl font-black text-white">${p.price.toFixed(2)}</div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => toggleFeatured(p.id)}
                        className={`p-3 rounded-xl transition-all ${p.featured ? 'bg-yellow-900/20 text-yellow-500' : 'bg-zinc-900 text-zinc-700 hover:text-yellow-500'}`}
                        title="Toggle Featured"
                      >
                        <Star size={18} fill={p.featured ? "currentColor" : "none"} />
                      </button>
                      <button onClick={() => removeProduct(p.id)} className="p-3 bg-zinc-900 text-zinc-700 hover:text-red-500 rounded-xl transition-all shadow-md">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-12">
            <h2 className="text-3xl font-gothic text-white mb-8">Homepage Configuration</h2>
            <div className="bg-zinc-950 p-10 rounded-3xl border border-purple-900/30">
              <h3 className="text-xl text-purple-400 mb-6 font-gothic">Hero Graphic</h3>
              <div className="flex gap-6 items-center">
                <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000" className="w-48 h-24 object-cover rounded-xl border border-zinc-800" />
                <button className="px-6 py-3 bg-zinc-900 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-all">
                  Change Hero Image
                </button>
              </div>
            </div>
            <div className="bg-zinc-950 p-10 rounded-3xl border border-purple-900/30">
              <h3 className="text-xl text-purple-400 mb-6 font-gothic">Featured Items (Max 3)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.filter(p => p.featured).map(p => (
                  <div key={p.id} className="p-4 bg-black rounded-2xl border border-purple-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={p.image} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="text-white text-sm font-bold">{p.name}</span>
                    </div>
                    <button onClick={() => toggleFeatured(p.id)} className="text-zinc-600 hover:text-red-500 p-2">
                      <X size={18} />
                    </button>
                  </div>
                ))}
                {products.filter(p => p.featured).length < 3 && (
                  <div className="p-4 bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-800 flex items-center justify-center text-zinc-600 italic text-sm">
                    Select more items from inventory
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-gothic text-white mb-8">Manifest of Sales</h2>
            {orders.length > 0 ? (
              <div className="overflow-x-auto bg-zinc-950 rounded-3xl border border-zinc-900">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-zinc-500 text-xs uppercase tracking-widest border-b border-zinc-900">
                      <th className="py-6 px-8 font-black">Order ID</th>
                      <th className="py-6 px-8 font-black">Date</th>
                      <th className="py-6 px-8 font-black">Customer</th>
                      <th className="py-6 px-8 font-black">Items</th>
                      <th className="py-6 px-8 font-black">Total</th>
                      <th className="py-6 px-8 font-black">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/50">
                    {orders.map(order => (
                      <tr key={order.id} className="text-zinc-300 hover:bg-purple-950/10 transition-colors">
                        <td className="py-6 px-8 font-black text-white">{order.id}</td>
                        <td className="py-6 px-8">{order.date}</td>
                        <td className="py-6 px-8">
                          <div className="text-white font-bold">Anonymous Raven</div>
                          <div className="text-xs text-zinc-600">{order.customerEmail}</div>
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex -space-x-3">
                            {order.items.map((item, idx) => (
                              <img key={idx} src={item.image} className="w-10 h-10 rounded-full border-2 border-black object-cover" title={item.name} />
                            ))}
                          </div>
                        </td>
                        <td className="py-6 px-8 text-purple-400 font-black text-xl">${order.total.toFixed(2)}</td>
                        <td className="py-6 px-8">
                          <select className="bg-black border border-zinc-800 text-xs font-bold text-zinc-400 rounded-lg px-3 py-1 uppercase">
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-32 bg-zinc-950 rounded-3xl border border-dashed border-zinc-900">
                <Package className="mx-auto text-zinc-800 mb-6" size={64} />
                <p className="text-zinc-500 italic">The order manifest is currently blank.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-gothic text-white mb-8">Inbound Whispers</h2>
            {contactSubmissions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {contactSubmissions.map(msg => (
                  <div key={msg.id} className="bg-zinc-950 p-10 rounded-3xl border border-purple-900/20 hover:border-purple-500/30 transition-all shadow-xl">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-2xl text-white font-gothic mb-1">{msg.subject}</h3>
                        <p className="text-purple-500 font-bold text-sm tracking-wider uppercase">{msg.name}</p>
                        <p className="text-zinc-600 text-xs">{msg.email}</p>
                      </div>
                      <span className="text-zinc-800 text-xs font-black">{new Date(msg.date).toLocaleDateString()}</span>
                    </div>
                    <div className="bg-black/40 p-6 rounded-2xl border border-zinc-900 italic text-zinc-400 leading-relaxed text-lg mb-8">
                      "{msg.message}"
                    </div>
                    <div className="flex gap-4">
                      <a href={`mailto:${msg.email}`} className="flex-grow py-3 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-xl text-center transition-all">
                        Send Response
                      </a>
                      <button className="px-6 py-3 bg-zinc-900 text-zinc-600 hover:text-red-500 rounded-xl transition-all">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-zinc-950 rounded-3xl border border-dashed border-zinc-900">
                <MessageSquare className="mx-auto text-zinc-800 mb-6" size={64} />
                <p className="text-zinc-500 italic">No whispers from the outside world yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
