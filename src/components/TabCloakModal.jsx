import React, { useState } from 'react';
import { X, Check, ShieldAlert, Globe, GraduationCap, FileText, HardDrive, BookOpen, Sparkles } from 'lucide-react';
import { DEFAULT_CLOAKS } from '../services/gameStorage.js';

export const TabCloakModal = ({
  currentCloak,
  onSelectCloak,
  onClose,
}) => {
  const [customTitle, setCustomTitle] = useState('');
  const [customFavicon, setCustomFavicon] = useState('');

  const getIcon = (name) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-blue-400" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-amber-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-rose-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-slate-300" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  const handleApplyCustom = (e) => {
    e.preventDefault();
    if (!customTitle) return;
    const customProfile = {
      id: 'custom-' + Date.now(),
      name: 'Custom Cloak',
      tabTitle: customTitle,
      faviconUrl: customFavicon || 'https://www.google.com/favicon.ico',
      iconName: 'Globe',
    };
    onSelectCloak(customProfile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-400" />
              <span>Tab Cloak & Stealth Settings</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Disguise this browser tab title and favicon to appear like school or work software.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset profiles */}
        <div className="mt-5 space-y-2.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Quick Disguise Presets
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DEFAULT_CLOAKS.map((profile) => {
              const isSelected = currentCloak.id === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => onSelectCloak(profile)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/50 border-indigo-500/80 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getIcon(profile.iconName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">{profile.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{profile.tabTitle}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-indigo-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Cloak Form */}
        <form onSubmit={handleApplyCustom} className="mt-5 pt-4 border-t border-slate-800 space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Custom Disguise
          </label>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Custom Tab Title (e.g. Geometry Homework)"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="Custom Favicon URL (optional)"
              value={customFavicon}
              onChange={(e) => setCustomFavicon(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
          >
            Apply Custom Disguise
          </button>
        </form>

        {/* Panic hotkey note */}
        <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-400">
          <span>Instant Emergency Hotkey:</span>
          <div className="flex items-center gap-1 font-mono text-rose-300">
            <kbd className="px-2 py-0.5 bg-rose-950 border border-rose-800 rounded text-xs font-bold">
              \
            </kbd>
            <span className="text-[11px] text-slate-400">or Panic button</span>
          </div>
        </div>
      </div>
    </div>
  );
};
