import React from 'react';
import { Dices, Code2, Sparkles, Layers } from 'lucide-react';

export const Hero = ({
  totalGames,
  onPlayRandom,
  onOpenJsonModal,
  featuredGame,
  onSelectGame,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 border-b border-slate-900">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Title & Value Prop */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span>Client-Side Iframe Repository</span>
              <span aria-hidden="true">·</span>
              <span>JSON-Driven Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Unblocked Games Hub for Smooth Browser Play
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl text-balance">
              Every game is cleanly defined as an iframe embed stored in a modular JSON database.
              Play with full-screen support, theater view, instant tab cloaking, and panic mode.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onPlayRandom}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all cursor-pointer shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                <Dices className="w-4 h-4" />
                <span>Play Random Game</span>
              </button>

              <button
                onClick={onOpenJsonModal}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Inspect games.json</span>
              </button>
            </div>

            {/* Metadata proof points (strict zero-pill rule: unboxed text with typographic separators) */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-3">
              <span className="font-semibold text-slate-300">{totalGames} Games Indexed</span>
              <span aria-hidden="true">·</span>
              <span>Sandboxed Iframes</span>
              <span aria-hidden="true">·</span>
              <span>No AI Required</span>
              <span aria-hidden="true">·</span>
              <span>100% Offline Capable</span>
            </div>
          </div>

          {/* Featured Spotlight Card */}
          {featuredGame && (
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-2xl relative group overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="text-indigo-400 font-semibold tracking-wide">FEATURED GAME</span>
                  <span>{featuredGame.category}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                  {featuredGame.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                  {featuredGame.description}
                </p>

                {/* Metadata & Launch CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono text-amber-400 font-semibold">★ {featuredGame.rating ?? 4.9}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{featuredGame.plays ?? '100K+'} plays</span>
                  </div>

                  <button
                    onClick={() => onSelectGame(featuredGame)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 border border-slate-700 rounded-lg group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Launch Game</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
