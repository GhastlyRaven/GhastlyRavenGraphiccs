
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../App';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, addOrder, user } = useApp();
  const navigate = useNavigate();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [email, setEmail] = useState(user?.email || '');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('checkout');
  };

  const handleFinalize = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      total: total,
      status: 'pending' as const,
      items: [...cart],
      customerEmail: email
    };
    addOrder(newOrder);
    setCheckoutStep('success');
    clearCart();
  };

  if (checkoutStep === 'success') {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-zinc-950 p-12 rounded-3xl border border-purple-900/30 shadow-2xl">
          <div className="w-24 h-24 bg-purple-900/30 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <CheckCircle2 size={56} />
          </div>
          <h1 className="text-4xl font-gothic text-white mb-4">The Shadows Deliver</h1>
          <p className="text-zinc-400 mb-10 leading-relaxed text-lg">
            Thank you for supporting Ghastly Raven Graphics. Your digital artifacts have been sent to <strong>{email}</strong>.
          </p>
          <button 
            onClick={() => navigate('/shop')}
            className="w-full py-5 bg-purple-700 hover:bg-purple-600 text-white rounded-2xl font-black text-lg transition-all shadow-lg hover:shadow-purple-900/40"
          >
            Explore More Graphics
          </button>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'checkout') {
    return (
      <div className="bg-black min-h-screen py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <button onClick={() => setCheckoutStep('cart')} className="flex items-center gap-2 text-zinc-500 hover:text-purple-400 mb-12 font-bold group">
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" /> Back to Cauldron
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <h2 className="text-5xl font-gothic text-white">Final Ritual</h2>
              <form onSubmit={handleFinalize} className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-purple-500 uppercase tracking-[0.3em]">Billing & Delivery</h3>
                  <div className="bg-zinc-950/50 p-8 rounded-3xl border border-purple-900/30 space-y-6">
                    <div>
                      <label className="block text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-2">Delivery Email</label>
                      <input 
                        required type="email" placeholder="raven@shadows.com" 
                        value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full bg-black border border-purple-900/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-2">Card Details</label>
                      <input 
                        required type="text" placeholder="Card Number (Mock)" 
                        className="w-full bg-black border border-purple-900/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 transition-all mb-4" 
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input required type="text" placeholder="MM/YY" className="bg-black border border-purple-900/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500" />
                        <input required type="text" placeholder="CVV" className="bg-black border border-purple-900/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zinc-600 text-sm italic">
                  <Lock size={16} className="text-green-600" />
                  Encryption active. Your purchase is protected by the Coven.
                </div>
                <button type="submit" className="w-full py-5 bg-purple-700 hover:bg-purple-600 text-white rounded-2xl font-black text-xl transition-all shadow-2xl hover:shadow-purple-900/50">
                  Authorize - ${total.toFixed(2)}
                </button>
              </form>
            </div>
            
            <div className="bg-zinc-950 p-10 rounded-[3rem] border border-purple-900/20 h-fit shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-900/10 blur-[5rem]" />
              <h3 className="text-2xl font-gothic text-white mb-8 border-b border-zinc-900 pb-4">Manifest</h3>
              <div className="space-y-6 mb-10">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <img src={item.image} className="w-12 h-12 rounded-xl object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{item.name}</div>
                        <div className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <span className="text-white font-black">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-8 border-t border-zinc-900">
                <div className="flex justify-between text-zinc-500 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-500 text-sm">
                  <span>Digital Service Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-white font-black text-2xl pt-6">
                  <span className="font-gothic">Total</span>
                  <span className="text-purple-500">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-6xl font-gothic text-white mb-16 tracking-tighter">Your <span className="text-purple-600">Cauldron</span></h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-8 space-y-6">
              {cart.map(item => (
                <div key={item.id} className="bg-zinc-950/40 p-8 rounded-[2rem] border border-purple-900/20 flex flex-col sm:flex-row gap-8 items-center hover:border-purple-500/30 transition-all group">
                  <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden rounded-2xl">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <div className="text-[10px] text-purple-600 font-black uppercase tracking-[0.2em] mb-1">{item.category}</div>
                    <h3 className="text-2xl font-gothic text-white mb-2 group-hover:text-purple-400 transition-colors">{item.name}</h3>
                    <p className="text-zinc-600 text-sm italic">{item.tier ? `Special Tier: ${item.tier}` : 'Standard Artifact'}</p>
                    <div className="mt-4 text-3xl font-black text-white">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 bg-black px-4 py-2 rounded-xl border border-zinc-900">
                      <span className="text-zinc-500 text-xs font-bold uppercase">Qty</span>
                      <span className="text-white font-black text-lg">{item.quantity}</span>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-4 text-zinc-800 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
              
              <Link to="/shop" className="inline-flex items-center gap-3 text-purple-500 hover:text-purple-400 font-black text-lg mt-8 uppercase tracking-widest group">
                <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" /> Continue Gathering
              </Link>
            </div>

            <div className="lg:col-span-4 h-fit sticky top-28">
              <div className="bg-zinc-950 p-10 rounded-[3rem] border border-purple-900/20 shadow-2xl space-y-10 relative overflow-hidden">
                 <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl" />
                <h2 className="text-3xl font-gothic text-white border-b border-zinc-900 pb-4">Tribute</h2>
                <div className="space-y-6">
                  <div className="flex justify-between text-zinc-500 text-sm uppercase font-bold tracking-widest">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 text-sm uppercase font-bold tracking-widest">
                    <span>Processing</span>
                    <span>$0.00</span>
                  </div>
                  <div className="pt-8 border-t border-zinc-900 flex justify-between text-white text-3xl font-black">
                    <span className="font-gothic">Total</span>
                    <span className="text-purple-500">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-5 bg-purple-700 hover:bg-purple-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all shadow-xl hover:shadow-purple-900/40 transform hover:-translate-y-1"
                >
                  Authorize Checkout <Lock size={20} />
                </button>
                <div className="text-center space-y-2">
                  <p className="text-[10px] text-zinc-700 uppercase font-black tracking-[0.3em]">Instant Digital Access</p>
                  <p className="text-[9px] text-zinc-800 uppercase tracking-widest">Immediate delivery to your inbox</p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-48 bg-zinc-950/30 rounded-[4rem] border-2 border-dashed border-purple-900/10">
            <ShoppingBag size={80} className="mx-auto text-zinc-900 mb-8 animate-pulse" />
            <h2 className="text-4xl font-gothic text-zinc-600 mb-12 italic">The cauldron lies dormant.</h2>
            <Link 
              to="/shop" 
              className="px-16 py-5 bg-purple-900/20 hover:bg-purple-900/40 text-purple-400 border border-purple-500/30 rounded-full font-black text-xl transition-all shadow-lg"
            >
              Seek Graphics
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartPage;
