import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Category, Template } from '../types';
import { TemplateCard } from '../components/TemplateCard';
import { ArrowRight, ArrowLeft, Layers, Sparkles } from 'lucide-react';

interface CategoriesViewProps {
  onSelectCategoryFilter: (categoryName: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategoryFilter }) => {
  const { categories, templates } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categoryTemplates = selectedCategory
    ? templates.filter(
        (t) => t.category.toLowerCase() === selectedCategory.name.toLowerCase()
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Category Detail Mode */}
      {selectedCategory ? (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Back Navigation */}
          <button
            onClick={() => setSelectedCategory(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </button>

          {/* Hero Banner for Category */}
          <div className="relative rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 shadow-lg p-8 sm:p-12 text-white">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#fb3640] block">
                Category Taxonomy
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl">
                {selectedCategory.name}
              </h1>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                {selectedCategory.description}
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm font-semibold">
                  {categoryTemplates.length} Templates available
                </span>
                <button
                  onClick={() => onSelectCategoryFilter(selectedCategory.name)}
                  className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Open in advanced catalog filters</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Templates in this Category */}
          <div className="space-y-6">
            <h2 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
              {selectedCategory.name} Templates ({categoryTemplates.length})
            </h2>

            {categoryTemplates.length === 0 ? (
              <div className="py-12 text-center rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-500 text-xs">
                No templates in this category yet. Check back soon for new additions!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTemplates.map((tpl) => (
                  <TemplateCard key={tpl.id} template={tpl} />
                ))}
              </div>
            )}
          </div>

        </div>
      ) : (
        /* All Categories Overview Grid */
        <div className="space-y-8">
          
          {/* Header */}
          <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#023331] dark:text-emerald-400 block mb-1">
              Curated Taxonomy
            </span>
            <h1 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100">
              All 15 Website Categories
            </h1>
            <p className="text-xs text-stone-500 mt-1 max-w-xl">
              From developer portfolios and tech SaaS applications to boutique restaurants and luxury fashion houses.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const count = templates.filter(
                (t) => t.category.toLowerCase() === cat.name.toLowerCase()
              ).length;

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="group relative rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#131518] hover:border-stone-400 dark:hover:border-stone-600 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#023331]/10 dark:bg-emerald-950/50 text-[#023331] dark:text-emerald-400 flex items-center justify-center font-bold text-base border border-emerald-800/20 group-hover:bg-[#023331] group-hover:text-white transition-colors">
                        {cat.name.charAt(0)}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[11px] font-semibold text-stone-600 dark:text-stone-300">
                        {count} Templates
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-[#023331] dark:group-hover:text-emerald-400 transition-colors">
                      {cat.name}
                    </h3>

                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="px-6 py-3.5 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/30 flex items-center justify-between text-xs font-semibold text-[#023331] dark:text-emerald-400 group-hover:text-[#004643]">
                    <span>View Category Templates</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
