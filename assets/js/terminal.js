/**
 * terminal.js
 * Interactive terminal: normal commands → permission denied + sudo hint.
 * sudo commands → password prompt (type="password") → auth failure.
 */

(function initTerminal() {
  'use strict';

  const input = document.getElementById('js-terminal-input');
  if (!input) return;

  const terminalBody = input.closest('.terminal__body');
  const idleLine = input.closest('.terminal__line--idle');
  let sudoMode = false;

  terminalBody.addEventListener('click', () => {
    input.focus();
  });

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function insert(html, ...classes) {
    const el = document.createElement('div');
    el.className = [...classes, 'is-visible'].join(' ');
    el.innerHTML = html;
    terminalBody.insertBefore(el, idleLine);
  }

  function handleNormal(cmd) {
    const safe = escapeHtml(cmd);

    // Echo the typed command
    insert(
      '<span class="terminal__prompt" aria-hidden="true">darthfabax@web:~$</span>' +
      '<span class="terminal__command">' + safe + '</span>',
      'terminal__line'
    );

    if (cmd.startsWith('sudo')) {
      // Enter sudo password mode
      sudoMode = true;
      input.type = 'password';
      insert(
        '[sudo] password for <span class="terminal__sudo-user">darthfabax</span>: ',
        'terminal__output', 'terminal__sudo-prompt'
      );
    } else {
      // Permission denied + sudo hint
      insert(
        '<p class="terminal__error-line">' +
        '<span class="terminal__error-label">bash:</span> ' +
        '<span class="terminal__error-cmd">' + safe + '</span>' +
        ': <span class="terminal__error-msg">Permission denied</span>' +
        '</p>' +
        '<p class="terminal__sudo-hint">' +
        '<span class="terminal__sudo-arrow">→</span> ' +
        'hint: try <span class="terminal__sudo-cmd">sudo ' + safe + '</span>' +
        '</p>',
        'terminal__output'
      );
    }
  }

  function handleSudoEnter() {
    sudoMode = false;
    input.type = 'text';
    insert(
      '<p class="terminal__error-line">sudo: authentication failure</p>',
      'terminal__output'
    );
  }

  input.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;

    const val = this.value.trim();
    this.value = '';

    if (sudoMode) {
      handleSudoEnter();
    } else {
      if (!val) return;
      handleNormal(val);
    }

    idleLine.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });

})();
