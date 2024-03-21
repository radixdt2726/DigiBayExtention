// 1 hour
const maxCacheAge = 1 * 60 * 60 * 1000;
const loadTiles = async () => {
  const rawCache = localStorage.getItem('tilesCache');

  let parsedCache = null;
  try {
    parsedCache = JSON.parse(rawCache);
  } catch {}

  if (
    parsedCache === null ||
    (!parsedCache.hasOwnProperty('date') || !parsedCache.hasOwnProperty('tiles')) ||
    new Date() - new Date(parsedCache.date) > maxCacheAge
  ) {
    const data = await fetchTiles();
    const newCache = {
      date: new Date(),
      tiles: data,
    };

    localStorage.setItem('tilesCache', JSON.stringify(newCache));
    return data;
  }

  return parsedCache.tiles;
}

const fetchTiles = async () => {
  const response = await fetch('https://data.quicktab.org/tiles.json');
  return await response.json();
}

const requiredTileKeys = [
  'link',
  'logo',
  'title',
];

document.addEventListener('DOMContentLoaded', function () {
  const tiles = document.getElementById('tiles');
  const userLanguage = navigator.language || navigator.userLanguage || 'en-EN';

  (async function () {
    const result = await loadTiles();
    // Fallback auf en-EN falls wir die Sprache nicht konfiguriert haben
    const tileData = result[userLanguage] || result['en-EN'];

    const config = await loadConfig();

    for (const index in tileData) {
      const data = tileData[index];

      const hasMissingKey = !requiredTileKeys.every((requiredKey) => data.hasOwnProperty(requiredKey));
      if (hasMissingKey) {
        localStorage.removeItem('tilesCache');
        continue;
      }

      const tile = document.createElement('div');
      const logo = document.createElement('img');
      const name = document.createElement('div');
      logo.src = data.logo;
      logo.alt = '';
      name.textContent = data.title;
      tile.appendChild(logo);
      tile.appendChild(name);

      tile.title = data.title;
      const xhr = new XMLHttpRequest();
      const pos = parseInt(index) + 1;
      const params = new URLSearchParams(data.params).toString();

      tile.addEventListener('click', (_) => {
        location.href = data.link + params + '&cu=' + config.id + '&pos=' + pos;
      });

      tile.addEventListener('auxclick', (_) => {
        window.open(data.link + params + '&cu=' + config.id + '&pos=' + pos, '_blank');
      });

      tiles.appendChild(tile);
    }
  })();
})

function loadConfig() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../config.json", true);
    xhr.responseType = "json";
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error("Error loading the configuration file"));
      }
    };
    xhr.send();
  });
}
