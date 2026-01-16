
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Package, Gift, Award, LogOut, ChevronRight } from 'lucide-react';
import { useApp } from '../App';
import { ADMIN_EMAIL } from '../constants';

const SignInPage = () => {
  const { user, setUser } = useApp();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const isAdmin = email === ADMIN_EMAIL;
    const userData = {
      email,
      name: isRegistering ? name : (isAdmin ? 'Admin' : 'Gothic Raven Fan'),
      isAdmin,
      orderHistory: [],
      giftCards: [{ code: 'WELCOME-10', balance: 10.00 }],
      rewardsPoints: 50
    };
    setUser(userData);
    if (isAdmin) navigate('/admin');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  if (user) {
    return (
      <div className="bg-black min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-purple-900 rounded-2xl flex items-center justify-center text-3xl font-gothic text-white">
                {user.name[0]}
              </div>
              <div>
                <h1 className="text-4xl font-gothic text-white">Welcome, {user.name}</h1>
                <p className="text-zinc-500 italic">"The raven welcomes its own."</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-900/50 transition-all rounded-lg flex items-center gap-2"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-zinc-950 p-8 rounded-3xl border border-purple-900/20 text-center">
              <Package className="mx-auto text-purple-500 mb-4" size={32} />
              <div className="text-2xl font-bold text-white mb-1">{user.orderHistory.length}</div>
              <div className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Orders Placed</div>
            </div>
            <div className="bg-zinc-950 p-8 rounded-3xl border border-purple-900/20 text-center">
              <Gift className="mx-auto text-purple-500 mb-4" size={32} />
              <div className="text-2xl font-bold text-white mb-1">${user.giftCards.reduce((s, g) => s + g.balance, 0).toFixed(2)}</div>
              <div className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Gift Card Balance</div>
            </div>
            <div className="bg-zinc-950 p-8 rounded-3xl border border-purple-900/20 text-center">
              <Award className="mx-auto text-purple-500 mb-4" size={32} />
              <div className="text-2xl font-bold text-white mb-1">{user.rewardsPoints}</div>
              <div className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Raven Points</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-zinc-950/50 p-10 rounded-3xl border border-purple-900/20">
              <h2 className="text-2xl font-gothic text-white mb-8">Order History</h2>
              {user.orderHistory.length > 0 ? (
                <div className="space-y-4">
                  {user.orderHistory.map(order => (
                    <div key={order.id} className="p-4 bg-black border border-zinc-900 rounded-xl flex justify-between items-center">
                      <div>
                        <div className="text-sm font-bold text-white">{order.id}</div>
                        <div className="text-xs text-zinc-500">{order.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-purple-400">${order.total.toFixed(2)}</div>
                        <div className="text-[10px] uppercase tracking-tighter text-zinc-600">{order.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-zinc-600">No orders found. Time to shop?</p>
                </div>
              )}
            </section>

            <section className="bg-zinc-950/50 p-10 rounded-3xl border border-purple-900/20">
              <h2 className="text-2xl font-gothic text-white mb-8">Raven Rewards</h2>
              <div className="bg-purple-900/20 p-6 rounded-2xl border border-purple-500/30 mb-8">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Earn 10 points for every $1 spent. Redeem points for exclusive shop files or discount codes.
                </p>
              </div>
              <div className="space-y-4">
                <button className="w-full p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex items-center justify-between text-white transition-all">
                  <span>Redeem 500pts for $5 Off</span>
                  <ChevronRight size={18} />
                </button>
                <button className="w-full p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex items-center justify-between text-white transition-all">
                  <span>Redeem 1000pts for Free Seamless</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </section>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(88,28,135,0.4)]">
            <span className="text-4xl font-gothic text-white">G</span>
          </div>
          <h1 className="text-3xl font-gothic text-white mb-2">{isRegistering ? 'Join the Murder' : 'Welcome Back'}</h1>
          <p className="text-zinc-500 italic">Sign in to track orders and rewards.</p>
        </div>

        <form onSubmit={handleAuth} className="bg-zinc-950 p-10 rounded-3xl border border-purple-900/30 shadow-2xl space-y-6">
          {isRegistering && (
            <div>
              <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Name</label>
              <input 
                required type="text" 
                value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" 
              />
            </div>
          )}
          <div>
            <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
            <input 
              required type="email" 
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" 
            />
          </div>
          <div>
            <label className="block text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
            <input 
              required type="password" 
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" 
            />
          </div>
          
          <button type="submit" className="w-full py-4 bg-purple-700 hover:bg-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all">
            {isRegistering ? <UserPlus size={20} /> : <LogIn size={20} />}
            {isRegistering ? 'Create Account' : 'Enter The Shadows'}
          </button>

          <div className="text-center pt-4">
            <button 
              type="button" 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-purple-400 text-sm hover:text-purple-300 transition-colors"
            >
              {isRegistering ? 'Already have an account? Sign in' : 'New here? Create an account'}
            </button>
          </div>
        </form>
        
        <p className="text-center text-zinc-700 text-[10px] mt-8 uppercase tracking-[0.2em]">
          Ghastly Raven Graphics &bull; Secure Authentication
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
