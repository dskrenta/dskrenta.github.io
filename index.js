(() => {
  'use strict';

  // Utility for passing args to command functions
  const generateResolver = (func) => (inStr, args) => func(inStr, args);

  // Commands supported by the system
  const commands = {
    'help': {
      func: generateResolver(help),
      description: 'Lists all commands'
    },
    'foo': {
      func: generateResolver(() => 'Foo!'),
      description: 'Foo!'
    }
  };

  function help(inStr, args) {
    return `
      <table class="terminal-table">
        <tr>
          <td>Command</td>
          <td>Description</td>
        </tr>
        ${Object.keys(commands).map(commandKey => {
          return `
            <tr>
              <td>${commandKey}</td>
              <td>${commands[commandKey].description}</td>
            </tr>
          `;
        }).join('')}
      </table>
    `;
  }

  // HTML elements
  const terminalFormElement = document.getElementById('terminal-form');
  const terminalInputElement = document.getElementById('terminal-input');
  const terminalContentElement = document.getElementById('terminal-content');

  // Refocus terminal input element on blur
  terminalInputElement.addEventListener('blur', () => {
    terminalInputElement.focus();
  })

  // Terminal submit listener
  terminalFormElement.addEventListener('submit', (event) => {
    // Prevent default behavior for submit event
    event.preventDefault();

    // Append new content to terminal
    terminalContentElement.insertAdjacentHTML(
      'beforeend',
      `
        <p>${terminalInputElement.value}</p>
        <p>${parse(terminalInputElement.value)}</p>
      `
    );

    // Set terminal input element value to null
    terminalInputElement.value = null;
  });

  // Parse user input
  function parse(str) {
    // Lowercase user input
    const input = str.toLowerCase();

    // Split user input on spaces
    const args = input.split(' ');

    // Set default output
    let output = 'Unrecognized command, type help to list commands.';

    // Command exists in commands
    if (args[0] in commands) {
      // Run command function and set output to command function return
      output = commands[args[0]].func(input, args);
    }

    return output;
  }
})();
