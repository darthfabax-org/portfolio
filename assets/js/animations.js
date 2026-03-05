/**
 * animations.js
 * Handles:
 *  1. Terminal line staggered reveal — uses data-delay attribute for ordering
 *  2. Scroll-triggered section & card reveals (IntersectionObserver)
 *  3. Metric bar fill animation on scroll
 */

(function initAnimations() {
  'use strict';

  /* ── 1. Terminal staggered reveal ─────────────────────────── */

  const TERMINAL_DELAY_BASE = 400;  // ms before first line
  const TERMINAL_STEP       = 320;  // ms between each step

  document.querySelectorAll('.terminal__line, .terminal__output').forEach((el) => {
    // data-delay is 1-based: step 1 fires at base, step 2 at base+step, etc.
    const step  = parseInt(el.dataset.delay ?? '1', 10);
    const delay = TERMINAL_DELAY_BASE + (step - 1) * TERMINAL_STEP;
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

  document
    .querySelectorAll('.section, .skill-card, .cloud-card, .timeline__item')
    .forEach((el) => revealObserver.observe(el));

  /* ── 3. Metric bars fill on scroll ─────────────────────────── */

  const metricObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const metric   = entry.target;
        const fill     = metric.querySelector('.metric__fill');
        const widthPct = metric.dataset.width;

        if (fill && widthPct) {
          // Small delay so fill fires after the section fade-in
          setTimeout(() => { fill.style.width = `${widthPct}%`; }, 200);
        }

        metricObserver.unobserve(metric);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.metric').forEach((el) => metricObserver.observe(el));

})();
