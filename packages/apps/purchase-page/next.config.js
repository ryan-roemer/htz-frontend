/* eslint-disable no-param-reassign */
// const path = require('path');

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */

module.exports = {
  // useFileSystemPublicRoutes: true,
  // Dealing with multi-server deployment https://nextjs.org/docs/#customizing-webpack-config
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    const revision = require('child_process')
      .execSync('git rev-parse HEAD')
      .toString()
      .trim();
    console.log(`Next App BuildID is: ${revision}`);
    return revision;
  },
  pageExtensions: [ 'jsx', 'js', ],
  webpack: (config, { dev, }) => {
    // Make sure `resolve.alias` exists.
    config.resolve.alias = config.resolve.alias || {};

    config.resolve.alias.config$ = require.resolve(
      '@haaretz/htz-react-base/webpack/configShim'
    );

    return config;
  },
};
