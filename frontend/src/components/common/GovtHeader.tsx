import React, { useState } from 'react';
import { Volume2, Globe, Eye } from 'lucide-react';

export const GovtHeader: React.FC = () => {
  const [fontSize, setFontSize] = useState<'normal' | 'small' | 'large'>('normal');
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  const handleFontSizeChange = (size: 'normal' | 'small' | 'large') => {
    setFontSize(size);
    if (size === 'small') {
      document.documentElement.style.fontSize = '90%';
    } else if (size === 'large') {
      document.documentElement.style.fontSize = '110%';
    } else {
      document.documentElement.style.fontSize = '100%';
    }
  };

  return (
    <div className="bg-[#1B293C] text-slate-200 text-xs border-b border-slate-700/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Official Republic of India Identity */}
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1 font-semibold text-slate-100">
            <span className="inline-block w-4 h-2.5 rounded-sm overflow-hidden shadow-xs border border-white/20">
              <span className="block h-1/3 bg-[#FF9933]" />
              <span className="block h-1/3 bg-white" />
              <span className="block h-1/3 bg-[#138808]" />
            </span>
            <span>भारत सरकार</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Government of India</span>
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300 font-medium">
            अखिल भारतीय तकनीकी शिक्षा परिषद (AICTE)
          </span>
        </div>

        {/* Right: GIGW Accessibility & Language Tools */}
        <div className="flex items-center gap-4 text-[11px] font-medium text-slate-300">
          <div className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Screen Reader Access</span>
          </div>

          {/* Font Resizing Controls */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            <span className="text-[10px] text-slate-400 mr-1 flex items-center gap-1">
              <Eye className="w-3 h-3" /> Text:
            </span>
            <button
              type="button"
              onClick={() => handleFontSizeChange('small')}
              title="Decrease text size"
              aria-label="Decrease text size"
              className={`px-1 rounded hover:bg-slate-700 transition-colors ${fontSize === 'small' ? 'text-amber-400 font-bold' : ''}`}
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => handleFontSizeChange('normal')}
              title="Normal text size"
              aria-label="Normal text size"
              className={`px-1 rounded hover:bg-slate-700 transition-colors ${fontSize === 'normal' ? 'text-amber-400 font-bold' : ''}`}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => handleFontSizeChange('large')}
              title="Increase text size"
              aria-label="Increase text size"
              className={`px-1 rounded hover:bg-slate-700 transition-colors ${fontSize === 'large' ? 'text-amber-400 font-bold' : ''}`}
            >
              A+
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 cursor-pointer hover:text-white">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <button
              type="button"
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              aria-label="Switch Language"
              className="hover:underline font-semibold"
            >
              {lang === 'EN' ? 'हिन्दी (Hindi)' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Subtle National Tricolor Strip */}
      <div className="h-[2px] w-full grid grid-cols-3">
        <div className="bg-[#FF9933]" />
        <div className="bg-white" />
        <div className="bg-[#138808]" />
      </div>
    </div>
  );
};

