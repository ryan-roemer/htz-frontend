// Base named colors

const colors = {
  // semantic use-cases
  accent: {
    base: [ 'tertiary', 'base', ],
  },
  bg: {
    base: [ 'primary', '-6', ],
    '+1': [ 'primary', '-5', ],
  },
  bodyText: {
    base: [ 'neutral', '-1', ],
    inverse: [ 'neutral', '-6', ],
  },
  checkBox: {
    // Primary
    primaryBg: 'white',
    primaryBgChecked: [ 'primary', 'base', ],
    primaryBorder: [ 'primary', 'base', ],
    primaryBorderDisabled: [ 'neutral', '-5', ],
    primaryCheck: 'white',
    primaryRipple: [ 'primary', 'base', ],

    // Secondary
    secondaryBg: 'white',
    secondaryBgChecked: [ 'secondary', 'base', ],
    secondaryBorder: [ 'secondary', 'base', ],
    secondaryBorderDisabled: [ 'neutral', '-5', ],
    secondaryCheck: 'white',
    secondaryRipple: [ 'secondary', 'base', ],
  },
  highlight: {
    base: [ 'quaternary', 'base', ],
    dimm: [ 'quaternary', '-2', ],
  },
  icon: {
    base: [ 'primary', 'base', ],
    text: [ 'neutral', '-3', ],
  },
  sales: {
    '-2': '#FFF7E5',
    '-1': '#FFC64D',
    base: '#FFA500',
    '+1': '#FA9E00',
    '+2': '#F59300',
    '+3': '#ED8600',
    a11yOnLight: '#A7610C',
  },

  // state
  disabled: {
    text: [ 'neutral', '-4', ],
    bg: [ 'neutral', '-5', ],
  },

  negative: {
    '-1': [ 'tertiary', '-1', ],
    base: [ 'tertiary', 'base', ],
    '+1': [ 'tertiary', '+1', ],
    a11yOnDark: [ 'tertiary', '-1', ],
  },
  positive: {
    '-2': '#F5FFF5',
    '-1': '#5BB856',
    base: '#2F872A',
    '+1': '#266D22',
    '+2': '#194716',
    a11yOnDark: [ 'positive', '-1', ],
  },
  quaternary: {
    '-3': '#FFF8BC',
    '-2': '#FFF17A',
    '-1': '#FFED4E',
    base: '#FFE70C',
    '+1': '#E8D20B',
    '+2': '#BAA909',
    '+3': '#A39308',
  },
  site: {
    htz: '#0B7EB5',
    bundle: '#bd1c87',
    tm: '#00C800',
    hdc: '#003147',
  },

  neutral: {
    '-10': 'white',
    '-7': '#F5F5F5',
    '-6': '#EBEBEB',
    '-5': '#CCC',
    '-4': '#B4B4B4',
    '-3': '#787878',
    '-2': '#505050',
    '-1': '#2D2D2D',
    base: '#222',
    '+1': '#161616',
    '+2': 'black',
  },
};

export default colors;
