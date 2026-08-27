const cards = document.querySelectorAll('.reveal-card');

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

const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = [...sectionLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const updateNavigation = () => {
  const marker = window.scrollY + 180;
  let current = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });

  sectionLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();
