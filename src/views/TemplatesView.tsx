import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FilterSidebar } from '../components/FilterSidebar';
import { TemplateCard } from '../components/TemplateCard';
import { FilterState, SortOption, Template } from '../types';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Grid3X3,
  Grid2X2,
  List,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface TemplatesViewProps {
  initialCategory?: string;
  initialSearch?: string;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: '',
  styles: [],
  layouts: [],
  features: [],
  colorThemes: [],
  pricing: 'all',
  sortBy: 'popular',
};

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  initialCategory = '',
  initialSearch = '',
}) => {
  const { templates, categories, setActiveModal } = useApp();

  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    category: initialCategory,
    searchQuery: initialSearch,
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewDensity, setViewDensity] = useState<'grid-3' | 'grid-2' | 'compact'>('grid-3');

  // Filter & sort logic
  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      // Search query (search in name, description, tags, industry, category, author)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const inName = tpl.name.toLowerCase().includes(q);
        const inDesc = tpl.description.toLowerCase().includes(q);
        const inCat = tpl.category.toLowerCase().includes(q);
        const inIndustry = tpl.industry.toLowerCase().includes(q);
        const inTags = tpl.tags.some((t) => t.toLowerCase().includes(q));
        const inAuthor = tpl.author.name.toLowerCase().includes(q);

        if (!inName && !inDesc && !inCat && !inIndustry && !inTags && !inAuthor) {
          return false;
        }
      }

      // Category filter
      if (filters.category && tpl.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // Styles filter
      if (filters.styles.length > 0 && !filters.styles.includes(tpl.style)) {
        return false;
      }

      // Layouts filter
      if (filters.layouts.length > 0 && !filters.layouts.includes(tpl.layout)) {
        return false;
      }

      // Features filter (must include all selected features)
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every((f) => tpl.features.includes(f));
        if (!hasAllFeatures) return false;
      }

      // Color Theme filter
      if (filters.colorThemes.length > 0) {
        const hasColor = filters.colorThemes.includes(tpl.colorTheme);
        if (!hasColor) return false;
      }

      // Pricing filter
      if (filters.pricing === 'free' && !tpl.isFree) return false;
      if (filters.pricing === 'premium' && tpl.isFree) return false;

      return true;
    });
  }, [templates, filters]);

  // Sorting logic
  const sortedTemplates = useMemo(() => {
    const list = [...filteredTemplates];
    switch (filters.sortBy) {
      case 'newest':
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'updated':
        return list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      case 'rating':
        return list.sort((a, b) => b.ratingAvg - a.ratingAvg);
      case 'alpha':
      case 'alphabetical':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'popular':
      default:
        return list.sort((a, b) => (b.downloadsCount || 0) - (a.downloadsCount || 0));
    }
  }, [filteredTemplates, filters.sortBy]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      count: templates.filter((t) => t.category.toLowerCase() === c.name.toLowerCase()).length,
    }));
  }, [categories, templates]);

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const removeFilterTag = (type: string, value?: string) => {
    if (type === 'category') setFilters({ ...filters, category: '' });
    if (type === 'pricing') setFilters({ ...filters, pricing: 'all' });
    if (type === 'style' && value) {
      setFilters({ ...filters, styles: filters.styles.filter((s) => s !== value) });
    }
    if (type === 'layout' && value) {
      setFilters({ ...filters, layouts: filters.layouts.filter((l) => l !== value) });
    }
    if (type === 'feature' && value) {
      setFilters({ ...filters, features: filters.features.filter((f) => f !== value) });
    }
    if (type === 'color' && value) {
      setFilters({ ...filters, colorThemes: filters.colorThemes.filter((c) => c !== value) });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
            Explore Website Templates
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Discover {templates.length} handcrafted, responsive templates with live viewport previews.
          </p>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Filter by name, tags, or industry..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-emerald-600"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setActiveModal('aiAssistant')}
            className="p-2.5 rounded-xl bg-[#023331] text-white hover:bg-[#004643] transition-colors shadow-xs"
            title="Ask AI Assistant"
          >
            <Sparkles className="w-4 h-4 text-[#fb3640]" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout (Sidebar + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 shadow-xs">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              categories={categoryCounts}
              totalResults={sortedTemplates.length}
              onClear={handleClearFilters}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-5">
          
          {/* Controls Bar: Sort, View density, Mobile filter toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Total Results Count */}
            <div className="text-xs text-stone-500">
              Showing <span className="font-semibold text-stone-900 dark:text-stone-100">{sortedTemplates.length}</span> templates
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as SortOption })}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-600"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Releases</option>
                  <option value="updated">Recently Updated</option>
                  <option value="alphabetical">A–Z Alphabetical</option>
                </select>
              </div>

              {/* View Density Toggles (Desktop only) */}
              <div className="hidden sm:flex items-center bg-stone-100 dark:bg-stone-900 p-0.5 rounded-lg border border-stone-200 dark:border-stone-800">
                <button
                  onClick={() => setViewDensity('grid-3')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewDensity === 'grid-3'
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                  title="3-Column Grid"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewDensity('grid-2')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewDensity === 'grid-2'
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                  title="2-Column Grid"
                >
                  <Grid2X2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Pills (if any) */}
          {(filters.category ||
            filters.styles.length > 0 ||
            filters.layouts.length > 0 ||
            filters.features.length > 0 ||
            filters.colorThemes.length > 0 ||
            filters.pricing !== 'all') && (
            <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 text-xs">
              <span className="text-[11px] font-semibold text-stone-400 mr-1">Active:</span>

              {filters.category && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#023331] text-white text-[11px] font-medium">
                  {filters.category}
                  <button onClick={() => removeFilterTag('category')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.pricing !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[11px] font-medium capitalize">
                  {filters.pricing}
                  <button onClick={() => removeFilterTag('pricing')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.styles.map((st) => (
                <span
                  key={st}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[11px] font-medium"
                >
                  {st}
                  <button onClick={() => removeFilterTag('style', st)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {filters.layouts.map((lt) => (
                <span
                  key={lt}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[11px] font-medium"
                >
                  {lt}
                  <button onClick={() => removeFilterTag('layout', lt)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {filters.features.map((feat) => (
                <span
                  key={feat}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[11px] font-medium"
                >
                  {feat}
                  <button onClick={() => removeFilterTag('feature', feat)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <button
                onClick={handleClearFilters}
                className="text-[11px] text-[#fb3640] hover:underline font-semibold ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Templates Display Grid */}
          {sortedTemplates.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-white dark:bg-[#131518] border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="w-14 h-14 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
                No templates matched your criteria
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try loosening your style or category filters, or search for broader keywords.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-xl bg-[#023331] text-white text-xs font-semibold hover:bg-[#004643] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewDensity === 'grid-2'
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {sortedTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/75 backdrop-blur-sm lg:hidden animate-in fade-in">
          <div className="w-full max-w-xs bg-white dark:bg-[#131518] h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-4">
                <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
                  Filter Catalog
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                categories={categoryCounts}
                totalResults={sortedTemplates.length}
                onClear={handleClearFilters}
              />
            </div>

            <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#023331] text-white font-semibold text-xs"
              >
                View {sortedTemplates.length} Templates
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
