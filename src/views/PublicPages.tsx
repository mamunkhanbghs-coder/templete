import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  Mail,
  Send,
  ShieldCheck,
  Zap,
  Globe,
  Monitor,
  Code2,
  Award,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-in fade-in">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#023331] dark:text-emerald-400">
          Craft & Philosophy
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-stone-900 dark:text-stone-100">
          Redefining How the World Discovers Website Architecture
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
          TemplateIQ was born from a simple realization: modern website builders lock creators into rigid walled gardens with inflated monthly subscriptions. We created a pure discovery platform where users can evaluate pristine responsive designs with total freedom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 space-y-2">
          <Monitor className="w-6 h-6 text-[#023331] dark:text-emerald-400 mb-2" />
          <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
            Real Viewport Accuracy
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Our multi-device preview simulator renders templates in authentic desktop, tablet (768px), and mobile (390px) viewports before you write a single line of code.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 space-y-2">
          <Sparkles className="w-6 h-6 text-[#fb3640] mb-2" />
          <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
            Semantic AI Discovery
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Natural language intent mapping understands context like &ldquo;dark minimal developer portfolio&rdquo; and matches real templates without hallucinations.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 space-y-2">
          <Code2 className="w-6 h-6 text-amber-500 mb-2" />
          <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
            Open Standards & Code
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Every template is verified for semantic HTML5, accessible typography, contrast compliance, and clean Tailwind and Django integration patterns.
          </p>
        </div>
      </div>
    </div>
  );
};

export const PricingView: React.FC = () => {
  const { showToast } = useApp();

  const handleSelectPlan = (planName: string) => {
    showToast(`You selected the ${planName} plan!`, 'info');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-in fade-in">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#023331] dark:text-emerald-400">
          Transparent Licensing
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl text-stone-900 dark:text-stone-100">
          Plans for Creators, Studios & Agencies
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
          Start for free to discover and simulate templates. Upgrade when you need commercial licenses, Figma sources, and priority updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
        
        {/* Free Tier */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
              Community Free
            </h3>
            <p className="text-xs text-stone-500">Perfect for exploring and finding design inspiration.</p>
            <div className="font-display font-extrabold text-4xl text-stone-900 dark:text-stone-100">
              $0 <span className="text-xs text-stone-400 font-normal">/ forever</span>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300 pt-4 border-t border-stone-100 dark:border-stone-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unlimited template discovery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Multi-device viewport simulator</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>3 personal collections</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>AI Template Assistant</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Community Free')}
            className="w-full py-3 rounded-xl border border-stone-300 dark:border-stone-700 font-semibold text-xs text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Get Started Free
          </button>
        </div>

        {/* Creator Pro */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-[#023331] text-white border-2 border-emerald-500 shadow-2xl flex flex-col justify-between space-y-6 transform md:-translate-y-2">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#fb3640] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
            Most Popular
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-white">Creator Pro</h3>
            <p className="text-xs text-stone-300">Commercial licenses and full source packages.</p>
            <div className="font-display font-extrabold text-4xl text-white">
              $19 <span className="text-xs text-stone-300 font-normal">/ month</span>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-200 pt-4 border-t border-emerald-900/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Everything in Free</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited commercial usage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>HTML5, Tailwind & React code downloads</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Figma source design files</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited private collections</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Creator Pro')}
            className="w-full py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs transition-colors shadow-md"
          >
            Start 14-Day Free Trial
          </button>
        </div>

        {/* Agency Studio */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
              Agency Lifetime
            </h3>
            <p className="text-xs text-stone-500">Unrestricted access for digital firms and studios.</p>
            <div className="font-display font-extrabold text-4xl text-stone-900 dark:text-stone-100">
              $299 <span className="text-xs text-stone-400 font-normal">/ one-time</span>
            </div>

            <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300 pt-4 border-t border-stone-100 dark:border-stone-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Lifetime access to all current & future templates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unlimited client end-products</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Django & full-stack template boilerplates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Priority creator support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Agency Lifetime')}
            className="w-full py-3 rounded-xl border border-stone-300 dark:border-stone-700 font-semibold text-xs text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Purchase Lifetime
          </button>
        </div>

      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been sent to the TemplateIQ team.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-in fade-in">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#023331] dark:text-emerald-400">
          Support & Inquiries
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100">
          Get in Touch with TemplateIQ
        </h1>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Have questions about licensing, submitting a template, or integrating with your tech stack? We are here to help.
        </p>
      </div>

      <div className="bg-white dark:bg-[#131518] p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xs">
        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
              Message Received
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Thank you, {name}. Our architectural review team typically responds within 24 business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-200"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maya@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Licensing query, template submission, or feedback"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Your Message *
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="How can we assist your workflow?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#023331] hover:bg-[#004643] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const TermsPrivacyView: React.FC<{ type: 'terms' | 'privacy' }> = ({ type }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6 animate-in fade-in">
      <h1 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100">
        {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
      </h1>
      <p className="text-xs text-stone-400">Effective Date: January 1, 2026</p>

      <div className="prose dark:prose-invert text-xs text-stone-600 dark:text-stone-300 space-y-4 leading-relaxed">
        <p>
          Welcome to TemplateIQ. By accessing our template discovery platform, responsive simulators, and community curation tools, you agree to comply with our standards of open web craftsmanship and intellectual property respect.
        </p>
        <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 pt-2">
          1. Template Usage & Licensing
        </h3>
        <p>
          All templates cataloged on TemplateIQ are licensed under either MIT, Apache 2.0, or specific Creator Commercial licenses indicated on the template details page. Users retain full rights to derivative works created using these designs.
        </p>
        <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 pt-2">
          2. Privacy & Telemetry
        </h3>
        <p>
          We do not sell personal data. Search queries processed through our AI Assistant are sanitized and evaluated strictly for intent classification and template database indexing.
        </p>
      </div>
    </div>
  );
};
