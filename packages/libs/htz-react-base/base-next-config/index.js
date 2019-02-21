const configWebpack = require('./webpack');
const analyzerConfig = require('./bundleAnalyzerConfig');
const getPackagesToTranspile = require('./getPackagesToTranpile');

const { BUNDLE_ANALYZE, NEXT_BUILD_ID, } = process.env;

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */
const baseNextConfig = {
  transpileModules: [
    ...getPackagesToTranspile({ exclude: 'commitlint-config', }),
  ],

  // Dealing with multi-server deployment
  // https://nextjs.org/docs/#customizing-webpack-config
  generateBuildId,
  pageExtensions: [ 'jsx', 'js', ],

  ...(BUNDLE_ANALYZE ? analyzerConfig : {}),

  webpack: configWebpack,
};

module.exports = baseNextConfig;

// //////////////////// //
//   Helper Functions   //
// //////////////////// //

async function generateBuildId() {
  // For example get the latest git commit hash here
  // Since this is a production-only issue, provide this as an environment variable at prod
  const revision = NEXT_BUILD_ID || 'LATEST';
  console.log(`Next App BuildID is: ${revision}`);
  return revision;
}
