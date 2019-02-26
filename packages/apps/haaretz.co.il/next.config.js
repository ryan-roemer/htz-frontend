/* eslint-disable no-param-reassign,import/no-extraneous-dependencies,import/order */

const path = require('path');
const fs = require('fs');
const glob = require('glob');

// //////////////////////////// //
//   Next and Webpack Plugins   //
// //////////////////////////// //

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

const nextConfig = () => {
  const { webpack, } = baseNextConfig;

  return {
    ...baseNextConfig,
    webpack: (config, opts) => {
      // if (!opts.isServer) {
      //   console.log(
      //     '\n\n\nCONFIG:\n',
      //     JSON.stringify(config.optimization.minimizer, null, 2)
      //   );
      // }
      // console.log('\n\n\nOPTS:\n', JSON.stringify(opts, null, 2));
      const {
        dir,
        dev,
        isServer,
        // buildId,
        // config: nextConfig,
        // defaultLoaders,
        totalPages,
      } = opts;
      const isClient = !isServer;

      if (isClient && !dev) {
        // // Minifier options (uses terser)
        // config.optimization.minimizer = (
        //   config.optimization.minimizer || []
        // ).forEach(item => {
        //   // extract legal comments to separate file
        //   item.options.extractComment = true;
        //
        //   // don't include any comments in the production file
        //   if (item.options.terserOptions) item.options.terserOptions.output.comments = false;
        // });

        // const pagesPath = path.join(dir, 'pages');
        // const articlePages = (
        //   glob.sync('**/*article*.js', {
        //     nonull: false,
        //     cwd: pagesPath,
        //     nocase: true,
        //     nodir: true,
        //   }) || []
        // ).length;
        const { cacheGroups, } = config.optimization.splitChunks;

        // We have many article pages, which share different layouts,
        // but a fairly common dependency graph. Next's default rule
        // for including modules in the `commons` package is that a
        // module needs to be in demand in more that half the pages.
        // since more than half our pages are articles, non-article pages
        // are sent a lot of code they will never use.
        cacheGroups.commons.minChunks = totalPages - 2;

        // cacheGroups.commonVendors = {
        //   name: 'commons',
        //   chunks: 'all',
        //   test: /[\\/]node_modules[\\/]((*.fela.*)|(*.apollo.*)|graphql|next)/,
        // };
      }

      return {
        ...webpack(config, opts),
      };
    },
  };
};

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */

// ////////////////////////////

module.exports = BUNDLE_ANALYZE
  ? withBundleAnalyzer(withTranspiledModules(nextConfig()))
  : withSourceMaps(withTranspiledModules(nextConfig()));
