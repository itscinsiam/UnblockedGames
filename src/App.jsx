import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Gamepad2,
  ArrowUpDown
} from 'lucide-react';
import {
  fetchAllGames,
  getFavorites,
  toggleFavorite,
  getRecentPlayed,
  addRecentPlayed,
  saveCustomGame,
  deleteCustomGame,
  applyCloak,
  getSavedCloak,
} from './services/gameStorage.js';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { TabCloakModal } from './components/TabCloakModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonViewerModal } from './components/JsonViewerModal.jsx';
import { PanicOverlay } from './components/PanicOverlay.jsx';

export default function App() {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentPlayed, setRecentPlayed] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  // Modals & Overlays
  const [isCloakModalOpen, setIsCloakModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [currentCloak, setCurrentCloak] = useState(getSavedCloak());

  // Load games and user preferences on mount
  useEffect(() => {
    async function loadData() {
      const allGames = await fetchAllGames();
      setGames(allGames);
      setFavorites(getFavorites());
      setRecentPlayed(getRecentPlayed());
      const cloak = getSavedCloak();
      setCurrentCloak(cloak);
      applyCloak(cloak);
    }
    loadData();
  }, []);

  // Global Panic Key listener (`\` or Escape during panic)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if typing in an input or textarea
      const target = e.target;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      if (e.key === '\\') {
        e.preventDefault();
        setIsPanicActive(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Game selection
  const handleSelectGame = (game) => {
    setSelectedGame(game);
    addRecentPlayed(game.id);
    setRecentPlayed(getRecentPlayed());
  };

  // Handle Favorite toggle
  const handleToggleFavorite = (gameId, e) => {
    if (e) e.stopPropagation();
    const updated = toggleFavorite(gameId);
    setFavorites([...updated]);
  };

  // Handle Custom Game creation
  const handleAddCustomGame = (newGame) => {
    saveCustomGame(newGame);
    setGames(prev => [newGame, ...prev]);
  };

  // Handle Custom Game deletion
  const handleDeleteCustomGame = (gameId, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this custom game?')) {
      deleteCustomGame(gameId);
      setGames(prev => prev.filter(g => g.id !== gameId));
      if (selectedGame?.id === gameId) setSelectedGame(null);
    }
  };

  // Handle Cloak change
  const handleSelectCloak = (profile) => {
    setCurrentCloak(profile);
    applyCloak(profile);
    setIsCloakModalOpen(false);
  };

  // Play Random game
  const handlePlayRandom = () => {
    if (games.length === 0) return;
    const randomGame = games[Math.floor(Math.random() * games.length)];
    handleSelectGame(randomGame);
  };

  // Filter and sort games
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = game.title.toLowerCase().includes(q);
          const matchesDesc = game.description.toLowerCase().includes(q);
          const matchesCategory = game.category.toLowerCase().includes(q);
          const matchesTag = game.tags?.some(t => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesTag) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory === 'Favorites') {
          return favorites.includes(game.id);
        }
        if (selectedCategory === 'Recent') {
          return recentPlayed.includes(game.id);
        }
        if (selectedCategory !== 'All') {
          return game.category.toLowerCase() === selectedCategory.toLowerCase();
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return (b.rating ?? 0) - (a.rating ?? 0);
        }
        if (sortBy === 'name') {
          return a.title.localeCompare(b.title);
        }
        // default popular (based on plays number)
        const parsePlays = (p) => {
          if (!p) return 0;
          const num = parseFloat(p.replace(/[^0-9.]/g, ''));
          return p.toUpperCase().includes('K') ? num * 1000 : num;
        };
        return parsePlays(b.plays) - parsePlays(a.plays);
      });
  }, [games, searchQuery, selectedCategory, favorites, recentPlayed, sortBy]);

  // Featured game for the hero spotlight
  const featuredGame = useMemo(() => {
    return games.find(g => g.id === '2048') || games[0];
  }, [games]);

  const categories = [
    'All',
    'Favorites',
    'Recent',
    'Arcade',
    'Puzzle',
    'Action',
    'Retro',
    'Strategy'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Panic Overlay (Full-screen disguise) */}
      {isPanicActive && (
        <PanicOverlay onExit={() => setIsPanicActive(false)} />
      )}

      {/* Top Bar Navigation */}
      <Navbar
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenCloakModal={() => setIsCloakModalOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onTriggerPanic={() => setIsPanicActive(true)}
      />

      {/* Hero Section */}
      <Hero
        totalGames={games.length}
        onPlayRandom={handlePlayRandom}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        featuredGame={featuredGame}
        onSelectGame={handleSelectGame}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Filter Bar & Controls */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search games, categories, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown & Quick Counts */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}
              </div>
            </div>
          </div>

          {/* Category Filter Tabs (Interactive Segmented Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80'
                  }`}
                >
                  {cat === 'Favorites' && '★ '}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.includes(game.id)}
                onSelect={handleSelectGame}
                onToggleFavorite={handleToggleFavorite}
                onViewCode={() => {
                  setSelectedGame(game);
                }}
                onDeleteCustom={game.custom ? handleDeleteCustomGame : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
            <Gamepad2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300 mb-1">
              No games found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {searchQuery
                ? `No games matched "${searchQuery}". Try a different keyword.`
                : 'No games in this category yet.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Active Game Player Modal / Viewport */}
      {selectedGame && (
        <GamePlayer
          game={selectedGame}
          isFavorite={favorites.includes(selectedGame.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedGame(null)}
          onViewJson={() => {
            setSelectedGame(null);
            setIsJsonModalOpen(true);
          }}
        />
      )}

      {/* Tab Cloak Modal */}
      {isCloakModalOpen && (
        <TabCloakModal
          currentCloak={currentCloak}
          onSelectCloak={handleSelectCloak}
          onClose={() => setIsCloakModalOpen(false)}
        />
      )}

      {/* Add Custom Game Modal */}
      {isAddModalOpen && (
        <AddGameModal
          onAddGame={handleAddCustomGame}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {/* JSON File Inspector & Export Modal */}
      {isJsonModalOpen && (
        <JsonViewerModal
          games={games}
          onClose={() => setIsJsonModalOpen(false)}
        />
      )}

      {/* Clean Footer (No fake engines, clean links & copyright) */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Vortex Arcade</span>
            <span aria-hidden="true">·</span>
            <span>HTML5 Iframe Hub</span>
            <span aria-hidden="true">·</span>
            <span>JSON Database</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              games.json
            </button>
            <button
              onClick={() => setIsCloakModalOpen(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Tab Cloaking
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Add Custom Game
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
