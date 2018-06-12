process.env.BABEL_ENV = process.env.BABEL_ENV || 'commonjs';

console.log('Building dist/lib...');
const { checkDir, } = require('./_checkDir');
const fs = require('fs');

checkDir('dist').then(hasDist => {
  if (!hasDist) {
    fs.mkdirSync('dist');
  }
  if (process.argv.length < 3) {
    process.argv.push('src', '--out-dir', 'dist/lib');
  }
  require('@babel/cli/bin/babel');
});
