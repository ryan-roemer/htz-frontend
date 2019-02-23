module.exports = api => {
  api.cache(process.env.NODE_ENV !== 'development');

  if (process.env.PLATFORM && process.env.PLATFORM === 'app') {
    return {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
      ],
    };
  }

  return {
    presets: [ '@babel/preset-flow', 'next/babel', ],
    plugins: [
      'lodash',
      'babel-plugin-transform-react-remove-prop-types',
      'babel-plugin-transform-flow-strip-types',
    ],
  };
};
