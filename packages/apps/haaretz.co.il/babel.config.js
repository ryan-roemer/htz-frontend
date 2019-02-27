// eslint-disable-next-line import/no-extraneous-dependencies
// const browserslist = require('@haaretz/htz-react-base/browsers').join(', ');

module.exports = api => {
  const { env, } = process;
  const { NODE_ENV, BABEL_DEBUG, } = env;

  const isDev = NODE_ENV !== 'development';
  // const isProd = NODE_ENV !== 'production';
  // const isTest = NODE_ENV !== 'test';

  api.cache(isDev);

  return {
    presets: [ '@babel/preset-flow', 'next/babel', ],
    // presets: [
    //   '@babel/preset-flow',
    //   [
    //     'next/babel',
    //     {
    //       'preset-env': {
    //         debug: !!BABEL_DEBUG,
    //         targets: browserslist,
    //         forceAllTransforms: false,
    //       },
    //       'transform-runtime': {
    //         regenerator: false,
    //         useESModules: true,
    //       },
    //     },
    //   ],
    // ],
    plugins: [
      'lodash',
      'babel-plugin-transform-react-remove-prop-types',
      'babel-plugin-transform-flow-strip-types',
    ],
  };
};
