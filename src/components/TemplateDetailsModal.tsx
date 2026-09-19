import React, { useState } from 'react';
import { Template } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Heart,
  Eye,
  Share2,
  CheckCircle2,
  Star,
  Layers,
  Scale,
  Calendar,
  User,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Send,
  Plus,
} from 'lucide-react';

interface TemplateDetailsModalProps {
  template: Template;
  onClose: () => void;
  onSelectTemplate?: (tpl: Template) => void;
}

export const TemplateDetailsModal: React.FC<TemplateDetailsModalProps> = ({
  template,
  onClose,
  onSelectTemplate,
}) => {
  const {
    templates,
    isFavorite,
    toggleFavorite,
    openPreview,
    comparedIds,
    addToCompare,
    removeFromCompare,
    collections,
    addTemplateToCollection,
    reviews,
    addReview,
    currentUser,
    setActiveModal,
    showToast,
  } = useApp();

  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState<boolean>(false);

  const isFav = isFavorite(template.id);
  const isCompared = comparedIds.includes(template.id);
  const templateReviews = reviews[template.id] || [];

  // Related templates (same category or style, excluding self)
  const relatedTemplates = templates
    .filter((t) => t.id !== template.id && (t.category === template.category || t.style === template.style))
    .slice(0, 3);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showToast('Template URL copied to clipboard!', 'success');
    } else {
      showToast(`Share URL: /templates/${template.slug}/`, 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setActiveModal('login');
      showToast('Please log in to leave a review.', 'info');
      return;
    }
    if (!reviewComment.trim()) {
      showToast('Please write a review comment.', 'error');
      return;
    }
    const success = addReview(template.id, selectedRating, reviewComment.trim());
    if (success) {
      setReviewComment('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-5xl my-8 bg-white dark:bg-[#121417] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-30 px-6 py-4 bg-white/95 dark:bg-[#121417]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-[#023331] text-white text-xs font-semibold uppercase tracking-wider">
              {template.category}
            </span>
            <h2 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 truncate max-w-md">
              {template.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Preview Button */}
            <button
              onClick={() => openPreview(template)}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#023331] hover:bg-[#004643] text-white font-semibold text-xs transition-colors shadow-sm"
              id="details-live-preview-btn"
            >
              <Eye className="w-4 h-4" />
              <span>Live Preview</span>
            </button>

            {/* Favorite Save Button */}
            <button
              onClick={() => toggleFavorite(template.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isFav
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-[#fb3640]'
                  : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-rose-500'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-[#fb3640]' : ''}`} />
            </button>

            {/* Compare Toggle Button */}
            <button
              onClick={() => {
                if (isCompared) removeFromCompare(template.id);
                else addToCompare(template.id);
              }}
              className={`p-2 rounded-xl border transition-colors ${
                isCompared
                  ? 'bg-[#fb3640] text-white border-[#fb3640]'
                  : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
              title="Compare template"
            >
              <Scale className="w-4 h-4" />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              title="Share template"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Close"
              aria-label="Close template details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-6 py-8 space-y-10">
          
          {/* Hero Preview Section */}
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 shadow-md">
            <img
              src={template.previewImage}
              alt={template.name}
              className="w-full h-auto max-h-[500px] object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                      {template.style} Style
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                      {template.layout} Layout
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/30 backdrop-blur-md text-emerald-200 text-xs font-semibold">
                      <Smartphone className="w-3 h-3" />
                      100% Responsive
                    </span>
                  </div>
                  <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                    {template.name}
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openPreview(template)}
                    className="px-6 py-3 rounded-xl bg-[#fb3640] hover:bg-[#e02b35] text-white font-bold text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Launch Responsive Preview</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Facts & Actions Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Price
              </span>
              <span className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
                {template.isFree ? 'Free Download' : `$${template.price} USD`}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Author & Studio
              </span>
              <span className="font-semibold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1">
                {template.author.name}
                {template.author.verified && (
                  <span title="Verified Creator">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </span>
                )}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Community Rating
              </span>
              <span className="font-semibold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                {template.ratingAvg.toFixed(2)}
                <span className="text-stone-600 dark:text-stone-400 font-normal text-xs">
                  ({template.reviewsCount} reviews)
                </span>
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Last Updated
              </span>
              <span className="font-semibold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                {template.updatedAt}
              </span>
            </div>
          </div>

          {/* Quick Action: Add to Collection */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-emerald-900/10 dark:bg-emerald-950/20 border border-emerald-800/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#023331] dark:text-emerald-400">
              <Layers className="w-4 h-4" />
              <span>Organize into personal curation collections</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setCollectionDropdownOpen(!collectionDropdownOpen)}
                className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:border-emerald-500 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-600" />
                <span>Save to Collection</span>
              </button>

              {collectionDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl py-2 z-40">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase text-stone-400 border-b border-stone-100 dark:border-stone-800">
                    Select Collection
                  </div>
                  {collections.map((col) => {
                    const alreadyIn = col.templateIds.includes(template.id);
                    return (
                      <button
                        key={col.id}
                        onClick={() => {
                          addTemplateToCollection(col.id, template.id);
                          setCollectionDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-between"
                      >
                        <span className="truncate">{col.name}</span>
                        {alreadyIn && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* "About This Template" */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
              About this template
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              {template.description}
            </p>
          </div>

          {/* "Features" Section */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
              Architectural Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {template.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-800 dark:text-stone-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#023331] dark:text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* "Perfect For" Section */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
              Perfect For
            </h3>
            <div className="flex flex-wrap gap-2">
              {template.perfectFor.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium border border-stone-200 dark:border-stone-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* "Technologies Used" */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {template.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Template Reviews & Rating Section */}
          <div className="space-y-6 pt-6 border-t border-stone-200 dark:border-stone-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
                  User Reviews & Ratings
                </h3>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  Average score {template.ratingAvg.toFixed(2)} out of 5 stars based on {template.reviewsCount} customer reviews.
                </p>
              </div>

              <div className="flex items-center gap-1 text-amber-500 font-bold text-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(template.ratingAvg)
                        ? 'fill-current text-amber-400'
                        : 'text-stone-300 dark:text-stone-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Submit New Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  Rate this template:
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setSelectedRating(num)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          num <= selectedRating
                            ? 'fill-current text-amber-400'
                            : 'text-stone-300 dark:text-stone-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience with this template's code architecture, typography, or responsiveness..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-emerald-500"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#023331] hover:bg-[#004643] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>

            {/* Existing Reviews List */}
            {templateReviews.length > 0 ? (
              <div className="space-y-3">
                {templateReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.user.avatar}
                          alt={rev.user.fullName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                          {rev.user.fullName}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          @{rev.user.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= rev.rating ? 'fill-current' : 'text-stone-300 dark:text-stone-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {rev.review}
                    </p>
                    <span className="text-[10px] text-stone-400 block">{rev.createdAt}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 italic">No community reviews submitted yet. Be the first to review!</p>
            )}
          </div>

          {/* "Related Templates" */}
          {relatedTemplates.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-800">
              <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
                Related Templates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTemplates.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      if (onSelectTemplate) onSelectTemplate(rel);
                    }}
                    className="group rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden cursor-pointer hover:border-stone-400 dark:hover:border-stone-700 transition-all p-3"
                  >
                    <img
                      src={rel.thumbnail}
                      alt={rel.name}
                      className="w-full aspect-16/10 object-cover rounded-lg mb-2 group-hover:scale-102 transition-transform"
                    />
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-900 dark:text-stone-100 mb-1">
                      <span className="truncate">{rel.name}</span>
                      <span className="text-stone-400">{rel.isFree ? 'Free' : `$${rel.price}`}</span>
                    </div>
                    <span className="text-[11px] text-stone-700 dark:text-stone-300">{rel.category} • {rel.style}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
