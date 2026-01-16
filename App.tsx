
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  User as UserIcon, 
  HelpCircle, 
  Home as HomeIcon, 
  ShoppingCart, 
  Menu, 
  X, 
  Github,
  Facebook,
  Instagram,
  Settings
} from 'lucide-react';
import { Product, CartItem, User, ContactForm, Order } from './types';
import { ADMIN_EMAIL, INITIAL_PRODUCTS } from './constants';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import FAQPage from './pages/FAQPage';
import CartPage from './pages/CartPage';
import SignInPage from './pages/SignInPage';
import AdminPage from './pages/AdminPage';

// Context
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  contactSubmissions: ContactForm[];
  addContactSubmission: (submission: ContactForm) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const Header = () => {
  const { user, cart } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Shop', path: '/shop', icon: ShoppingBag },
    { label: 'FAQ', path: '/faq', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-purple-900/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center group-hover:bg-purple-700 transition-colors">
            <span className="text-2xl font-gothic text-white">G</span>
          </div>
          <span className="text-xl md:text-2xl font-gothic tracking-widest text-white group-hover:text-purple-400 transition-colors">
            GHASTLY RAVEN <span className="hidden sm:inline">GRAPHICS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`hover:text-purple-400 transition-colors font-medium ${location.pathname === item.path ? 'text-purple-500' : 'text-zinc-400'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-zinc-400 hover:text-purple-400">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
          <Link to="/signin" className="p-2 text-zinc-400 hover:text-purple-400">
            <UserIcon size={24} />
          </Link>
          {user?.isAdmin && (
            <Link to="/admin" className="p-2 text-zinc-400 hover:text-purple-400">
              <Settings size={24} />
            </Link>
          )}
          <button className="md:hidden p-2 text-zinc-400" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-purple-900/50 p-4 absolute w-full animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="flex items-center gap-3 p-2 text-zinc-300 hover:bg-purple-900/20 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-purple-900/50 pt-16 pb-8">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div>
        <h3 className="text-xl font-gothic mb-6 text-purple-400">Ghastly Raven</h3>
        <p className="text-zinc-500 leading-relaxed italic">
          Crafting dark elegance and gothic aesthetics for your digital world. 
          Specializing in seamless files, business branding, and custom art.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h4>
        <ul className="space-y-4 text-zinc-400">
          <li><Link to="/shop" className="hover:text-purple-400">The Shop</Link></li>
          <li><Link to="/faq" className="hover:text-purple-400">FAQ & Policies</Link></li>
          <li><Link to="/signin" className="hover:text-purple-400">My Account</Link></li>
          <li><Link to="/cart" className="hover:text-purple-400">Cart</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white uppercase tracking-wider">Socials</h4>
        <div className="flex gap-4">
          <a href="#" className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:bg-purple-900 hover:text-white transition-all">
            <Facebook size={20} />
          </a>
          <a href="#" className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:bg-purple-900 hover:text-white transition-all">
            <Instagram size={20} />
          </a>
          <a href="#" className="p-3 bg-zinc-900 rounded-full text-zinc-400 hover:bg-purple-900 hover:text-white transition-all">
            <Github size={20} />
          </a>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white uppercase tracking-wider">Contact</h4>
        <p className="text-zinc-400 mb-2">ghastlyravengraphics@gmail.com</p>
        <p className="text-zinc-500 text-sm">Based in the Shadows, Est. 2024</p>
      </div>
    </div>
    <div className="container mx-auto px-4 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
      &copy; {new Date().getFullYear()} Ghastly Raven Graphics. All rights reserved.
    </div>
  </footer>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [contactSubmissions, setContactSubmissions] = useState<ContactForm[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const addContactSubmission = (submission: ContactForm) => {
    setContactSubmissions(prev => [submission, ...prev]);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    if (user) {
      setUser({ ...user, orderHistory: [order, ...user.orderHistory] });
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, cart, addToCart, removeFromCart, clearCart, 
      products, setProducts, contactSubmissions, addContactSubmission,
      orders, addOrder 
    }}>
      <HashRouter>
        <div className="min-h-screen flex flex-col selection:bg-purple-900 selection:text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
}
