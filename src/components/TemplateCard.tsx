import React from 'react';
import { Template } from '../types';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Eye,
  Info,
  Scale,
  Star,
  Smartphone,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onOpenDetails?: (tpl: Template) => void;
  onOpenPreview?: (tpl: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onOpenDetails,
  onOpenPreview,
}) => {
  const {
    isFavorite,
    toggleFavorite,
    openPreview,
    openDetails,
    comparedIds,
    addToCompare,
    removeFromCompare,
  } = useApp();

  const isFav = isFavorite(template.id);
  const isCompared = comparedIds.includes(template.id);

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenDetails) onOpenDetails(template);
    else openDetails(template);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenPreview) onOpenPreview(template);
    else openPreview(template);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(template.id);
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(template.id);
    } else {
      addToCompare(template.id);
    }
  };

  return (
    <div
      onClick={handleDetailsClick}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-[#15171a] border border-stone-200/80 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 transition-all duration-300 hover:shadow-xl overflow-hidden cursor-pointer"
      id={`template-card-${template.slug}`}
    >
      {/* Thumbnail with interactive hover zoom and action overlay */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        <img
          src={template.thumbnail}
          alt={template.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {template.isFeatured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#023331] text-white shadow-xs">
              <Sparkles className="w-3 h-3 text-[#fb3640]" />
              Featured
            </span>
          )}
          {template.isTrending && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500 text-white shadow-xs">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
          {template.isNew && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#fb3640] text-white shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Top Right Quick Actions (Favorite & Compare) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Compare Toggle */}
          <button
            onClick={handleCompareToggle}
            title={isCompared ? 'Remove from compare' : 'Add to compare'}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-colors shadow-sm ${
              isCompared
                ? 'bg-[#fb3640] text-white'
                : 'bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          {/* Favorite Save Button */}
          <button
            onClick={handleFavoriteClick}
            title={isFav ? 'Remove from saved' : 'Save template'}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-colors shadow-sm ${
              isFav
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-300 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-white' : ''}`} />
          </button>
        </div>

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4 z-20">
          <button
            onClick={handlePreviewClick}
            className="px-4 py-2 rounded-xl bg-white text-stone-900 hover:bg-stone-100 font-semibold text-xs flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
          >
            <Eye className="w-3.5 h-3.5 text-[#023331]" />
            <span>Live Preview</span>
          </button>
          <button
            onClick={handleDetailsClick}
            className="px-4 py-2 rounded-xl bg-[#023331] text-white hover:bg-[#004643] font-semibold text-xs flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 delay-75"
          >
            <Info className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>
        </div>

        {/* Responsive Badge at Bottom Left of image */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 backdrop-blur-sm text-stone-200 border border-white/10">
            <Smartphone className="w-2.5 h-2.5 text-emerald-400" />
            Responsive
          </span>
        </div>

        {/* Price / Free Pill at Bottom Right */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 shadow-xs">
            {template.isFree ? 'Free' : `$${template.price}`}
          </span>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Style row */}
          <div className="flex items-center justify-between gap-2 text-xs text-stone-700 dark:text-stone-300 mb-1.5">
            <span className="font-semibold text-[#023331] dark:text-emerald-400 uppercase tracking-wider text-[10px]">
              {template.category}
            </span>
            <span className="text-[11px] font-medium">
              {template.style} • {template.layout}
            </span>
          </div>

          {/* Template Title */}
          <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-[#023331] dark:group-hover:text-emerald-400 transition-colors mb-1.5 leading-snug">
            {template.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-2 leading-relaxed mb-3">
            {template.shortDescription}
          </p>

          {/* Tags preview */}
          <div className="flex flex-wrap gap-1 mb-3">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-700 dark:text-stone-300 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer with Author and Rating */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs text-stone-700 dark:text-stone-300">
          <div className="flex items-center gap-1.5">
            <img
              src={template.author.avatar}
              alt={template.author.name}
              className="w-5 h-5 rounded-full object-cover border border-stone-200 dark:border-stone-700"
            />
            <span className="truncate max-w-[100px] text-[11px] font-medium">
              {template.author.name}
            </span>
          </div>

          <div className="flex items-center gap-1 text-amber-500 font-semibold text-xs">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{template.ratingAvg.toFixed(1)}</span>
            <span className="text-stone-600 dark:text-stone-400 text-[10px] font-normal">
              ({template.reviewsCount})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
