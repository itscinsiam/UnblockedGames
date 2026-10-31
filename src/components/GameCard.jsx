import React from 'react';
import { Star, Play, Code2, Trash2 } from 'lucide-react';

export const GameCard = ({
  game,
  isFavorite,
  onSelect,
  onToggleFavorite,
  onViewCode,
  onDeleteCustom,
}) => {
  return (
    <div
      onClick={() => onSelect(game)}
      className="group relative bg-slate-900/70 hover:bg-slate-900 border border-slate-800/90 hover:border-slate-700 rounded-xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Top row: Category & Favorite button */}
      <div>
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2.5">
          <span className="font-medium text-indigo-400">{game.category}</span>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => onViewCode(game, e)}
              title="View Iframe Code"
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => onToggleFavorite(game.id, e)}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-1.5 rounded-md transition-colors ${
                isFavorite
                  ? 'text-amber-400 hover:text-amber-300'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Star className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>

            {game.custom && onDeleteCustom && (
              <button
                onClick={(e) => onDeleteCustom(game.id, e)}
                title="Delete custom game"
                className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/60 rounded-md transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1.5 line-clamp-1">
          {game.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {game.description}
        </p>

        {/* Tags (Zero-Pill: Clean unboxed text with · separators) */}
        {game.tags && game.tags.length > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-4 truncate">
            {game.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {idx < game.tags.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Bottom stats & Launch affordance */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-mono text-amber-400 font-medium">★ {game.rating ?? 4.8}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{game.plays ?? '50K+'}</span>
        </div>

        <span className="flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
          <Play className="w-3 h-3 fill-current" />
          <span>Play</span>
        </span>
      </div>
    </div>
  );
};
