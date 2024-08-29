(async () => {
  'use strict';

  try {
    // HTML elements
    const terminalFormElement = document.getElementById('terminal-form');
    const terminalInputElement = document.getElementById('terminal-input');
    const terminalContentElement = document.getElementById('terminal-content');

    // Utility for passing args to command functions
    const generateResolver = (func) => (inputStr, args) => func({ inputStr, args });

    // Load bookmarks
    const bookmarksRes = await fetch(`${window.location.href}/data/bookmarks.json`);
    const bookmarks = await bookmarksRes.json();

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
      'bookmarks': {
        func: generateResolver(() => bookmarks.bookmarks.map(bookmark => `<p><a href=${bookmark} target="_blank">${bookmark}</a></p>`).join('')),
        description: 'Lists stored bookmarks'
      },
      'stumble-upon': {
        func: generateResolver(() => {
          window.open(bookmarks.bookmarks[Math.floor(Math.random() * bookmarks.bookmarks.length + 1)], '_blank');
        }),
        description: 'Open a random bookmark'
      },
      'clips': {
        func: generateResolver(() => {
          window.open('https://www.youtube.com/playlist?list=PLSYpXKZGuzgt0uXek01P9W9U1OUWzuzkI', '_blank');
        }),
        description: 'Youtube clipings'
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
      'urol': {
        func: generateResolver(() => `
          <p>Unix rules for life</p>
          <ul>
            <li>
              Keep it simple: It's cheaper and easier to carry around.
            </li>
            <li>
              Do one thing at a time: Multitasking is a lie.
            </li>
            <li>
              Network: You were born to connect.
            </li>
            <li>
              Say what you mean; nothing is truer than the truth.
            </li>
            <li>
              Hack: Trial and error is the only way we learn anything
            </li>
            <li>
              Be who you are: Even a bent wire can carry a great light.
            </li>
            <li>
              Use leverage; a bigger hammer isn't always the answer.
            </li>
            <li>
              Use what you have: never dig diamonds with a brick of gold.
            </li>
            <li>
              Have faith; all's possible, except maybe skiing through a revolving door.
              Think ahead, but don't worship your plans; remember today is the first day of the rest of your learning experience.
            </li>
          </ul>
        `),
        description: 'Unix rules of life'
      },
      'skills': {
        func: generateResolver(() => `
          <ul>
            <li>
              HTML, CSS, JS, Node.js, Python, PHP, C/C++, Java, Scala, R, Perl
            </li>
            <li>
              Unix/Linux, AWS, GCP, Azure, Docker, SQL, NoSQL, GraphQL
            </li>
            <li>
              Postgres, MySQL, Elasticsearch, Redis, MongoDB
            </li>
            <li>
              React.js/Native, WebRTC, PyTorch, Pandas, Sklearn
            </li>
            <li>
              Technical leadership, LLMs, ML, web search & crawling, video streaming
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
            Code Accelerator (2024)
            AI software creation engine with development, deployment, and sharing features.
          </p>

          <p>
            WebRTC-mesh (2020)
            WebRTC-mesh is a peer-to-peer, end-to-end encrypted video conferencing template built for the purposes of enabling highly iterative development across multiple brands.
          </p>

          <p>
            Safe Route (2016 TechCrunch Disrupt Hackathon 3rd place winner)
            Choose the safest route possible to travel when you're in a new city or walking alone and want to feel more secure. Developed the frontend of the app with Riot.js and Google Maps APIs.
          </p>

          <p>
            Octograde (2015 — 2016)
            Programmed the front-end and the back-end for a new online test taking platform. Octograde was used in high school classrooms as an online test taking alternative to other forms of assessment and has cheating prevention capabilities.
          </p>

          <p>
            Funzilla.tv (2014 TechCrunch Disrupt Hackathon)
            Crawled popular video sharing websites to develop an entertainment feed updated daily. Developed at the 2014 TechCrunch Hackathon.
          </p>

          <p>
            Harvix Student Search Engine (2011 — 2015)
            Programmed the frontend and backend for a new web search engine for students. Recruited students from CodeAcademy to assist with the project. Obtained partnerships with WolframAlpha, Seattle Public Schools, and Reddit.
          </p>

          <p>
            Lobberhead (2008 — 2011)
            Created an online community with the purpose of sharing videos between students.
          </p>
        `),
        description: `Lists David's projects`
      },
      'experience': {
        func: generateResolver(() => `
          <p>Chief Technology Officer, Ready.net (2020 — 2024)
          YC S20

          Ready works with state governments and local ISPs to deliver better service to more American families. Our platform, Ready BOSS, facilitates a data driven approach for providers looking to acquire grant funding for expansion and enables grantors to evaluate all applications in a level playing field alongside ground truth data.

          Built the initial backend, frontend, and data architecture for the platform, scaled the engineering team to 30 teammates, interviewed 100+ engineering candidates, developed processes for code quality, deployment, project management, and cross team collaboration, created a novel paradigm for evaluating engineering candidates and identifying good fit, achieved SOC 2 organizationally, regularly interacted with customers and partner companies, and assisted in powering 20+ US states on platform to orchestrate the Broadband Equity Access and Deployment program funding.</p>

          <p>Founder, Appearix (2018 — 2020)
          Appearix enables users to create, upload, and share public events. Appearix is used by college clubs for posting schedules, organizing meetings, and attracting new members. Developed the cloud infrastructure on AWS, built the GraphQL Node.js API, Elasticsearch database, crawled top event aggregators, developed a custom email marketing system based on AWS Simple Email Service, and assisted in developing the React frontend.<p>

          <p>Lead Software Engineer, Presearch (2017 — 2019)
          Presearch is a cryptocurrency web meta search engine. Developed a web and information search result delivery API with a websocket transport for incremental results based on load latency and query relevance. Search results included websites, images, videos, news, and instant information. Additionally built an organic autocomplete server and a community driven open source instant information module system with hundreds of modules and 30+ OSS contributors.</p>

          <p>Software Engineer, Magnify Progress (2017)
          Magnify Progress works with activists and organizations to collect actions across a platform of progressive issues and surface them to users who are looking for ways to make a difference politically. Converted Redux state managers to abstracted higher order components utilizing React context and Apollo Client which loaded data directly from the GraphQL API. Assisted in building a React Native app released on IOS and Android.</p>

          <p>Software Engineering Intern, Topix (2016 — 2017)
          Developed components for slideshow content management systems using Riot.js, React.js, and Redux. Created a image processing pipeline in Node.js using AWS and Graphicsmagick. Built a end-to-end web quality assurance testing framework utilizing Nightmare.js</p>

          <p>Software Engineer, ShredFeed (Summer 2015)
          Developed the backend for a social network for the purpose of sharing documents, images, text, and videos. Worked with PHP and MySQL in an MVC environment to develop the website.</p>

          <p>Founder, Harvix (2011 — 2015)
          Harvix is a research engine by students, for students. Developed the frontend, backend, data architecture, and on-premises infrastructure. Recruited a team of 20 students internationally from CodeAcademy to assist with the project. Obtained partnerships with Wolfram Alpha, Seattle Public Schools, and Reddit. First search engine to the Wikipedia instant information box. Developed hundreds of unconventional search engine result pages to find the most efficient for student research.</p>

          <p>Founder, Lobberhead (2008 — 2011)
          Created an online community with the purpose of sharing videos between students.</p>
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
          window.open('/resume.pdf', '_blank');
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
        func: generateResolver(() => 'Programming, AI/ML, Cycling, Swimming, Running, Overlanding, Truck Camping, Survival, Agriculture, Photography, Cinema, Literature, Web Development, Driving, Strength Training, Magic: The Gathering, Video and audio live streaming'),
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

      // Append user input to terminal
      terminalContentElement.insertAdjacentHTML('beforeend', `<p>$ ${terminalInputElement.value}</p>`);

      // If output is defined by command function
      if (output) {
        // Append output to terminal
        terminalContentElement.insertAdjacentHTML('beforeend', `<p>${output}</p>`);
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

      // Empty string input
      else if (input === '') {
        output = '';
      }

      return output;
    }

    // Remove all child elements given parent
    function removeChildren(parent) {
      while (parent.firstChild) {
        parent.firstChild.remove();
      }
    }
  }
  catch (error) {
    console.error(error);
  }
})();
