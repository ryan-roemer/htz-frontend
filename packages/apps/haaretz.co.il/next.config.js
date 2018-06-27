/* eslint-disable no-param-reassign */

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 */

module.exports = {
  // Dealing with multi-server deployment https://nextjs.org/docs/#customizing-webpack-config
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    // Since this is a production-only issue, provide this as an environment variable at prod
    const revision = process.env.NEXT_BUILD_ID || 'LATEST';
    console.log(`Next App BuildID is: ${revision}`);
    return revision;
  },
  pageExtensions: [ 'jsx', 'js', ],
  webpack: (config, { dev, }) => {
    config.resolve.alias = config.resolve.alias || {};

    config.resolve.alias.config$ = require.resolve(
      '@haaretz/htz-react-base/webpack/configShim'
    );

    return config;
  },
};
