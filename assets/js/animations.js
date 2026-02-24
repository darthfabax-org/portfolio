/**
 * animations.js
 * Handles:
 *  1. Terminal line staggered reveal (simulates typewriter feel)
 *  2. Scroll-triggered section & card reveals (IntersectionObserver)
 *  3. Metric bar fill animation on scroll
 */

(function initAnimations() {
  'use strict';

  /* ── 1. Terminal staggered reveal ─────────────────────────── */

  const TERMINAL_DELAY_BASE = 400;  // ms before first line
  const TERMINAL_STEP       = 320;  // ms between each element

  const terminalLines = document.querySelectorAll(
    '.terminal__line, .terminal__output'
  );

  terminalLines.forEach((el, index) => {
    const delay = TERMINAL_DELAY_BASE + index * TERMINAL_STEP;
    setTimeout(() => el.classList.add('is-visible'), delay);
  });

  /* ── 2. Scroll reveal (sections, cards) ────────────────────── */

  const REVEAL_THRESHOLD = 0.12;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: REVEAL_THRESHOLD }
  );

  const revealTargets = document.querySelectorAll(
    '.section, .skill-card, .cloud-card, .timeline__item'
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ── 3. Metric bars fill on scroll ─────────────────────────── */

  const metricObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const metric   = entry.target;
        const fill     = metric.querySelector('.metric__fill');
        const widthPct = metric.dataset.width;

        if (fill && widthPct) {
          // Slight delay so it fires after section reveal
          setTimeout(() => {
            fill.style.width = `${widthPct}%`;
          }, 200);
        }

        metricObserver.unobserve(metric);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.metric').forEach((el) => metricObserver.observe(el));

})();
