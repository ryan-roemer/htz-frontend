/* eslint-disable no-param-reassign,import/no-extraneous-dependencies */

// /////////// //
//   Plugins   //
// /////////// //

const path = require('path');

// ////////////////// //
//   Config and ENV   //
// ////////////////// //

const { BUNDLE_STATS, BUNDLE_ANALYZE, } = process.env;

const moduleRules = require('./moduleRules');

module.exports = function configWebpack(
  config,
  opts
  // { buildId, dev, isServer, defaultLoaders, }
) {
  // eslint-disable-next-line no-unused-vars
  const { buildId, dev, isServer, defaultLoaders, } = opts;
  const isClient = !isServer;

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

  if ((isClient && BUNDLE_STATS) || BUNDLE_ANALYZE) {
    const { StatsWriterPlugin, } = require('webpack-stats-plugin');
    const DuplicatesPackagesCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

    // Check for duplicate code from dependencies
    const duplicates = new DuplicatesPackagesCheckerPlugin({
      // Also show module that is requiring each duplicate package
      verbose: BUNDLE_STATS || BUNDLE_ANALYZE,
      // Emit errors instead of warnings
      emitError: false,
      // Show help message if duplicate packages are found
      showHelp: false,
      // Warn also if major versions differ
      strict: true,
      /**
       * Exclude instances of packages from the results.
       * If all instances of a package are excluded, or all instances except one,
       * then the package is no longer considered duplicated and won't be emitted as a warning/error.
       * @param {Object} instance
       * @param {string} instance.name The name of the package
       * @param {string} instance.version The version of the package
       * @param {string} instance.path Absolute path to the package
       * @param {?string} instance.issuer Absolute path to the module that requested the package
       * @returns {boolean} true to exclude the instance, false otherwise
       */
      // exclude(instance) {
      //   return instance.name === "fbjs";
      // }
    });

    // Generate a `stats` json
    config.stats = 'verbose';
    config.profile = true;

    const stats = new StatsWriterPlugin({
      filename: path.join(
        '..',
        'bundle-report',
        `stats-${isServer ? 'server' : 'client'}.json`
      ),
      fields: [ 'assets', 'moudles', ],
    });
    config.plugins.push(duplicates, stats);
  }

  shimForClientSideBuild(config);

  return config;
};

// //////////////////// //
//   Helper Functions   //
// //////////////////// //

// This is required for removing node core modules
// from packages that use them and fail to
// replace them in client build like `bunyan` and `node-config`
function shimForClientSideBuild(configToMutate) {
  if (!configToMutate.resolve.alias) configToMutate.resolve.alias = {};

  const emptyShim = require.resolve(
    '@haaretz/htz-react-base/base-next-config/emptyShim'
  );

  configToMutate.resolve.alias.config$ = require.resolve(
    '@haaretz/htz-react-base/base-next-config/configShim'
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
