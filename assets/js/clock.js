/**
 * clock.js
 * Updates the topbar clock every second.
 * Isolated module — no global state pollution.
 */

(function initClock() {
  'use strict';

  const el = document.getElementById('js-clock');
  if (!el) return;

  function tick() {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('es-ES', {
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }

  tick();
  setInterval(tick, 1_000);
})();
