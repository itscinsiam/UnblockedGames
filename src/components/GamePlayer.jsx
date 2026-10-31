import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  RotateCw,
  ExternalLink,
  Star,
  Code2,
  Tv,
  Check,
  Gamepad2,
  Info
} from 'lucide-react';

export const GamePlayer = ({
  game,
  isFavorite,
  onToggleFavorite,
  onClose,
  onViewJson,
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  // Keyboard shortcut: ESC to exit theater / fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        if (isTheater) setIsTheater(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTheater]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) {
      console.error('Fullscreen error', e);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  const handleCopyIframe = () => {
    const code = game.iframeCode || `<iframe src="${game.iframeUrl}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Open in about:blank cloaked tab
  const handleOpenAboutBlank = () => {
    try {
      const win = window.open('about:blank', '_blank');
      if (win) {
        win.document.title = game.title;
        win.document.body.style.margin = '0';
        win.document.body.style.height = '100vh';
        win.document.body.style.overflow = 'hidden';
        win.document.body.style.backgroundColor = '#0f172a';
        
        const iframe = win.document.createElement('iframe');
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.margin = '0';
        iframe.allow = 'fullscreen; autoplay';
        iframe.src = window.location.origin + game.iframeUrl;
        win.document.body.appendChild(iframe);
      }
    } catch (e) {
      console.error('Unable to open popup window', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md overflow-y-auto flex flex-col p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Top Bar inside modal */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 py-2 mb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Back to library"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
              <span>{game.category}</span>
              <span aria-hidden="true">·</span>
              <span>Iframe Embed</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
              {game.title}
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onToggleFavorite(game.id)}
            title={isFavorite ? 'Remove favorite' : 'Add to favorites'}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-amber-950/40 border-amber-800 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Star className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>

          <button
            onClick={handleReload}
            title="Reload game frame"
            className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsTheater(prev => !prev)}
            title={isTheater ? 'Default view' : 'Theater mode'}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isTheater
                ? 'bg-indigo-950/60 border-indigo-700 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Tv className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            title="Fullscreen"
            className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleOpenAboutBlank}
            title="Cloak into about:blank new tab"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>about:blank</span>
          </button>

          <button
            onClick={handleCopyIframe}
            title="Copy iframe HTML code"
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{copiedCode ? 'Copied!' : 'Copy Iframe'}</span>
          </button>
        </div>
      </div>

      {/* Main Game Screen Viewport */}
      <div
        ref={containerRef}
        className={`mx-auto w-full transition-all duration-300 flex flex-col items-center justify-center ${
          isTheater ? 'max-w-7xl' : 'max-w-4xl'
        } ${isFullscreen ? 'h-screen p-0 bg-black' : ''}`}
      >
        <div className="w-full relative aspect-[4/3] max-h-[75vh] min-h-[460px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={game.iframeUrl}
            title={game.title}
            className="w-full h-full border-0 block"
            allow="fullscreen; autoplay; gamepad; focus-without-user-activation"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>

      {/* Game Details, Cheatsheet & Iframe Source Info */}
      {!isFullscreen && (
        <div
          className={`mx-auto w-full mt-4 transition-all duration-300 ${
            isTheater ? 'max-w-7xl' : 'max-w-4xl'
          }`}
        >
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* About */}
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                <span>ABOUT THIS GAME</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {game.description}
              </p>

              {/* Tags */}
              {game.tags && (
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                  <span>Tags:</span>
                  {game.tags.map((t, i) => (
                    <React.Fragment key={t}>
                      <span className="text-slate-300">{t}</span>
                      {i < game.tags.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Controls Cheatsheet */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>HOW TO PLAY</span>
              </div>
              <p className="text-xs text-slate-300 font-mono leading-normal">
                {game.controls || 'Use mouse or keyboard controls'}
              </p>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
                Click inside the game window if keyboard inputs are not responding.
              </div>
            </div>
          </div>

          {/* Stored Iframe JSON Snippet */}
          <div className="mt-3 bg-slate-900/40 border border-slate-800/60 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono text-indigo-300">games.json Entry:</span>
              <button
                onClick={onViewJson}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                Inspect Full games.json
              </button>
            </div>
            <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-3 rounded-lg overflow-x-auto border border-slate-800/80">
              {JSON.stringify(
                {
                  id: game.id,
                  title: game.title,
                  category: game.category,
                  iframeUrl: game.iframeUrl,
                  iframeCode: game.iframeCode
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
