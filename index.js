(() => {
  'use strict';

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
    'commands': {
      func: generateResolver(help),
      description: 'Lists all commands'
    },
    'clear': {
      func: generateResolver(() => removeChildren(terminalContentElement)),
      description: 'Clear terminal'
    },
    'date': {
      func: generateResolver(() => Date().toString()),
      description: 'Prints current date and time'
    },
    'github-templates': {
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
      description: 'Opens a random Wikipedia article'
    },
    'skills': {
      func: generateResolver(() => `
        <ul>
          <li>
            Unix/Linux
          </li>
          <li>
            HTML, CSS, JavaScript
          </li>
          <li>
            Node.js, Typescript, Python, PHP, C/C++, Java, Scala, R
          </li>
          <li>
            NPM, Amazon Web Services, Microsoft Azure, Google Cloud, Firebase, Docker, SQL, NoSQL, Elasticsearch, Redis
          </li>
          <li>
            React, React Native, Redux, Mobx, Riot.js, Vue.js, Apollo GraphQL, HTML5 Canvas, GraphQL, Webpack, Babel
          </li>
          <li>
            WebRTC, Video Conferencing, HTTP Live Streaming, MPEG-Dash, ffmpeg, video and audio processing, video and audio live streaming
          </li>
          <li>
            Finance & Economics
          </li>
          <li>
            Entrepreneurship
          </li>
          <li>
            Web Development & Web Marketing
          </li>
          <li>
            Proficient in multiple operating systems and their respective applications (Windows, Linux, Mac OS), (Excel, Word, Powerpoint, Numbers, Pages, Keynote)
Student Pilot
          </li>
        </ul>
      `),
      description: `Lists David's skills`
    },
    'languages': {
      func: generateResolver(() => 'HTML, CSS, JavaScript, Node.js, Typescript, Python, PHP, C/C++, Java, Scala, R'),
      description: 'Programming languages David knows'
    },
    'projects': {
      func: generateResolver(() => `
        <p>
          WebRTC-mesh — 2020
          WebRTC-mesh is a peer to peer, end to end encrypted video conferencing template built for the purposes of enabling highly iterative development across multiple brands.
        </p>

        <p>
          Safe Route — 2016 (TechCrunch Disrupt Hackathon 3rd place winner)
          Choose the safest route possible to travel when you're in a new city or walking alone and want to feel more secure. Developed the frontend of the app with Riot.js and Google Maps APIs.
        </p>

        <p>
          Octograde — 2015 — 2016
          Programmed the front-end and the back-end for a new online test taking platform. Octograde was used in high school classrooms as an online test taking alternative to other forms of assessment and has cheating prevention capabilities.
        </p>

        <p>
          Funzilla.tv — 2014 (TechCrunch Disrupt Hackathon)
          Crawled popular video sharing websites to develop an entertainment feed updated daily. Developed at the 2014 TechCrunch Hackathon.
        </p>

        <p>
          Harvix Student Search Engine — 2011 — 2013
          Programmed the frontend and backend for a new web search engine for students. Recruited students from CodeAcademy to assist with the project. Obtained partnerships with WolframAlpha, Seattle Public Schools, and Reddit.
        </p>

        <p>
          Lobberhead — 2009 — 2012
          Created an online community with the purpose of sharing videos between students.
        </p>
      `),
      description: `Lists David's projects`
    },
    'experience': {
      func: generateResolver(() => `
<p>Co-Founder, Appearix — 2018 — 2020
Appearix enables users to create, upload, and share public events. Appearix is used by college clubs for posting schedules and organizing meetings. Developed the AWS infrastructure for serving the application, built the GraphQL Node.js API, Elasticsearch schema, crawled top event aggregators, developed a custom email marketing system based on AWS Simple Email Service, and assisted in development of frontend React components.</p>

<p>Software Engineering Consultant, Soapely — 2019
Soapely is an on demand car washing application that services the Bay Area. Developed backend infrastructure on AWS, Node.js web server with a GraphQL API, Stripe integration for payments, Firebase authentication, and a React frontend packaged as an progressive web application.</p>

<p>Software Engineer, Presearch — 2017 — 2019
Presearch is a cryptocurrency web meta search engine. Developed a web and information search result delivery API with a websocket transport for incremental results based on speed and relevance. Search results included websites, images, videos, news, and instant information tied to the query. Additionally built an organic autocomplete server and a community driven open source package module system for the search engine.</p>

<p>Software Engineer, Magnify Progress — 2017
Magnify Progress works with activists and organizations to collect actions across a platform of progressive issues, and surface them to users who are looking for ways to act. Converted existing Redux state managers to React higher order components connected to the backend GraphQL API with Apollo Client (GraphQL client). Assisted in the development of the Magnify Progress React Native IOS and Android applications.</p>

<p>Software Engineering Intern, Topix — 2016 — 2017
Developed components for slideshow content management systems using React, Riot.js, and ECMAScript 2016 & 2017. Used AWS Elastic Beanstalk to create a Node.js image pipeline where images were processed and manipulated with graphicsmagick.</p>

<p>Software Engineer, ShredFeed — 2015 (Summer)
Developed the backend for a social network for the purpose of sharing documents, images, text, and videos. Worked with PHP and MySQL in an MVC environment to develop the website.</p>

<p>Software Engineering Consultant, Redesign Mobile — 2015
Created email and payment forms in PHP to connect freelance workers with clients.</p>
`),
      description: `Lists David's experience`
    },
    'education': {
      func: generateResolver(() => 'University of Colorado, Boulder. BA - Computer Science (2017 - 2020)'),
      description: `Lists David's education`
    },
    'bio': {
      func: generateResolver(() => `David is a versatile developer with experience in various front end and back end technologies. He has developed a number of projects, including Better America, a platform to crowdsource potential legislation for government, Harvix, a research engine for students, and Octograde, a test-administering tool for teachers. He has also consulted for a number of clients and regularly participates in hackathons.`),
      description: `David's bio`
    },
    'about': {
      func: generateResolver(() => `This is David Skrenta's personal website. I built this site for the purposes of creating my own command line interface accessible from the web. It also serves as a portfolio site.`),
      description: `About this site`
    },
    /*
    'cal': {
      func: generateResolver(() => 'AWS, JavaScript, Node.js, Python, C/C++, ...'),
      description: `Calendar`
    },
    'weather': {
      func: generateResolver(() => 'AWS, JavaScript, Node.js, Python, C/C++, ...'),
      description: `Weather`
    },
    */
    'linkedin': {
      func: generateResolver(() => {
        window.open('https://www.linkedin.com/in/david-skrenta-57902463/', '_blank');
      }),
      description: `Opens David's Linkedin`
    },
    'github': {
      func: generateResolver(() => {
        window.open('https://github.com/dskrenta', '_blank');
      }),
      description: `Opens David's Github`
    },
    'resume': {
      func: generateResolver(() => {
        window.open('/resume', '_blank');
      }),
      description: `Opens David's resume`
    },
    'mtg-decks': {
      func: generateResolver(() => {
        window.open('https://www.mtgsalvation.com/members/402043-neural-crashburn/decks', '_blank');
      }),
      description: `David's Magic: The Gaterning decks`
    },
    'joke': {
      func: generateResolver(() => jokes[Math.floor(Math.random() * jokes.length)]),
      description: 'Joke'
    },
    'interests': {
      func: generateResolver(() => 'Programming, Cycling, Swimming, Running, Survival, Agriculture, Botany, Photography, Cinema, Literature, Web Development, Driving, Powerlifting, Strength Training, Magic: The Gathering, Video and audio live streaming'),
      description: `Lists David's interests`
    },
    'email': {
      func: generateResolver(() => 'dskrenta@gmail.com'),
      description: `Prints David's email address`
    }
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

    return 'No expression, usage: calc expression';
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

  // List commands
  terminalContentElement.insertAdjacentHTML('beforeend', help());

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
