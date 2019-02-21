#!/usr/bin/env node

/* *********************************************************** *
 * An ugly hack until we figure out how to better handle
 * https://github.com/martpie/next-transpile-modules/issues/20
 * Add a check to a failing propery access in styled-jsx
 * *********************************************************** */

const fs = require('fs');
const path = require('path');

const FILE = require.resolve(path.join('styled-jsx', 'dist', '_utils.js'));
const ORIGINAL_CODE = new RegExp(
  'return attr.name.name === _constants.STYLE_ATTRIBUTE',
  'g'
);
const REPLACEMENT = 'return attr.name && attr.name.name === _constants.STYLE_ATTRIBUTE';

// eslint-disable-next-line consistent-return
fs.readFile(FILE, 'utf8', (err, data) => {
  if (err) return console.error(`Error reading from file: ${FILE}\n`, err);

  if (!data || data.includes(REPLACEMENT)) return undefined;

  const result = data.replace(ORIGINAL_CODE, REPLACEMENT);

  // eslint-disable-next-line consistent-return
  fs.writeFile(FILE, result, 'utf8', err => {
    if (err) return console.error(`Error writing to file: ${FILE}\n`, err);
  });
});
