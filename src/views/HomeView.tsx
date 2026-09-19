import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TemplateCard } from '../components/TemplateCard';
import {
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layout,
  Smartphone,
  Layers,
  Star,
  CheckCircle2,
  Monitor,
  Palette,
  ShieldCheck,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onFilterCategory: (categoryName: string) => void;
  onSearch: (searchTerm: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onFilterCategory,
  onSearch,
}) => {
  const { templates, categories, setActiveModal } = useApp();
  const [heroSearch, setHeroSearch] = useState('');

  const featuredTemplates = templates.filter((t) => t.isFeatured).slice(0, 6);
  const trendingTemplates = templates.filter((t) => t.isTrending).slice(0, 4);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onSearch(heroSearch.trim());
      onNavigate('templates');
    }
  };

  const handleCategoryClick = (catName: string) => {
    onFilterCategory(catName);
    onNavigate('templates');
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* Editorial Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-stone-200/80 dark:border-stone-800">
        
        {/* Subtle background ambient gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#023331]/10 via-[#fb3640]/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 dark:bg-emerald-950/40 border border-emerald-800/20 text-[#023331] dark:text-emerald-400 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#fb3640]" />
            <span>AI-Powered Website Template Discovery & Responsive Evaluation</span>
          </div>

          {/* Main Title (Exact prompt directive match) */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-stone-900 dark:text-stone-100 max-w-4xl mx-auto leading-[1.15]">
            Find the right website template for your next project.
          </h1>

          {/* Subtitle (Exact prompt directive match) */}
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Explore high-quality templates for businesses, portfolios, restaurants, blogs, and online stores. Preview in real-time across desktop, tablet, and mobile devices.
          </p>

          {/* Integrated Search Bar with AI Assistant Pill */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleHeroSearchSubmit}
              className="relative flex items-center p-1.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-300/80 dark:border-stone-700 shadow-xl focus-within:border-emerald-600 dark:focus-within:border-emerald-500 transition-all"
            >
              <div className="pl-3.5 pr-2 text-stone-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search by category, style, color, or keywords (e.g., 'dark minimal portfolio')..."
                className="flex-1 bg-transparent py-3 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
              />
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveModal('aiAssistant')}
                  className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold transition-colors"
                  title="Ask AI Assistant"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fb3640]" />
                  <span>AI Assistant</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#023331] hover:bg-[#004643] text-white text-xs font-bold transition-all shadow-sm shrink-0"
                >
                  Explore
                </button>
              </div>
            </form>

            {/* Quick Category Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 text-xs">
              <span className="text-stone-400 text-[11px] font-medium mr-1">Popular:</span>
              {['Portfolio', 'SaaS', 'Restaurant', 'Agency', 'E-commerce', 'Photography'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-[11px] font-medium transition-colors"
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Highlights Checklist */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-500" />
              <span>Multi-device Viewport Simulator</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#fb3640]" />
              <span>Semantic AI Query Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>Side-by-Side 3-Way Comparison</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#023331] dark:text-emerald-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#fb3640]" />
              Handpicked Craft
            </div>
            <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100">
              Featured Templates
            </h2>
            <p className="text-xs text-stone-500">
              Exceptional layout architecture curated for production-ready design systems.
            </p>
          </div>

          <button
            onClick={() => onNavigate('templates')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#023331] dark:text-emerald-400 hover:text-[#004643] transition-colors"
          >
            <span>Browse all {templates.length} templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* Browse by Category Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#023331] dark:text-emerald-400 mb-1">
              Taxonomy
            </div>
            <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100">
              Explore by Category
            </h2>
          </div>

          <button
            onClick={() => onNavigate('categories')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#023331] dark:text-emerald-400 hover:underline"
          >
            <span>View all 15 categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {categories.slice(0, 10).map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#131518] hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center font-bold text-xs group-hover:bg-[#023331] group-hover:text-white transition-colors">
                  {cat.name.charAt(0)}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500">
                  {cat.count}
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#023331] dark:group-hover:text-emerald-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Fastest Growing
            </div>
            <h2 className="font-display font-bold text-2xl text-stone-900 dark:text-stone-100">
              Trending Designs
            </h2>
          </div>

          <button
            onClick={() => onNavigate('templates')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#023331] dark:text-emerald-400 hover:underline"
          >
            <span>Explore all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* Architectural Value Proposition Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#023331] text-white overflow-hidden relative shadow-2xl border border-emerald-900/50">
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#fb3640] block">
              The TemplateIQ Standard
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl leading-tight">
              Engineered for discovery. Zero lock-in. 100% viewport accuracy.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
              Unlike generic website builder marketplaces that trap your code into proprietary ecosystems, TemplateIQ lets you discover, inspect, and evaluate responsive codebases crafted in clean HTML, CSS, React, and Django.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1">
                <Monitor className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-white">Live Simulator</h4>
                <p className="text-stone-300 text-[11px]">Desktop, tablet, and mobile frame testing on the fly.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1">
                <Sparkles className="w-4 h-4 text-[#fb3640]" />
                <h4 className="font-bold text-white">AI Semantic Search</h4>
                <p className="text-stone-300 text-[11px]">Describe your project in plain English to match templates.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <h4 className="font-bold text-white">Verified Creators</h4>
                <p className="text-stone-300 text-[11px]">Strict review standards for typography and performance.</p>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('templates')}
                className="px-6 py-3 rounded-xl bg-white text-stone-900 font-bold text-xs hover:bg-stone-100 transition-colors shadow-lg flex items-center gap-2"
              >
                <span>Browse Entire Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#023331]" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
