'use strict';

const fs = require('fs');
const fsAsync = fs.promises;

const BOOKMARKS_FILE = `${__dirname}/../data/bookmarks.json`;
const bookmark = process.argv[2];

async function main() {
  try {
    if (bookmark) {
      const fileContent = await fsAsync.readFile(BOOKMARKS_FILE, 'utf-8');
      const parsed = JSON.parse(fileContent);
      parsed.bookmarks.push(bookmark);
      await fsAsync.writeFile(BOOKMARKS_FILE, JSON.stringify(parsed));
    }
  }
  catch (error) {
    console.error(error);
  }
}

main();
