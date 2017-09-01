const { configure, } = require('@haaretz/htz-react-base/styleguide');

// When passed an object, `configure` will do a (shallow) extend of the default
// config. If you need to extend a particular value (e.g. `styleguideComponents`),
// pass a function to `configure` and use `Object.assign` on both the root
// object and the value. The first argument will be the default config. Note
// that Babel syntax like object rest spread can't be used here.

module.exports = configure({
  title: 'haaretz.co.il Components',
  sections: [
    {
      name: 'Site Components',
      components: 'components/**/*.{js,jsx}',
    },
    {
      name: 'Shared Components',
      components:
        'node_modules/@haaretz/htz-components/src/components/**/*.{js,jsx}',
    },
  ],
});
