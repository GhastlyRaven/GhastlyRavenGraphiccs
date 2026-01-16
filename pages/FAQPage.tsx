
import React, { useState } from 'react';
import { Facebook, MessageSquare, Star, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_REVIEWS, FAQS } from '../constants';
import { useApp } from '../App';

const FAQItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-purple-900/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg transition-colors ${isOpen ? 'text-purple-400 font-bold' : 'text-zinc-300 group-hover:text-purple-400'}`}>{q}</span>
        {isOpen ? <ChevronUp className="text-purple-500" /> : <ChevronDown className="text-zinc-500" />}
      </button>
      {isOpen && (
        <div className="pb-8 text-zinc-400 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
          {a}
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const { addContactSubmission } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContactSubmission({
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      date: new Date().toISOString()
    });
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-black min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-20">
          <h1 className="text-5xl font-gothic text-white mb-4">Raven Resources</h1>
          <p className="text-purple-400 font-serif italic text-lg">Support, reviews, and community connections.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* FAQ and Community */}
          <div className="space-y-16">
            
            {/* FB Connection */}
            <section className="bg-gradient-to-br from-purple-950/40 to-black p-10 rounded-3xl border border-purple-900/30">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Facebook size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-gothic text-white">Join the Coven</h2>
                  <p className="text-zinc-400">Access exclusive tutorials and group sales.</p>
                </div>
              </div>
              <p className="text-zinc-300 mb-8 leading-relaxed">
                Our Facebook group is the heart of Ghastly Raven. Connect with fellow small shop owners, share your creations, and get first looks at new files.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-all border border-blue-500/30"
              >
                Go to Facebook Group <Facebook size={18} />
              </a>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-3xl font-gothic text-white mb-8 flex items-center gap-4">
                <MessageSquare className="text-purple-500" /> Frequently Asked
              </h2>
              <div className="space-y-2">
                {/* Updated to pass props explicitly instead of using spread to fix key assignability error */}
                {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-3xl font-gothic text-white mb-10">What Clients Say</h2>
              <div className="space-y-6">
                {MOCK_REVIEWS.map(review => (
                  <div key={review.id} className="p-8 bg-zinc-950 rounded-2xl border border-purple-900/20">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-700'} />
                      ))}
                    </div>
                    <p className="text-zinc-300 italic mb-4 leading-relaxed">"{review.text}"</p>
                    <div className="text-purple-400 font-bold text-sm uppercase tracking-widest">— {review.author}</div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Contact Form & Policies */}
          <div className="space-y-16">
            
            <section className="bg-zinc-900/30 p-10 rounded-3xl border border-purple-900/30 backdrop-blur-sm">
              <h2 className="text-3xl font-gothic text-white mb-8">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-zinc-500 text-sm mb-2">Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-500 text-sm mb-2">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-500 text-sm mb-2">Subject</label>
                  <input 
                    required
                    type="text" 
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 text-sm mb-2">Message</label>
                  <textarea 
                    required
                    rows={6}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black border border-purple-900/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 resize-none"
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-purple-700 hover:bg-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all">
                  <Send size={20} /> Send Message
                </button>
                {submitted && (
                  <p className="text-green-500 text-center font-bold animate-pulse">Message sent! We'll be in touch soon.</p>
                )}
              </form>
            </section>

            <section className="bg-zinc-950 p-10 rounded-3xl border border-zinc-900">
              <h2 className="text-3xl font-gothic text-white mb-8">Shop Policies</h2>
              <div className="space-y-8 text-zinc-400">
                <div>
                  <h4 className="font-bold text-white mb-2 uppercase text-sm tracking-widest">Digital Usage</h4>
                  <p className="text-sm leading-relaxed">All digital files are for personal or small business use. Mass production requires a separate license. No re-selling of digital files as-is.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2 uppercase text-sm tracking-widest">Refunds</h4>
                  <p className="text-sm leading-relaxed">Due to the immediate delivery of digital goods, we cannot offer refunds. If a file is corrupt, we will replace it immediately.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2 uppercase text-sm tracking-widest">Privacy</h4>
                  <p className="text-sm leading-relaxed">Your data is only used to fulfill orders and is never sold to third parties.</p>
                </div>
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQPage;
