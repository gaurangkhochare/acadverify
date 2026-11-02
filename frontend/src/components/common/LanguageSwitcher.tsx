import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const LANGUAGES: Language[] = [
  { code: 'EN', name: 'English', nativeName: 'English' },
  { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'MR', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'TA', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'TE', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'BN', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'GU', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'KN', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

export interface LanguageSwitcherProps {
  variant?: 'dark' | 'light';
  className?: string;
  showFullLabel?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dark',
  className = '',
  showFullLabel = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeCode, setActiveCode] = useState<string>(() => {
    return localStorage.getItem('apaar_preferred_lang') || 'EN';
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { notify } = useNotification();

  const activeLang = LANGUAGES.find((l) => l.code === activeCode) || LANGUAGES[0];

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLanguage = (lang: Language) => {
    setActiveCode(lang.code);
    localStorage.setItem('apaar_preferred_lang', lang.code);
    setIsOpen(false);

    if (notify) {
      notify(
        'info',
        'Language Updated',
        `Active interface language set to ${lang.nativeName} (${lang.name}).`
      );
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select Language"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none ${
          isDark
            ? 'bg-white/10 hover:bg-white/20 active:bg-white/25 text-blue-100 hover:text-white border border-white/20 shadow-sm'
            : 'bg-slate-100 hover:bg-slate-200 active:bg-slate-250 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
        }`}
      >
        <Globe className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-amber-300' : 'text-[#0B3C88]'}`} />
        <span className="font-bold tracking-wide">
          {showFullLabel ? activeLang.name : activeLang.code}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'opacity-70'
          }`}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Available Languages"
          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-150 origin-top-right focus:outline-none"
        >
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
            Regional Languages
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === activeCode;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 text-[#0B3C88] font-bold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{lang.nativeName}</span>
                    <span className="text-[11px] text-slate-400">({lang.name})</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0B3C88] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

