import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, CheckCircle2, Github, Linkedin, Twitter, Instagram, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { showToast, setActiveModal } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast("You're subscribed.", 'success');
  };

  return (
    <footer className="w-full bg-[#171616] text-stone-300 border-t border-stone-800 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section with Brand and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-stone-800/80">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#023331] text-white flex items-center justify-center font-display font-bold text-lg border border-emerald-800/50">
                Q
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Template<span className="text-[#fb3640]">IQ</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              The premier template discovery and viewport preview architecture. Discover, evaluate, and test responsive digital design layouts engineered for discerning creators.
            </p>
            <div className="pt-2 flex items-center gap-3 text-stone-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center hover:text-white hover:border-stone-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center hover:text-white hover:border-stone-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center hover:text-white hover:border-stone-500 transition-colors"
                aria-label="X Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-stone-700 flex items-center justify-center hover:text-white hover:border-stone-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-7 flex flex-col justify-center bg-stone-900/60 p-6 sm:p-8 rounded-2xl border border-stone-800">
            <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#fb3640]" />
              Subscribe to the TemplateIQ Dispatch
            </h3>
            <p className="text-xs text-stone-400 mb-4 max-w-md">
              Receive bi-weekly drops of curated new templates, architectural typography critiques, and early access to featured releases.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/40 px-4 py-3 rounded-xl border border-emerald-800/40 text-sm font-medium animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You&apos;re subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email..."
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#023331] hover:bg-[#004643] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-xs">
          
          {/* Product Column */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4 text-[11px]">
              Product
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={() => onNavigate('templates')} className="hover:text-white transition-colors">
                  Explore Templates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Browse Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collections')} className="hover:text-white transition-colors">
                  Curated Collections
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('aiAssistant')} className="hover:text-white transition-colors flex items-center gap-1 text-[#fb3640]">
                  AI Template Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4 text-[11px]">
              Resources
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('compare')} className="hover:text-white transition-colors">
                  Template Comparison Matrix
                </button>
              </li>
              <li>
                <a href="#responsive" onClick={() => onNavigate('templates')} className="hover:text-white transition-colors">
                  Responsive Viewport Simulator
                </a>
              </li>
              <li>
                <a href="#author-guidelines" onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Designer Submissions
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4 text-[11px]">
              Company
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About TemplateIQ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Tech & Architecture */}
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4 text-[11px]">
              Architecture
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed mb-3">
              Engineered with Python 3.13, Django 5+, PostgreSQL, and high-contrast responsive interface systems.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900 border border-stone-800 text-[11px] text-stone-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              All systems operational
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-stone-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© 2026 TemplateIQ. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-stone-300 transition-colors">
              Privacy
            </button>
            <button onClick={() => onNavigate('terms')} className="hover:text-stone-300 transition-colors">
              Terms
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-stone-300 transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
