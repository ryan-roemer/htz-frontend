/* eslint-disable no-param-reassign,import/no-extraneous-dependencies */

// /////////// //
//   Plugins   //
// /////////// //

const path = require('path');
const StatsPlugin = require('stats-webpack-plugin');
const { DuplicatesPlugin, } = require('inspectpack/plugin');

// ////////////////// //
//   Config and ENV   //
// ////////////////// //

const { BUNDLE_ANALYZE, } = process.env;

const moduleRules = require('./moduleRules');

module.exports = function configWebpack(
  config,
  opts
  // { buildId, dev, isServer, defaultLoaders, }
) {
  // eslint-disable-next-line no-unused-vars
  const { buildId, dev, isServer, defaultLoaders, } = opts;

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

  // Use untranspiled source in htz packages
  config.resolve.mainFields.unshift('htzInternal');

  // Check for duplicate code from dependencies
  if (!isServer) {
    config.plugins.push(
      new DuplicatesPlugin({
        verbose: true,
        emitHandler: report => console.log(report),
      })
    );
  }

  if (BUNDLE_ANALYZE) setBundleAnalyze(config);

  shimForClientSideBuild(config);

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
    new StatsPlugin(path.join(process.cwd(), 'stats.json'), {
      chunkModules: true,
      // exclude: [ /node_modules\\\/react/, ],
    })
  );
}

// This is required for removing node core modules
// from packages that use them and fail to
// replace them in client build like `bunyan` and `node-config`
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
