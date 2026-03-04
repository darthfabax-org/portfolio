/**
 * terminal.js
 * Interactive terminal input — returns a permission denied error
 * with a sudo hint as an easter egg.
 */

(function initTerminal() {
  'use strict';

  const input = document.getElementById('js-terminal-input');
  if (!input) return;

  const terminalBody = input.closest('.terminal__body');
  const idleLine     = input.closest('.terminal__line--idle');

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function insertResponse(cmd) {
    const safe = escapeHtml(cmd);

    // Echo the typed command
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal__line is-visible';
    cmdLine.innerHTML =
      '<span class="terminal__prompt" aria-hidden="true">darthfabax@web:~$</span>' +
      '<span class="terminal__command">' + safe + '</span>';

    // Error block
    const errBlock = document.createElement('div');
    errBlock.className = 'terminal__output is-visible';
    errBlock.setAttribute('role', 'alert');
    errBlock.innerHTML =
      '<p class="terminal__error-line">' +
        '<span class="terminal__error-label">bash:</span> ' +
        '<span class="terminal__error-cmd">' + safe + '</span>' +
        ': <span class="terminal__error-msg">Permission denied</span>' +
      '</p>' +
      '<p class="terminal__sudo-hint">' +
        '<span class="terminal__sudo-arrow">→</span> ' +
        'hint: try <span class="terminal__sudo-cmd">sudo ' + safe + '</span>' +
      '</p>';

    terminalBody.insertBefore(cmdLine, idleLine);
    terminalBody.insertBefore(errBlock, idleLine);
  }

  input.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    const cmd = this.value.trim();
    if (!cmd) return;
    insertResponse(cmd);
    this.value = '';
    // Scroll terminal into view after inserting response
    idleLine.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });

})();
