const { BUNDLE_ANALYZE, } = process.env;

module.exports = {
  analyzeServer: [ 'server', 'both', ].includes(BUNDLE_ANALYZE),
  analyzeBrowser: [ 'browser', 'both', ].includes(BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
};
