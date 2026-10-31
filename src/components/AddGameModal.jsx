import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export const AddGameModal = ({
  onAddGame,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [iframeInput, setIframeInput] = useState('');
  const [controls, setControls] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [testUrl, setTestUrl] = useState('');

  // Extract URL from input if full <iframe> was pasted, or use string as URL
  const extractUrl = (raw) => {
    const trimmed = raw.trim();
    if (trimmed.startsWith('<iframe')) {
      const match = trimmed.match(/src=["']([^"']+)["']/i);
      return match ? match[1] : '';
    }
    return trimmed;
  };

  const handleTestPreview = () => {
    const url = extractUrl(iframeInput);
    setTestUrl(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !iframeInput) return;

    const url = extractUrl(iframeInput);
    const iframeCode = iframeInput.trim().startsWith('<iframe')
      ? iframeInput.trim()
      : `<iframe src="${url}" title="${title}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;

    const tags = tagsInput
      ? tagsInput.split(',').map(t => t.trim()).filter(Boolean)
      : [category, 'Web'];

    const newGame = {
      id: 'custom-' + Date.now(),
      title,
      category,
      description: description || 'Custom added unblocked iframe game.',
      iframeUrl: url,
      iframeCode,
      controls: controls || 'Standard mouse and keyboard controls',
      rating: 5.0,
      plays: '1',
      tags,
      custom: true,
      accentColor: '#6366f1'
    };

    onAddGame(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              <span>Add Game to Iframe Repository</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add any web game using its iframe embed code or playable URL.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Game Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Slope Unblocked"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Retro">Retro</option>
                <option value="Strategy">Strategy</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Iframe Embed Code or URL *
            </label>
            <textarea
              required
              rows={3}
              placeholder='Paste full &lt;iframe src="https://..."&gt;&lt;/iframe&gt; or direct game URL'
              value={iframeInput}
              onChange={(e) => {
                setIframeInput(e.target.value);
                setTestUrl(extractUrl(e.target.value));
              }}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 font-mono focus:outline-none focus:border-indigo-500"
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-[11px] text-slate-400">
                Stored directly as an iframe embed in the JSON index.
              </span>
              <button
                type="button"
                onClick={handleTestPreview}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                Preview Iframe
              </button>
            </div>
          </div>

          {/* Live Preview Container if testing */}
          {testUrl && (
            <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950 p-2">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                <span>Live Frame Preview:</span>
                <span className="font-mono text-indigo-400 truncate max-w-xs">{testUrl}</span>
              </div>
              <div className="w-full h-44 bg-black rounded overflow-hidden">
                <iframe
                  src={testUrl}
                  title="Test Preview"
                  className="w-full h-full border-0"
                  allow="fullscreen; autoplay"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Brief Description
            </label>
            <input
              type="text"
              placeholder="What makes this game exciting?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Controls Hint
              </label>
              <input
                type="text"
                placeholder="e.g. Arrow keys to steer, Space to boost"
                value={controls}
                onChange={(e) => setControls(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. 3D, Speed, Reflex"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save Game to JSON</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
