const cards = document.querySelectorAll('.reveal-card');
const favoriteToggle = document.querySelector('.favorites-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const filterStatus = document.querySelector('#project-filter-status');
const themeColor = document.querySelector('meta[name="theme-color"]');

const setTheme = (theme, persist = false) => {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

  const icon = themeToggle?.querySelector('.theme-icon');
  const label = themeToggle?.querySelector('.control-label');
  if (icon) icon.textContent = isDark ? '☀' : '☾';
  if (label) label.textContent = isDark ? 'Light' : 'Dark';
  if (themeColor) themeColor.setAttribute('content', isDark ? '#0d1322' : '#eef4ff');

  if (persist) {
    try {
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    } catch {
      // The theme still works when browser storage is unavailable.
    }
  }
};

setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme, true);
});

favoriteToggle?.addEventListener('click', () => {
  const favoritesOnly = favoriteToggle.getAttribute('aria-pressed') !== 'true';
  favoriteToggle.setAttribute('aria-pressed', String(favoritesOnly));
  favoriteToggle.setAttribute('aria-label', favoritesOnly ? 'Show all projects' : 'Show favorite projects only');

  const label = favoriteToggle.querySelector('.control-label');
  if (label) label.textContent = favoritesOnly ? 'All projects' : 'Favorites';

  cards.forEach((card) => {
    card.hidden = favoritesOnly && !card.classList.contains('project-favorite');
  });

  if (filterStatus) {
    const favoriteCount = document.querySelectorAll('.project-card.project-favorite').length;
    filterStatus.textContent = favoritesOnly
      ? `Showing ${favoriteCount} favorite projects.`
      : `Showing all ${cards.length} projects.`;
  }
});

const drawChart = () => {
  const canvas = document.querySelector('.chart-canvas');
  if (!canvas) return;

  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;

  const context = canvas.getContext('2d');
  context.scale(ratio, ratio);
  const points = [
    [0, .9], [.08, .8], [.16, .42], [.25, .64], [.34, .74],
    [.43, .3], [.52, .48], [.62, .63], [.72, .2], [.82, .36], [1, .26],
  ];

  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(109, 98, 239, .27)');
  gradient.addColorStop(1, 'rgba(109, 98, 239, 0)');

  const trace = () => {
    context.beginPath();
    points.forEach(([x, y], index) => {
      const px = x * width;
      const py = y * height;
      if (index === 0) context.moveTo(px, py);
      else {
        const previous = points[index - 1];
        const previousX = previous[0] * width;
        const previousY = previous[1] * height;
        context.bezierCurveTo((previousX + px) / 2, previousY, (previousX + px) / 2, py, px, py);
      }
    });
  };

  trace();
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.closePath();
  context.fillStyle = gradient;
  context.fill();

  trace();
  context.strokeStyle = '#6a61e6';
  context.lineWidth = 2.5;
  context.lineCap = 'round';
  context.stroke();
};

drawChart();
window.addEventListener('resize', drawChart);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  cards.forEach((card) => observer.observe(card));
} else {
  cards.forEach((card) => card.classList.add('visible'));
}
