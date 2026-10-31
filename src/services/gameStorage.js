import initialGamesData from '../data/games.json';

const FAVORITES_KEY = 'vortex_favorites';
const RECENT_KEY = 'vortex_recent_played';
const CUSTOM_GAMES_KEY = 'vortex_custom_games';
const CLOAK_KEY = 'vortex_current_cloak';

export const DEFAULT_CLOAKS = [
  {
    id: 'default',
    name: 'Default Arcade',
    tabTitle: 'Vortex Arcade - Unblocked Games',
    faviconUrl: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'><path d='M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'/></svg>",
    iconName: 'Gamepad2'
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    tabTitle: 'Classes - Google Classroom',
    faviconUrl: 'https://ssl.gstatic.com/classroom/favicon.png',
    iconName: 'GraduationCap'
  },
  {
    id: 'docs',
    name: 'Google Docs',
    tabTitle: 'World History Notes - Google Docs',
    faviconUrl: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
    iconName: 'FileText'
  },
  {
    id: 'drive',
    name: 'Google Drive',
    tabTitle: 'My Drive - Google Drive',
    faviconUrl: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
    iconName: 'HardDrive'
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    tabTitle: 'Dashboard - Canvas',
    faviconUrl: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico',
    iconName: 'BookOpen'
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    tabTitle: 'Calculus - Wikipedia',
    faviconUrl: 'https://en.wikipedia.org/static/favicon/wikipedia.ico',
    iconName: 'Globe'
  }
];

export async function fetchAllGames() {
  let baseGames = initialGamesData;

  try {
    const res = await fetch('/games.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        baseGames = data;
      }
    }
  } catch (err) {
    // fallback to imported initialGamesData
  }

  // Load custom added games from localStorage
  try {
    const customJson = localStorage.getItem(CUSTOM_GAMES_KEY);
    if (customJson) {
      const customGames = JSON.parse(customJson);
      const existingIds = new Set(baseGames.map(g => g.id));
      const filteredCustom = customGames.filter(g => !existingIds.has(g.id));
      return [...filteredCustom, ...baseGames];
    }
  } catch (e) {
    console.error('Failed reading custom games', e);
  }

  return baseGames;
}

export function saveCustomGame(game) {
  try {
    const customJson = localStorage.getItem(CUSTOM_GAMES_KEY);
    const customGames = customJson ? JSON.parse(customJson) : [];
    customGames.unshift({ ...game, custom: true });
    localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(customGames));
  } catch (e) {
    console.error('Failed saving custom game', e);
  }
}

export function deleteCustomGame(gameId) {
  try {
    const customJson = localStorage.getItem(CUSTOM_GAMES_KEY);
    if (!customJson) return;
    const customGames = JSON.parse(customJson);
    const updated = customGames.filter(g => g.id !== gameId);
    localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed deleting custom game', e);
  }
}

export function getFavorites() {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function toggleFavorite(gameId) {
  try {
    const favs = getFavorites();
    const index = favs.indexOf(gameId);
    if (index >= 0) {
      favs.splice(index, 1);
    } else {
      favs.push(gameId);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return favs;
  } catch (e) {
    return [];
  }
}

export function getRecentPlayed() {
  try {
    const data = localStorage.getItem(RECENT_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function addRecentPlayed(gameId) {
  try {
    let recents = getRecentPlayed();
    recents = [gameId, ...recents.filter(id => id !== gameId)].slice(0, 8);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents));
  } catch (e) {
    console.error('Error updating recent', e);
  }
}

export function applyCloak(profile) {
  if (!profile) return;
  document.title = profile.tabTitle;
  const link = document.querySelector("link[rel*='icon']");
  if (link) {
    link.href = profile.faviconUrl;
  }
  localStorage.setItem(CLOAK_KEY, profile.id);
}

export function getSavedCloak() {
  const savedId = localStorage.getItem(CLOAK_KEY);
  return DEFAULT_CLOAKS.find(c => c.id === savedId) || DEFAULT_CLOAKS[0];
}
