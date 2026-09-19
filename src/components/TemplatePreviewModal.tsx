import React, { useState, useMemo } from 'react';
import { Template } from '../types';
import { generateTemplatePreviewHtml } from '../data/previewGenerator';
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface TemplatePreviewModalProps {
  template: Template;
  onClose: () => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  onClose,
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [fullScreenMode, setFullScreenMode] = useState<boolean>(false);

  // Generate simulated realistic HTML
  const previewHtml = useMemo(() => {
    return generateTemplatePreviewHtml(template);
  }, [template]);

  const openInNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(previewHtml);
      newWindow.document.close();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[#0b0c0e] text-stone-100 transition-all ${
        fullScreenMode ? 'p-0' : 'p-2 sm:p-4'
      }`}
    >
      {/* Top Preview Control Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#15171c] border border-stone-800 rounded-t-xl z-20 shadow-md">
        
        {/* Left: Template Name & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[#023331] text-white flex items-center justify-center font-bold text-xs">
            Q
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm text-white flex items-center gap-2">
              {template.name}
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.2 rounded bg-stone-800 text-stone-300 uppercase">
                {template.category}
              </span>
            </span>
          </div>
        </div>

        {/* Center: Device Viewport Toggles */}
        <div className="flex items-center bg-stone-900 border border-stone-800 p-1 rounded-xl gap-1">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'desktop'
                ? 'bg-[#023331] text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
            title="Desktop Viewport (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>

          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'tablet'
                ? 'bg-[#023331] text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
            title="Tablet Viewport (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>

          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'mobile'
                ? 'bg-[#023331] text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
            title="Mobile Viewport (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Full Preview / New Tab / Close */}
        <div className="flex items-center gap-2">
          <button
            onClick={openInNewTab}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-700 hover:border-stone-500 bg-stone-800/80 text-xs text-stone-200 font-medium transition-colors"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Full Preview</span>
          </button>

          <button
            onClick={() => setFullScreenMode(!fullScreenMode)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title={fullScreenMode ? 'Exit full screen' : 'Expand full screen'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Frame Stage Container */}
      <div className="relative flex-1 w-full bg-[#0a0b0d] overflow-hidden flex items-center justify-center p-2 sm:p-6">
        <div
          className={`h-full flex items-center justify-center transition-all duration-300 ${
            viewport === 'desktop'
              ? 'w-full'
              : viewport === 'tablet'
              ? 'device-wrapper-tablet'
              : 'device-wrapper-mobile'
          }`}
        >
          {/* Simulated Mobile Top Notch / Speaker if in mobile view */}
          {viewport === 'mobile' && (
            <div className="absolute top-8 w-24 h-4 bg-black rounded-full z-30 pointer-events-none opacity-80"></div>
          )}

          <iframe
            srcDoc={previewHtml}
            title={`${template.name} Live Viewport`}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-modals"
          />
        </div>
      </div>
    </div>
  );
};
