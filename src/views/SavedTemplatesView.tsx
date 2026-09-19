import React from 'react';
import { useApp } from '../context/AppContext';
import { TemplateCard } from '../components/TemplateCard';
import { Bookmark, Heart, ArrowRight } from 'lucide-react';

interface SavedTemplatesViewProps {
  onExploreTemplates: () => void;
}

export const SavedTemplatesView: React.FC<SavedTemplatesViewProps> = ({ onExploreTemplates }) => {
  const { templates, favoriteIds } = useApp();

  const savedTemplates = templates.filter((t) => favoriteIds.includes(t.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fb3640] mb-1">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Personal Vault</span>
        </div>
        <h1 className="font-display font-bold text-3xl text-stone-900 dark:text-stone-100">
          Saved Templates
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Quickly access your bookmarked templates across all viewports and styles.
        </p>
      </div>

      {savedTemplates.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 space-y-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950/40 text-[#fb3640] flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
            No saved templates yet
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Click the heart icon on any template card in the catalog to save it to your personal vault.
          </p>
          <button
            onClick={onExploreTemplates}
            className="px-5 py-2.5 rounded-xl bg-[#023331] text-white text-xs font-semibold hover:bg-[#004643] transition-colors"
          >
            Explore Templates
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}

    </div>
  );
};
