const path = require('path');

const { BUNDLE_ANALYZE, } = process.env;
const reportsPath = path.join('..', 'bundles');

module.exports = {
  analyzeServer: [ 'server', 'both', ].includes(BUNDLE_ANALYZE),
  analyzeBrowser: [ 'browser', 'both', ].includes(BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: path.join(reportsPath, 'server.html'),
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: path.join(reportsPath, 'client.html'),
    },
  },
};
