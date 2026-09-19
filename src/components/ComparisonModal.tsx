import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Scale,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
  Plus,
} from 'lucide-react';

interface ComparisonModalProps {
  onClose: () => void;
  onExploreTemplates: () => void;
}

const ALL_POSSIBLE_FEATURES = [
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

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  onClose,
  onExploreTemplates,
}) => {
  const {
    templates,
    comparedIds,
    removeFromCompare,
    clearCompare,
    openPreview,
    openDetails,
  } = useApp();

  const comparedTemplates = templates.filter((t) => comparedIds.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-5xl my-8 bg-white dark:bg-[#131518] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-white/95 dark:bg-[#131518]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-[#fb3640]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
                Template Comparison Matrix
              </h2>
              <p className="text-xs text-stone-500">
                Evaluating {comparedTemplates.length} of 3 selected templates side by side
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {comparedTemplates.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-500 hover:text-rose-700 font-semibold transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6">
          {comparedTemplates.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
                No templates selected for comparison
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Click the comparison icon on any template card in the catalog to add up to 3 templates to this evaluation matrix.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreTemplates();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#023331] text-white text-xs font-semibold hover:bg-[#004643] transition-colors"
              >
                Explore Templates
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800">
                    <th className="py-4 px-4 font-semibold text-stone-400 w-44 uppercase tracking-wider text-[10px]">
                      Attribute
                    </th>
                    {comparedTemplates.map((tpl) => (
                      <th key={tpl.id} className="py-4 px-4 w-64 min-w-[220px]">
                        <div className="space-y-2">
                          <div className="relative rounded-xl overflow-hidden aspect-16/10 border border-stone-200 dark:border-stone-800">
                            <img
                              src={tpl.thumbnail}
                              alt={tpl.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => removeFromCompare(tpl.id)}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors"
                              title="Remove from comparison"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <h4 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                            {tpl.name}
                          </h4>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                onClose();
                                openPreview(tpl);
                              }}
                              className="flex-1 py-1.5 rounded-lg bg-[#023331] text-white text-[11px] font-semibold flex items-center justify-center gap-1 hover:bg-[#004643]"
                            >
                              <Eye className="w-3 h-3" />
                              Preview
                            </button>
                            <button
                              onClick={() => {
                                onClose();
                                openDetails(tpl);
                              }}
                              className="flex-1 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-[11px] font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                    {comparedTemplates.length < 3 && (
                      <th className="py-4 px-4 w-64 min-w-[200px] border-l border-dashed border-stone-200 dark:border-stone-800 text-center">
                        <button
                          onClick={() => {
                            onClose();
                            onExploreTemplates();
                          }}
                          className="w-full h-44 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-col items-center justify-center gap-2 hover:border-emerald-500 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                        >
                          <Plus className="w-6 h-6 text-stone-400" />
                          <span className="text-xs font-semibold">Add Template</span>
                        </button>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                  
                  {/* Category */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-stone-500 dark:text-stone-400">Category</td>
                    {comparedTemplates.map((t) => (
                      <td key={t.id} className="py-3 px-4 font-medium text-stone-900 dark:text-stone-100">
                        {t.category}
                      </td>
                    ))}
                  </tr>

                  {/* Style */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-stone-500 dark:text-stone-400">Style</td>
                    {comparedTemplates.map((t) => (
                      <td key={t.id} className="py-3 px-4 text-stone-800 dark:text-stone-200">
                        {t.style}
                      </td>
                    ))}
                  </tr>

                  {/* Layout */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-stone-500 dark:text-stone-400">Layout Structure</td>
                    {comparedTemplates.map((t) => (
                      <td key={t.id} className="py-3 px-4 text-stone-800 dark:text-stone-200">
                        {t.layout}
                      </td>
                    ))}
                  </tr>

                  {/* Pricing */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-stone-500 dark:text-stone-400">Price</td>
                    {comparedTemplates.map((t) => (
                      <td key={t.id} className="py-3 px-4 font-bold text-stone-900 dark:text-stone-100">
                        {t.isFree ? 'Free' : `$${t.price}`}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-stone-500 dark:text-stone-400">Rating</td>
                    {comparedTemplates.map((t) => (
                      <td key={t.id} className="py-3 px-4">
                        <div className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{t.ratingAvg.toFixed(1)}</span>
                          <span className="text-stone-400 text-[10px]">({t.reviewsCount})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Responsive */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-stone-500 dark:text-stone-400">Responsive Viewports</td>
                    {comparedTemplates.map((t) => (
                      <td key={t.id} className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Yes (Mobile, Tablet, Desktop)
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Author */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-stone-500 dark:text-stone-400">Creator</td>
                    {comparedTemplates.map((t) => (
                      <td key={t.id} className="py-3 px-4 text-stone-800 dark:text-stone-200">
                        {t.author.name}
                      </td>
                    ))}
                  </tr>

                  {/* Last Updated */}
                  <tr>
                    <td className="py-3 px-4 font-semibold text-stone-500 dark:text-stone-400">Last Updated</td>
                    {comparedTemplates.map((t) => (
                      <td key={t.id} className="py-3 px-4 text-stone-500 dark:text-stone-400">
                        {t.updatedAt}
                      </td>
                    ))}
                  </tr>

                  {/* Features Matrix rows */}
                  {ALL_POSSIBLE_FEATURES.map((feature) => (
                    <tr key={feature}>
                      <td className="py-2.5 px-4 text-stone-600 dark:text-stone-400 font-medium">{feature}</td>
                      {comparedTemplates.map((t) => {
                        const hasFeature = t.features.includes(feature);
                        return (
                          <td key={t.id} className="py-2.5 px-4">
                            {hasFeature ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-stone-300 dark:text-stone-700" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
