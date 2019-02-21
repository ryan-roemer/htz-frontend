/* eslint-disable no-param-reassign,import/no-extraneous-dependencies,import/order */

// //////////////////////////// //
//   Next and Webpack Plugins   //
// //////////////////////////// //

const { withPlugins, optional, } = require('next-compose-plugins');
const withSize = require('next-size');
const withSourceMaps = require('@zeit/next-source-maps')();
// const withSourceMaps = require('./buildConfig/withSourceMaps')();

// ////////////////// //
//   Config and Env   //
// ////////////////// //

const { BUNDLE_ANALYZE, NEXT_BUILD_ID, NODE_ENV, } = process.env;
const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');
const configWebpack = require('./buildConfig/webpack');

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */
const nextConfig = {
  // Dealing with multi-server deployment
  // https://nextjs.org/docs/#customizing-webpack-config
  generateBuildId,
  pageExtensions: [ 'jsx', 'js', ],

  webpack: configWebpack,
};

//
//
// ////////////////////////////

module.exports = withPlugins(
  [
    // Transpile internal modules. MUST ALWAYS BE FIRST
    [
      optional(() => require('next-transpile-modules')),
      {
        // TODO: For some reason next-plugin-transpile-modules doesn't seem to
        // work for actually transpiling modules, but it does force the use of
        // the 'module' field instead of the 'main' field in imported modules.
        //
        transpileModules: [ '@haaretz', ],
        // transpileModules: [],
      },
      [ PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER, ],
    ],

    // Generate source maps
    withSourceMaps,

    // Show bundle-size statisics
    withSize,

    // Analyze webpack bundles
    [
      optional(() => require('@zeit/next-bundle-analyzer')),
      require('./buildConfig/bundleAnalyzerConfig'),
      [ BUNDLE_ANALYZE, ],
    ],
  ],
  nextConfig
);

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
