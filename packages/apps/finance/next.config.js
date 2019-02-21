/* eslint-disable no-param-reassign,import/no-extraneous-dependencies,import/order */

// //////////////// //
//   Next Plugins   //
// //////////////// //

const withTranspiledModules = require('next-transpile-modules');
const withSourceMaps = require('@zeit/next-source-maps')();
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

// This is our base configuration for next js app. It can either
// be used as is, or extended and customized for the specific
// app's needs.
const baseNextConfig = require('@haaretz/htz-react-base/base-next-config');

// ////////////////// //
//   Config and Env   //
// ////////////////// //

const {
  BUNDLE_ANALYZE,
  // NEXT_BUILD_ID,
  // NODE_ENV,
} = process.env;

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */

// ////////////////////////////

module.exports = BUNDLE_ANALYZE
  ? withBundleAnalyzer(withTranspiledModules(baseNextConfig))
  : withSourceMaps(withTranspiledModules(baseNextConfig));
