import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { recommendTemplates } from '../services/aiService';
import { AIRecommendation, Template } from '../types';
import {
  X,
  Sparkles,
  Search,
  ArrowRight,
  Eye,
  Info,
  CheckCircle2,
  Tag,
  Palette,
  Lightbulb,
} from 'lucide-react';

interface AIAssistantModalProps {
  onClose: () => void;
  onOpenDetails: (tpl: Template) => void;
  onOpenPreview: (tpl: Template) => void;
}

const EXAMPLE_PROMPTS = [
  'I need a dark portfolio website for a Python developer.',
  'I need a website for my restaurant.',
  'I need a portfolio for a software engineer.',
  'I need a luxury fashion website.',
  'I need a SaaS landing page with dark mode and pricing tables.',
  'Editorial magazine for architecture and ceramics.',
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  onClose,
  onOpenDetails,
  onOpenPreview,
}) => {
  const { templates } = useApp();
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIRecommendation | null>(null);

  const handleRunAI = (promptText: string) => {
    if (!promptText.trim()) return;
    setQuery(promptText);
    setIsAnalyzing(true);

    setTimeout(() => {
      const rec = recommendTemplates(promptText, templates);
      setResult(rec);
      setIsAnalyzing(false);
    }, 450);
  };

  const matchedTemplates: Template[] = result
    ? (result.matchedTemplateIds
        .map((id) => templates.find((t) => t.id === id))
        .filter(Boolean) as Template[])
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl my-8 bg-white dark:bg-[#131518] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-white/95 dark:bg-[#131518]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#023331] text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-[#fb3640]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
                TemplateIQ Assistant
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950/60 text-[#fb3640] border border-[#fb3640]/30 font-semibold uppercase">
                  AI Discovery
                </span>
              </h2>
              <p className="text-xs text-stone-500">
                Natural-language semantic matching across our curated template database
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Query Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAI(query);
            }}
            className="space-y-3"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'I need a dark portfolio website for a Python developer' or 'Luxury restaurant with table booking'"
                className="w-full pl-4 pr-28 py-3.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
              <button
                type="submit"
                disabled={isAnalyzing || !query.trim()}
                className="absolute right-2 px-4 py-2 rounded-lg bg-[#023331] hover:bg-[#004643] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Ask AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Prompt Ideas */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-stone-400 flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-500" />
                Try:
              </span>
              {EXAMPLE_PROMPTS.map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => handleRunAI(prompt)}
                  className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-[11px] text-stone-700 dark:text-stone-300 transition-colors"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </form>

          {/* Results Analysis Panel */}
          {result && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Structured AI Breakdown (Section 21 JSON architecture specification) */}
              <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Intent Analysis Complete
                  </span>
                  <span className="text-[11px] text-stone-400">Safe Semantic Schema</span>
                </div>

                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                  {result.explanation}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-200 dark:border-stone-800 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                      Detected Category
                    </span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {result.category || 'Cross-category'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                      Target Style
                    </span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {result.style || 'Flexible / Modern'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                      Keywords & Signals
                    </span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {result.keywords.length > 0 ? (
                        result.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.2 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[10px] text-stone-800 dark:text-stone-200"
                          >
                            {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-stone-400 text-[11px]">General inquiry</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Matched Templates Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
                    Recommended Matching Templates ({matchedTemplates.length})
                  </h3>
                  <span className="text-xs text-stone-400">Ranked by semantic match score</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {matchedTemplates.map((tpl, idx) => (
                    <div
                      key={tpl.id}
                      className="group rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-800">
                          <img
                            src={tpl.thumbnail}
                            alt={tpl.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#023331] text-white">
                            #{idx + 1} Best Match
                          </div>
                        </div>

                        <div className="p-3.5 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-stone-500">
                            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                              {tpl.category}
                            </span>
                            <span>{tpl.style}</span>
                          </div>
                          <h4 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                            {tpl.name}
                          </h4>
                          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                            {tpl.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="p-3.5 pt-0 flex gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenPreview(tpl);
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-[#023331] text-white text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#004643]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Preview
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onOpenDetails(tpl);
                          }}
                          className="flex-1 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
