/* eslint-disable no-param-reassign,import/no-extraneous-dependencies */

// /////////// //
//   Plugins   //
// /////////// //

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');

// ////////////////// //
//   Config and ENV   //
// ////////////////// //

const { BUNDLE_ANALYZE, NODE_ENV, } = process.env;

const moduleRules = require('./moduleRules');

// eslint-disable-next-line no-unused-vars
const modulesToRemoveFromClientBundle = new RegExp(
  [ /csslint/, /bunyan/, ].map(regex => regex.source).join('|')
);

module.exports = function configWebpack(
  config,
  { buildId, dev, isServer, defaultLoaders, }
) {
  if (!config.module.rules) config.module.rules = [];
  config.module.rules.push(...moduleRules);

  if (!config.resolve) config.resolve = {};

  // see https://github.com/graphql/graphql-js/issues/1272
  // Fix compilation issue when building from ESM
  config.resolve.extensions = [
    '.webpack.js',
    '.web.js',
    '.mjs',
    '.js',
    '.jsx',
    '.json',
  ];

  // Transpile internal modules
  if (NODE_ENV !== 'development') {
    // Correctly resolve local packages
    if (!config.resolve.alias) config.resolve.alias = {};
    const treeToNodeModules = [
      '..',
      '..',
      '..',
      '..',
      'node_modules',
      '@haaretz',
    ];
    const htzPackagesPath = path.join(__dirname, ...treeToNodeModules);
    const packageAliases = fs
      .readdirSync(htzPackagesPath)
      .filter(item => fs.statSync(path.join(htzPackagesPath, item)).isDirectory()
      )
      .reduce((result, pkg) => {
        let alias;
        try {
          // Use custom `package.json` field to resolve source in
          // internal packages
          const scopedPkg = `@haaretz/${pkg}`;
          const pkgPath = path.dirname(
            require.resolve(`${scopedPkg}/package.json`)
          );
          const htzInternal = false;
          // const htzInternal = require(`${scopedPkg}/package.json`).htzInternal;
          const moduleBuild = require(`${scopedPkg}/package.json`).module;
          alias = {
            [scopedPkg]: htzInternal
              ? path.join(pkgPath, htzInternal)
              : moduleBuild
                ? path.join(pkgPath, moduleBuild)
                : require.resolve(scopedPkg),
          };
        }
        catch (err) {
          // console.log(err.message);
          alias = {};
        }

        return {
          ...result,
          ...alias,
        };
      }, {});

    config.resolve.alias = {
      ...config.resolve.alias,
      ...(packageAliases || {}),
    };
  }

  // packages to remove from the client side bundle
  // config.plugins.push(
  //   new webpack.IgnorePlugin(modulesToRemoveFromClientBundle)
  // );

  if (BUNDLE_ANALYZE) setBundleAnalyze();
  // console.log('\n\n\n\n\n', '\n\n\n\n\n');

  shimForClientSideBuild(config);

  // if (!isServer) console.log(JSON.stringify(config, null, 2));
  // if (!isServer) console.log('\n\n\nentry: ', config.entry.toString());
  return config;
};

// //////////////////// //
//   Helper Functions   //
// //////////////////// //

function setBundleAnalyze(configToMutate) {
  configToMutate.profile = true;
  configToMutate.stats = 'verbose';

  // Generate a `stats` json
  configToMutate.plugins.push(
    new StatsPlugin(`${__dirname}/stats.json`, {
      chunkModules: true,
      // exclude: [ /node_modules\\\/react/, ],
    })
  );
}

// This is required for removing node core modules
// from packages that use them and fail to
// replace them in client build like bunyan and node-config
function shimForClientSideBuild(configToMutate) {
  if (!configToMutate.resolve.alias) configToMutate.resolve.alias = {};

  const emptyShim = require.resolve(
    '@haaretz/htz-react-base/webpack/emptyShim'
  );

  configToMutate.resolve.alias.config$ = require.resolve(
    '@haaretz/htz-react-base/webpack/configShim'
  );
  configToMutate.resolve.alias = {
    ...configToMutate.resolve.alias,
    'dtrace-provider': emptyShim,
    fs: emptyShim,
    'safe-json-stringify': emptyShim,
    mv: emptyShim,
    'source-map-support': emptyShim,
  };
}
