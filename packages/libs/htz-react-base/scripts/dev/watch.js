/* eslint-disable global-require, no-console */

/**
 * For building both Next.js apps and consumable libraries like `htz-components`.
 */
const fs = require('fs');
const spawn = require('cross-spawn');

function checkDir(path) {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      resolve(!err && stats.isDirectory());
    });
  });
}

function buildApp() {
  // eslint-disable-next-line import/no-unresolved
  require('./next');
}

function buildLibrary() {
  const envScripts = {
    commonjs: require.resolve('./lib'),
    esm: require.resolve('./esm'),
  };

  const { BABEL_ENV, } = process.env;
  const args = process.argv.slice(2);

  if (BABEL_ENV && !envScripts[BABEL_ENV]) {
    console.error('The `BABEL_ENV` environment variable must be empty or one of:');
    console.error(`  ${Object.keys(envScripts).join('\n  ')}`);
    process.exit(1);
  }

  Object.keys(envScripts).forEach(env => {
    if (!BABEL_ENV || env === BABEL_ENV) {
      const script = envScripts[env];
      // It would be nice to just `require` the subtasks in this directory in
      // order to run Babel multiple times, but the Node module cache would
      // result in the Babel CLI module only being run once (unless we do
      // something dirty like delete the cache entry). Easier to just spawn
      // Node multiple times intead.
      /* eslint-disable no-undef */
      result = spawn.sync('cross-env', [ 'node', script, ].concat(args), {
        stdio: 'inherit',
      });
      if (result.signal) {
        console.error(result.signal);
        process.exit(1);
      }
      if (result.status) {
        process.exitCode = result.status;
      }
      /* eslint-enable no-undef */
      console.log(); // Blank line between different builds.
    }
  });
}

// First, determine if this is a Next.js app or a consumable library.
// Next apps will just use `next build` (which will run webpack, etc.) while
// consumable libraries will run Babel on `src`. To avoid requiring developers
// to specify app vs. library in a flag somewhere, check for the existence of
// a `pages` or `src` directory.
checkDir('pages').then(isDir => {
  if (isDir) {
    console.log('Next.js app package detected.');
    buildApp();
  }
  else {
    // eslint-disable-next-line no-shadow
    checkDir('src').then(isDir => {
      if (isDir) {
        console.log('Library package detected.');
        buildLibrary();
      }
      else {
        console.error('Could not determine how to build the current package.');
        console.error('* To build a Next.js app, add a `pages` directory.');
        console.error('* To build a consumable library, add a `src` directory.');
        process.exit(1);
      }
    });
  }
});
