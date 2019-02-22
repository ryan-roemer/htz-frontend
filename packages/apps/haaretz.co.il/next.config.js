/* eslint-disable no-param-reassign,import/no-extraneous-dependencies,import/order */

// //////////////////////////// //
//   Next and Webpack Plugins   //
// //////////////////////////// //

// const { withPlugins, optional, } = require('next-compose-plugins');
const withTranspiledModules = require('next-transpile-modules');
const withSourceMaps = require('@zeit/next-source-maps')();
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
// const withSize = require('next-size');

// ////////////////// //
//   Config and Env   //
// ////////////////// //

const { BUNDLE_ANALYZE, NEXT_BUILD_ID, NODE_ENV, } = process.env;
const configWebpack = require('./buildConfig/webpack');
const analyzerConfig = require('./buildConfig/bundleAnalyzerConfig');
const getPackagesToTranspile = require('./buildConfig/getPackagesToTranpile');

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */
const nextConfig = {
  // TODO: For some reason next-plugin-transpile-modules doesn't seem to
  // work for actually transpiling modules, but it does force the use of
  // the 'module' field instead of the 'main' field in imported modules.
  transpileModules: [
    '@haaretz/haaretz.co.il',
    ...getPackagesToTranspile({ exclude: 'commitlint-config', }),
  ],

  // Dealing with multi-server deployment
  // https://nextjs.org/docs/#customizing-webpack-config
  generateBuildId,
  pageExtensions: [ 'jsx', 'js', ],

  ...(BUNDLE_ANALYZE ? analyzerConfig : {}),

  webpack: configWebpack,
};

// ////////////
//
//
// ////////////////////////////

module.exports = BUNDLE_ANALYZE
  ? withBundleAnalyzer(withTranspiledModules(nextConfig))
  : withSourceMaps(withTranspiledModules(nextConfig));

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
