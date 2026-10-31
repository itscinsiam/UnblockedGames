import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode } from 'lucide-react';

export const JsonViewerModal = ({
  games,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  // Format the JSON cleanly
  const jsonString = JSON.stringify(
    games.map(g => ({
      id: g.id,
      title: g.title,
      category: g.category,
      description: g.description,
      iframeUrl: g.iframeUrl,
      iframeCode: g.iframeCode || `<iframe src="${g.iframeUrl}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`,
      controls: g.controls,
      rating: g.rating,
      plays: g.plays,
      tags: g.tags,
      accentColor: g.accentColor,
      custom: g.custom
    })),
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-400" />
              <span>games.json File Repository</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live representation of games stored as iframes in JSON format.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code block */}
        <div className="mt-4 flex-1 overflow-auto bg-slate-950 rounded-xl p-4 border border-slate-800/80 font-mono text-xs text-slate-300">
          <pre>{jsonString}</pre>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Total games in JSON: <span className="font-semibold text-white font-mono">{games.length}</span>
          </div>
          <div>File path: <code className="text-indigo-300">/public/games.json</code></div>
        </div>
      </div>
    </div>
  );
};
