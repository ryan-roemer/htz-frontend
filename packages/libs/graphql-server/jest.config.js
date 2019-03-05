module.exports = {
  testURL: 'http://localhost',
  coveragePathIgnorePatterns: [ '/node_modules/', '/src/dataSources.js', ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
