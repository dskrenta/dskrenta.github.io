(() => {
  'use strict';

  // Current directory
  let currentDirectory = '/home/';

  // HTML elements
  const terminalFormElement = document.getElementById('terminal-form');
  const terminalInputElement = document.getElementById('terminal-input');
  const terminalContentElement = document.getElementById('terminal-content');

  // Utility for passing args to command functions
  const generateResolver = (func) => (inputStr, args) => func({ inputStr, args });

  // Commands supported by the system
  const commands = {
    'help': {
      func: generateResolver(help),
      description: 'Lists all commands'
    },
    'foo': {
      func: generateResolver(() => 'Foo!'),
      description: 'Foo!'
    },
    'clear': {
      func: generateResolver(() => removeChildren(terminalContentElement)),
      description: 'Clear terminal'
    },
    'ls': {
      func: generateResolver(ls),
      description: 'List files'
    },
    'cat': {
      func: generateResolver(cat),
      description: 'Reads file and writes to output'
    },
    'pwd': {
      func: generateResolver(() => currentDirectory),
      description: 'Prints working directory'
    },
    'date': {
      func: generateResolver(() => Date().toString()),
      description: 'Prints current date and time'
    },
    'templates': {
      func: generateResolver(() => templates.map(template => `${template}\t`).join('')),
      description: `Prints David's Github templates`
    },
    'template': {
      func: generateResolver(template),
      description: 'Opens a new tab with desired template'
    },
    'calc': {
      func: generateResolver(calc),
      description: 'Calculator'
    },
    'feedvix': {
      func: generateResolver(() => {
        window.open('http://feedvix.com', '_blank')
      }),
      description: `Opens Feedvix (David's feed)`
    },
    'wiki-random': {
      func: generateResolver(() => {
        window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank')
      }),
      description: 'Open a random Wikipedia article'
    }
  };

  const files = {
    'projects.txt': `
      1. stuff
      2. stuff
      3. stuff
    `,
    'stuff.txt': `
      1. stuff
      2. stuff
      3. stuff
    `
  };

  const templates = [
    'js-web-project',
    'webrtc-mesh',
    'webrtc-sfu'
  ];

  function calc({ args }) {
    if (args.length > 1) {
      return math.evaluate(args.slice(1).join(' '));
    }

    return 'No expression, usage: cal expression';
  }

  function template({ args }) {
    if (args.length > 1) {
      const templateKey = args[1];
      const foundTemplate = templates.find((item) => item === templateKey);

      if (foundTemplate) {
        const url = `https://github.com/dskrenta/${foundTemplate}`;
        window.open(url, '_blank');
        return `Opening: ${url}`;
      }

      return `Template: ${templateKey} does not exist.`;
    }

    return 'No template specificed, Usage: template template';
  }

  function ls({ inputStr, args }) {
    return Object.keys(files).map(fileKey => `${fileKey}\t`).join('');
  }

  function cat({ inputStr, args }) {
    if (args.length > 1) {
      const filename = args[1];

      if (filename in files) {
        return files[filename];
      }
    }

    return 'No file specified, Usage: cat filename';
  }

  function help() {
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

  // Refocus terminal input element on blur
  terminalInputElement.addEventListener('blur', () => {
    terminalInputElement.focus();
  })

  // Terminal submit listener
  terminalFormElement.addEventListener('submit', (event) => {
    // Prevent default behavior for submit event
    event.preventDefault();

    // Output from command function
    const output = parse(terminalInputElement.value);

    // If output is defined by command function
    if (output) {
      // Append new content to terminal
      terminalContentElement.insertAdjacentHTML(
        'beforeend',
        `
          <p>${terminalInputElement.value}</p>
          <p>${output}</p>
        `
      );
    }

    // Set terminal input element value to null
    terminalInputElement.value = null;

    // Scroll to bottom of page
    window.scrollTo(0, document.body.scrollHeight);
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

  function removeChildren(parent) {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  }
})();
