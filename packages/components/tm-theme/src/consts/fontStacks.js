const fallbackFont = '"Helvetica Neue",Helvetica,Arial,sans-serif';

const fontStacks = Object.freeze({
  webfonts: [
    [
      'Open Sans Hebrew',
      [
        '/static/fonts/OpenSansHebrewLight.woff2',
        '/static/fonts/OpenSansHebrewLight.woff',
      ],
      { fontWeight: 200, fontDisplay: 'swap', },
    ],
    [
      'Open Sans Hebrew',
      [
        '/static/fonts/OpenSansHebrewRegular.woff2',
        '/static/fonts/OpenSansHebrewRegular.woff',
      ],
      { fontWeight: 400, fontDisplay: 'swap', },
    ],
    [
      'Open Sans Hebrew',
      [
        '/static/fonts/OpenSansHebrewBold.woff2',
        '/static/fonts/OpenSansHebrewBold.woff',
      ],
      { fontWeight: 700, fontDisplay: 'swap', },
    ],
  ],
  base: `"Open Sans Hebrew",${fallbackFont}`,
  alt: fallbackFont,
  commercial: fallbackFont,
});

export default fontStacks;
