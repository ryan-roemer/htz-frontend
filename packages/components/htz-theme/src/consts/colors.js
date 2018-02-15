const colors = {
  // named colors
  black: '#000',
  white: '#FFF',
  neutral: {
    '-10': 'white',
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
  primary: {
    '-6': '#EBF2F5',
    '-5': '#E6EDF0',
    '-4': '#DAE9F2',
    '-3': '#ACD2ED',
    '-2': '#169FD1',
    '-1': '#289DD3',
    base: '#0B7EB5',
    '+1': '#006B96',
  },
  secondary: {
    base: '#00537A',
    '+1': '#003D59',
    '+2': '#003147',
  },
  tertiary: {
    '-4': '#FEE',
    '-3': '#FFA6A6',
    '-2': '#CC7676',
    '-1': '#AB353B',
    base: '#A8001C',
    '+1': '#8A021B',
    '+2': '#6A0114',
    '+3': '#480713',
  },
  quaternary: {
    '-3': '#FCF3CB',
    '-2': '#FFEC98',
    '-1': '#FFDF54',
    base: '#FFD20C',
    '+1': '#E8BF0C',
    '+2': '#CCA601',
    '+3': '#AA8C0B',
  },

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
  button: {
    // Primary
    primaryBg: 'white',
    primaryBorder: [ 'button', 'primaryText', ],
    primaryText: [ 'primary', 'base', ],
    primaryActiveBg: '#fff !important',
    primaryActiveBorder: [ 'button', 'primaryText', ],
    primaryActiveText: [ 'primary', 'base', ],
    primaryFocusBg: [ 'primary', 'base', ],
    primaryFocusBorder: [ 'button', 'primaryFocusBg', ],
    primaryFocusText: 'white',
    primaryHoverBg: [ 'primary', '-6', ],
    primaryHoverBorder: [ 'button', 'primaryHoverText', ],
    primaryHoverText: [ 'primary', '+1', ],

    // Primary Opaque
    primaryOpaqueBg: [ 'primary', 'base', ],
    primaryOpaqueBorder: 'transparent',
    primaryOpaqueText: 'white',
    primaryOpaqueActiveBg: [ 'primary', '+1', ],
    primaryOpaqueActiveBorder: 'transparent',
    primaryOpaqueActiveText: 'white',
    primaryOpaqueFocusBg: [ 'secondary', 'base', ],
    primaryOpaqueFocusBorder: 'transparent',
    primaryOpaqueFocusText: 'white',
    primaryOpaqueHoverBg: [ 'primary', '+1', ],
    primaryOpaqueHoverBorder: 'transparent',
    primaryOpaqueHoverText: 'white',

    // Negative
    negativeBg: 'white',
    negativeBorder: [ 'button', 'negativeText', ],
    negativeText: [ 'negative', 'base', ],
    negativeActiveBg: '#fff !important',
    negativeActiveBorder: [ 'button', 'negativeText', ],
    negativeActiveText: [ 'negative', 'base', ],
    negativeFocusBg: [ 'negative', 'base', ],
    negativeFocusBorder: 'transparent',
    negativeFocusText: '#fff',
    negativeHoverBg: [ 'tertiary', '-4', ],
    negativeHoverBorder: [ 'button', 'negativeHoverText', ],
    negativeHoverText: [ 'negative', '+1', ],

    // Negative Opaque
    negativeOpaqueBg: [ 'negative', 'base', ],
    negativeOpaqueBorder: 'transparent',
    negativeOpaqueText: 'white',
    negativeOpaqueActiveBg: [ 'negative', 'base', ],
    negativeOpaqueActiveBorder: 'transparent',
    negativeOpaqueActiveText: 'white',
    negativeOpaqueFocusBg: [ 'tertiary', '+2', ],
    negativeOpaqueFocusBorder: 'transparent',
    negativeOpaqueFocusText: '#fff !important',
    negativeOpaqueHoverBg: [ 'negative', '+1', ],
    negativeOpaqueHoverBorder: 'transparent',
    negativeOpaqueHoverText: 'white',

    // Positive
    positiveBg: 'white',
    positiveBorder: [ 'button', 'positiveText', ],
    positiveText: [ 'positive', 'base', ],
    positiveActiveBg: '#fff !important',
    positiveActiveBorder: [ 'button', 'positiveText', ],
    positiveActiveText: [ 'positive', 'base', ],
    positiveFocusBg: [ 'positive', 'base', ],
    positiveFocusBorder: 'transparent',
    positiveFocusText: 'rgb(255, 255, 255)',
    positiveHoverBg: [ 'positive', '-2', ],
    positiveHoverBorder: [ 'button', 'positiveHoverText', ],
    positiveHoverText: [ 'positive', '+1', ],

    // Positive Opaque
    positiveOpaqueBg: [ 'positive', 'base', ],
    positiveOpaqueBorder: 'transparent',
    positiveOpaqueText: 'white',
    positiveOpaqueActiveBg: [ 'positive', 'base', ],
    positiveOpaqueActiveBorder: 'transparent',
    positiveOpaqueActiveText: 'white',
    positiveOpaqueFocusBg: [ 'positive', '+2', ],
    positiveOpaqueFocusBorder: 'transparent',
    positiveOpaqueFocusText: 'white',
    positiveOpaqueHoverBg: [ 'positive', '+1', ],
    positiveOpaqueHoverBorder: 'transparent',
    positiveOpaqueHoverText: 'white',

    // Facebook
    facebookBg: 'white',
    facebookBorder: [ 'button', 'facebookText', ],
    facebookText: [ 'facebook', 'base', ],
    facebookActiveBg: '#fff !important',
    facebookActiveBorder: [ 'button', 'facebookText', ],
    facebookActiveText: [ 'facebook', 'base', ],
    facebookFocusBg: [ 'facebook', 'base', ],
    facebookFocusBorder: 'transparent',
    facebookFocusText: 'rgba(255, 255, 255, 1)',
    facebookHoverBg: [ 'facebook', '-2', ],
    facebookHoverBorder: [ 'button', 'facebookHoverText', ],
    facebookHoverText: [ 'facebook', '+1', ],

    // Opaque Facebook button
    facebookOpaqueBg: [ 'facebook', 'base', ],
    facebookOpaqueBorder: 'transparent',
    facebookOpaqueText: 'white',
    facebookOpaqueActiveBg: [ 'facebook', '-1', ],
    facebookOpaqueActiveBorder: 'transparent',
    facebookOpaqueActiveText: 'white',
    facebookOpaqueFocusBg: [ 'facebook', '+1', ],
    facebookOpaqueFocusBorder: 'transparent',
    facebookOpaqueFocusText: 'white',
    facebookOpaqueHoverBg: [ 'facebook', '+1', ],
    facebookOpaqueHoverBorder: 'transparent',
    facebookOpaqueHoverText: 'white',

    // todo: get hover, and focus design
    // Opaque Format button
    formatOpaqueBg: [ 'primary', '-6', ],
    formatOpaqueBorder: 'transparent',
    formatOpaqueText: [ 'neutral', '-1', ],
    formatOpaqueActiveBg: [ 'primary', 'base', ],
    formatOpaqueActiveBorder: 'transparent',
    formatOpaqueActiveText: 'white',
    formatOpaqueFocusBg: [ 'primary', 'base', ],
    formatOpaqueFocusBorder: 'transparent',
    formatOpaqueFocusText: 'white',
    formatOpaqueHoverBg: [ 'primary', '-5', ],
    formatOpaqueHoverBorder: 'transparent',
    formatOpaqueHoverText: [ 'neutral', '-1', ],

    // Twitter
    twitterBg: 'white',
    twitterBorder: [ 'button', 'twitterText', ],
    twitterText: [ 'twitter', 'base', ],
    twitterActiveBg: '#fff !important',
    twitterActiveBorder: [ 'button', 'twitterText', ],
    twitterActiveText: [ 'button', 'twitterText', ],
    twitterFocusBg: [ 'twitter', 'base', ],
    twitterFocusBorder: 'transparent',
    twitterFocusText: 'hsl(0, 0%, 100%)',
    twitterHoverBg: [ 'twitter', '-2', ],
    twitterHoverBorder: [ 'button', 'twitterHoverText', ],
    twitterHoverText: [ 'twitter', '+1', ],

    // Opaque Twitter button
    twitterOpaqueBg: [ 'twitter', 'base', ],
    twitterOpaqueBorder: 'transparent',
    twitterOpaqueText: 'white',
    twitterOpaqueActiveBg: [ 'twitter', '-1', ],
    twitterOpaqueActiveBorder: 'transparent',
    twitterOpaqueActiveText: 'white',
    twitterOpaqueFocusBg: [ 'twitter', '+1', ],
    twitterOpaqueFocusBorder: 'transparent',
    twitterOpaqueFocusText: 'white',
    twitterOpaqueHoverBg: [ 'twitter', '+1', ],
    twitterOpaqueHoverBorder: 'transparent',
    twitterOpaqueHoverText: 'white',

    // whatsapp
    whatsappBg: 'white',
    whatsappBorder: [ 'button', 'whatsappText', ],
    whatsappText: [ 'whatsapp', 'base', ],
    whatsappActiveBg: '#fff !important',
    whatsappActiveBorder: [ 'button', 'whatsappText', ],
    whatsappActiveText: [ 'button', 'whatsappText', ],
    whatsappFocusBg: [ 'whatsapp', 'base', ],
    whatsappFocusBorder: 'transparent',
    whatsappFocusText: 'hsla(0, 0%, 100%, 1)',
    whatsappHoverBg: [ 'whatsapp', '-2', ],
    whatsappHoverBorder: [ 'button', 'whatsappHoverText', ],
    whatsappHoverText: [ 'whatsapp', '+1', ],

    // Opaque whatsapp button
    whatsappOpaqueBg: [ 'whatsapp', 'base', ],
    whatsappOpaqueBorder: 'transparent',
    whatsappOpaqueText: [ 'bodyText', 'base', ],
    whatsappOpaqueActiveBg: [ 'whatsapp', '+2', ],
    whatsappOpaqueActiveBorder: 'transparent',
    whatsappOpaqueActiveText: [ 'bodyText', 'base', ],
    whatsappOpaqueFocusBg: [ 'whatsapp', '+1', ],
    whatsappOpaqueFocusBorder: 'transparent',
    whatsappOpaqueFocusText: [ 'bodyText', 'base', ],
    whatsappOpaqueHoverBg: [ 'whatsapp', '+1', ],
    whatsappOpaqueHoverBorder: 'transparent',
    whatsappOpaqueHoverText: [ 'bodyText', 'base', ],

    // Sales
    salesBg: 'white',
    salesBorder: [ 'button', 'salesText', ],
    salesText: [ 'sales', 'a11yOnLight', ],
    salesActiveBg: '#fff !important',
    salesActiveBorder: [ 'button', 'salesText', ],
    salesActiveText: [ 'button', 'salesText', ],
    salesFocusBg: [ 'sales', 'base', ],
    salesFocusBorder: 'transparent',
    salesFocusText: 'hsla(0, 0%, 100%, .99)',
    salesHoverBg: [ 'sales', '-2', ],
    salesHoverBorder: [ 'button', 'salesHoverText', ],
    salesHoverText: [ 'sales', '+1', ],

    // Opaque Sales button
    salesOpaqueBg: [ 'sales', 'base', ],
    salesOpaqueBorder: 'transparent',
    salesOpaqueText: 'white',
    salesOpaqueActiveBg: [ 'sales', '+2', ],
    salesOpaqueActiveBorder: 'transparent',
    salesOpaqueActiveText: 'white',
    salesOpaqueFocusBg: [ 'sales', '+1', ],
    salesOpaqueFocusBorder: 'transparent',
    salesOpaqueFocusText: 'white',
    salesOpaqueHoverBg: [ 'sales', '+1', ],
    salesOpaqueHoverBorder: 'transparent',
    salesOpaqueHoverText: 'white',
  },
  comments: {
    authorName: [ 'primary', 'base', ],
    bg: 'white',
    border: [ 'neutral', '-4', ],
    divider: [ 'primary', '+1', ],
    date: [ 'neutral', '-3', ],
    highlightedCommentBg: [ 'bg', 'base', ],
    highlightStatus: [ 'primary', '-2', ],
    number: [ 'neutral', '-3', ],
    report: [ 'negative', 'a11yOnDark', ],
    replyIcon: [ 'neutral', '-4', ],
    subcommentAuthor: [ 'neutral', '-4', ],
    subcommentBorder: [ 'primary', '-4', ],
  },
  highlight: {
    base: [ 'quaternary', 'base', ],
    dimm: [ 'quaternary', '-2', ],
  },
  icon: {
    base: [ 'primary', 'base', ],
    text: [ 'neutral', '-3', ],
  },
  select: {
    // Primary
    primaryBg: 'white',
    primaryBorder: [ 'primary', 'base', ],
    primaryBorderItem: [ 'neutral', '-6', ],
    primaryArrowColor: [ 'primary', 'base', ],
    primaryTextColor: [ 'primary', 'base', ],

    // Primary highlighted
    primaryHighlightedBg: [ 'primary', '-6', ],
    // Primary hover
    primaryHoverBg: [ 'primary', '-6', ],
    // Primary Focus
    primaryFocusBg: [ 'primary', '-6', ],
  },
  input: {
    // Primary
    primaryBg: [ 'primary', '-6', ],
    primaryBgWrapper: 'transparent',
    primaryBorder: [ 'primary', '-4', ],
    primaryBorderTextLabel: [ 'primary', '-5', ],
    primaryPlaceholder: [ 'neutral', '-4', ],
    primaryText: [ 'bodyText', 'base', ],
    primaryTextLabel: [ 'primary', '+1', ],
    primaryTextLabelDisabled: [ 'neutral', '-4', ],
    primaryTextNote: [ 'neutral', '-4', ],
    primaryAbbr: [ 'tertiary', 'base', ],

    // Primary Focus
    primaryFocusBg: 'white',
    primaryFocusBorder: [ 'primary', 'base', ],

    // Primary Error state
    primaryErrorBorder: [ 'tertiary', '+1', ],
    primaryErrorText: [ 'bodyText', 'base', ],
    primaryErrorTextLabel: [ 'tertiary', 'base', ],
    primaryErrorTextNote: [ 'tertiary', 'base', ],

    // Primary Hover
    primaryHoverBg: [ 'primary', '-5', ],
    primaryHoverBorder: [ 'primary', '-4', ],
    primaryHoverText: [ 'bodyText', 'base', ],

    // PrimaryInverse
    primaryInverseBg: 'white',
    primaryInverseBgWrapper: 'transparent',
    primaryInverseBorder: [ 'primary', '-4', ],
    primaryInverseBorderTextLabel: [ 'primary', '-5', ],
    primaryInversePlaceholder: [ 'neutral', '-4', ],
    primaryInverseText: [ 'bodyText', 'base', ],
    primaryInverseTextLabel: [ 'primary', '+1', ],
    primaryInverseTextLabelDisabled: [ 'neutral', '-4', ],
    primaryInverseTextNote: 'white',
    primaryInverseAbbr: [ 'primary', 'base', ],

    // PrimaryInverse Focus
    primaryInverseFocusBg: 'white',
    primaryInverseFocusBorder: [ 'primary', 'base', ],

    // PrimaryInverse Error state
    primaryInverseErrorBorder: [ 'tertiary', '+1', ],
    primaryInverseErrorText: [ 'bodyText', 'base', ],
    primaryInverseErrorTextLabel: [ 'tertiary', 'base', ],
    primaryInverseErrorTextNote: [ 'tertiary', 'base', ],

    // PrimaryInverse Hover
    primaryInverseHoverBg: [ 'primary', '-5', ],
    primaryInverseHoverBorder: [ 'primary', '-4', ],
    primaryInverseHoverText: [ 'bodyText', 'base', ],

    // TODO: Fill up
  },
  image: {
    bgc: [ 'neutral', '-6', ],
  },
  link: {
    base: [ 'primary', 'base', ],
    a11yOnDark: [ 'primary', '-2', ],
    a11yOnLight: [ 'primary', '+1', ],
  },
  sales: {
    '-2': '#FFF1E5',
    '-1': '#FF8926',
    base: '#F17105',
    '+1': '#BF5A04',
    '+2': '#B15304',
    a11yOnLight: [ 'sales', '+1', ],
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

  // social
  facebook: {
    '-2': '#F2F6FF',
    '-1': '#4766A6',
    base: '#3b5998',
    '+1': '#2A4682',
    messanger: '#0084FF',
  },
  twitter: {
    '-2': '#F2FAFF',
    '-1': '#67BEF4',
    base: '#1DA1F2',
    '+1': '#1888CC',
    '+2': '#1577B2',
  },
  whatsapp: {
    '-2': '#F0FFF5',
    '-1': '#58F593',
    base: '#25D366',
    '+1': '#12B850',
    '+2': '#08993E',
  },
  gplus: '#DB4437',
  linkedin: '#0077B5',
  pinterest: '#BD081C',
  snapchat: '#FFFC00',
};

export default colors;
