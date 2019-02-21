// Correctly generate source maps for @haaretz packages the app depends on
const htzSourcemapLoader = {
  test: /\.(mjs|jsx|js)$/,
  use: [ 'source-map-loader', ],
  enforce: 'pre',
  // Only get source maps from haaretz packages
  exclude: /node_modules(?!@haaretz)/,
  type: 'javascript/auto',
};

// Fix compilation issue when building from ESM
// see https://github.com/graphql/graphql-js/issues/1272
const fixMjsExtension = {
  test: /\.mjs$/,
  include: /node_modules/,
  type: 'javascript/auto',
};

module.exports = [ htzSourcemapLoader, fixMjsExtension, ];
