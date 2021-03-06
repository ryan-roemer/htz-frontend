const fs = require('fs');
const path = require('path');

function getPackagesToTranspile({ exclude, } = {}) {
  const relativePathToHtzPkgs = [ '..', '..', '..', 'node_modules', '@haaretz', ];
  const htzPackagesPath = path.join(process.cwd(), ...relativePathToHtzPkgs);
  const pkgs = fs
    .readdirSync(htzPackagesPath)
    .filter(pkg => {
      const scopedPkg = `@haaretz/${pkg}`;

      const isExcluded = !!exclude && (exclude.includes(pkg) || exclude.includes(scopedPkg));
      const isDir = fs.statSync(path.join(htzPackagesPath, pkg)).isDirectory();
      return isDir && !isExcluded;
    })
    .map(pkg => `@haaretz/${pkg}`);

  return pkgs;
}

module.exports = getPackagesToTranspile;
