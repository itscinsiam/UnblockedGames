import React from 'react';
import { ShieldAlert, Gamepad2 } from 'lucide-react';

export const Navbar = ({
  onSelectCategory,
  onOpenAddModal,
  onOpenCloakModal,
  onOpenJsonModal,
  onTriggerPanic,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand title wordmark, single element */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <span>Vortex Arcade</span>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => onSelectCategory('All')}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            All Games
          </button>
          <button
            onClick={() => onSelectCategory('Favorites')}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Favorites
          </button>
          <button
            onClick={onOpenAddModal}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Add Game
          </button>
          <button
            onClick={onOpenCloakModal}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Tab Cloak
          </button>
          <button
            onClick={onOpenJsonModal}
            className="hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            View JSON
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onTriggerPanic}
            title="Panic key: press \ on your keyboard anytime"
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800/60 rounded-lg hover:bg-rose-900/80 hover:text-white transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Panic Key</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-rose-900/60 text-rose-200 rounded border border-rose-700/50 font-mono">
              \
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
