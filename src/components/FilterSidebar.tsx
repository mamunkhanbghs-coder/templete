import React from 'react';
import { FilterState, StyleType, LayoutType, ColorTheme } from '../types';
import { RotateCcw, Check, Sparkles } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: { id: string; name: string; count: number }[];
  totalResults: number;
  onClear: () => void;
}

const ALL_STYLES: StyleType[] = [
  'Minimal',
  'Modern',
  'Corporate',
  'Creative',
  'Luxury',
  'Editorial',
  'Bold',
  'Dark',
  'Elegant',
];

const ALL_LAYOUTS: LayoutType[] = [
  'Grid',
  'Full Width',
  'Split Screen',
  'Editorial',
  'Landing Page',
];

const ALL_FEATURES = [
  'Responsive',
  'Dark Mode',
  'Blog',
  'E-commerce',
  'Contact Form',
  'Newsletter',
  'Gallery',
  'Booking',
  'Portfolio',
  'Animation',
];

const ALL_COLORS: { label: ColorTheme; hex: string }[] = [
  { label: 'Dark', hex: '#111827' },
  { label: 'Light', hex: '#f9fafb' },
  { label: 'Green', hex: '#023331' },
  { label: 'Red', hex: '#fb3640' },
  { label: 'Blue', hex: '#2563eb' },
  { label: 'Neutral', hex: '#78716c' },
  { label: 'Colorful', hex: 'linear-gradient(135deg, #fb3640, #004643, #2563eb)' },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  categories,
  totalResults,
  onClear,
}) => {
  const handleCategorySelect = (catName: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === catName ? '' : catName,
    });
  };

  const handleStyleToggle = (style: StyleType) => {
    const exists = filters.styles.includes(style);
    const newStyles = exists
      ? filters.styles.filter((s) => s !== style)
      : [...filters.styles, style];
    onFilterChange({ ...filters, styles: newStyles });
  };

  const handleLayoutToggle = (layout: LayoutType) => {
    const exists = filters.layouts.includes(layout);
    const newLayouts = exists
      ? filters.layouts.filter((l) => l !== layout)
      : [...filters.layouts, layout];
    onFilterChange({ ...filters, layouts: newLayouts });
  };

  const handleFeatureToggle = (feat: string) => {
    const exists = filters.features.includes(feat);
    const newFeatures = exists
      ? filters.features.filter((f) => f !== feat)
      : [...filters.features, feat];
    onFilterChange({ ...filters, features: newFeatures });
  };

  const handleColorToggle = (color: ColorTheme) => {
    const exists = filters.colorThemes.includes(color);
    const newColors = exists
      ? filters.colorThemes.filter((c) => c !== color)
      : [...filters.colorThemes, color];
    onFilterChange({ ...filters, colorThemes: newColors });
  };

  const hasActiveFilters =
    Boolean(filters.category) ||
    filters.styles.length > 0 ||
    filters.layouts.length > 0 ||
    filters.features.length > 0 ||
    filters.colorThemes.length > 0 ||
    filters.pricing !== 'all';

  return (
    <aside className="w-full space-y-6 text-sm text-stone-700 dark:text-stone-300">
      
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
            Filters
          </h3>
          <p className="text-xs text-stone-700 dark:text-stone-300">
            Showing <span className="font-semibold text-[#023331] dark:text-emerald-400">{totalResults}</span> templates
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-[#fb3640] hover:text-rose-700 font-semibold transition-colors"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Pricing Toggle */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
          Pricing
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-medium">
          {(['all', 'free', 'premium'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => onFilterChange({ ...filters, pricing: tier })}
              className={`py-1.5 rounded-lg capitalize transition-all ${
                filters.pricing === tier
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white font-bold shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2.5">
          Category
        </label>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.name)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                  isSelected
                    ? 'bg-[#023331] text-white font-semibold'
                    : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-emerald-800 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Style Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2.5">
          Style
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {ALL_STYLES.map((style) => {
            const active = filters.styles.includes(style);
            return (
              <button
                key={style}
                onClick={() => handleStyleToggle(style)}
                className={`px-2.5 py-1.5 rounded-lg text-xs text-left border transition-all flex items-center justify-between ${
                  active
                    ? 'border-[#023331] dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-[#023331] dark:text-emerald-300 font-semibold'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>{style}</span>
                {active && <Check className="w-3 h-3 text-[#023331] dark:text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Layout Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2.5">
          Layout Structure
        </label>
        <div className="space-y-1.5">
          {ALL_LAYOUTS.map((layout) => {
            const active = filters.layouts.includes(layout);
            return (
              <button
                key={layout}
                onClick={() => handleLayoutToggle(layout)}
                className={`w-full px-2.5 py-1.5 rounded-lg text-xs text-left border transition-all flex items-center justify-between ${
                  active
                    ? 'border-[#023331] dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-[#023331] dark:text-emerald-300 font-semibold'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span>{layout}</span>
                {active && <Check className="w-3 h-3 text-[#023331] dark:text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Features Checklist */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2.5">
          Features
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {ALL_FEATURES.map((feat) => {
            const checked = filters.features.includes(feat);
            return (
              <label
                key={feat}
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800/60 cursor-pointer text-xs select-none"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleFeatureToggle(feat)}
                  className="rounded text-[#023331] focus:ring-[#023331] w-3.5 h-3.5 border-stone-300 dark:border-stone-700"
                />
                <span className={checked ? 'font-semibold text-stone-900 dark:text-stone-100' : 'text-stone-700 dark:text-stone-300'}>
                  {feat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Color Palette Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2.5">
          Color Scheme
        </label>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((col) => {
            const active = filters.colorThemes.includes(col.label);
            return (
              <button
                key={col.label}
                onClick={() => handleColorToggle(col.label)}
                title={col.label}
                className={`relative w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                  active
                    ? 'ring-2 ring-offset-2 ring-[#023331] dark:ring-emerald-400 dark:ring-offset-stone-900 scale-105'
                    : 'border-stone-300 dark:border-stone-700 hover:scale-105'
                }`}
                style={{ background: col.hex }}
              >
                {active && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      col.label === 'Light' ? 'text-stone-900' : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
};
