// Base named colors
const baseColors = {
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
    '-3': '#FFF8BC',
    '-2': '#FFF17A',
    '-1': '#FFED4E',
    base: '#FFE70C',
    '+1': '#E8D20B',
    '+2': '#BAA909',
    '+3': '#A39308',
  },
};

const colors = {
  ...baseColors,

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

    // Neutral
    neutralBg: 'transparent',
    neutralBorder: [ 'button', 'neutralText', ],
    neutralText: [ 'neutral', '-1', ],
    neutralActiveBg: 'transparent !important',
    neutralActiveBorder: [ 'button', 'neutralText', ],
    neutralActiveText: [ 'button', 'neutralText', ],
    neutralFocusBg: [ 'neutral', '-1', ],
    neutralFocusBorder: [ 'button', 'neutralFocusBg', ],
    neutralFocusText: 'hsl(0,0%,100%)',
    neutralHoverBg: 'rgba(0,0,0,.1)',
    neutralHoverBorder: [ 'button', 'neutralText', ],
    neutralHoverText: [ 'button', 'neutralText', ],
    // Neutral Opaque

    neutralOpaqueBg: [ 'neutral', '-1', ],
    neutralOpaqueBorder: 'transparent',
    neutralOpaqueText: [ 'neutral', '-6', ],
    neutralOpaqueActiveBg: [ 'neutral', '-4', ],
    neutralOpaqueActiveBorder: 'transparent',
    neutralOpaqueActiveText: [ 'neutral', 'base', ],
    neutralOpaqueFocusBg: [ 'neutral', '-2', ],
    neutralOpaqueFocusBorder: [ 'neutral', '+2', ],
    neutralOpaqueFocusText: 'white',
    neutralOpaqueHoverBg: [ 'neutral', '-2', ],
    neutralOpaqueHoverBorder: 'transparent',
    neutralOpaqueHoverText: 'white',

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
    negativeOpaqueFocusBg: [ 'negative', '+1', ],
    negativeOpaqueFocusBorder: [ 'neutral', 'base', ],
    negativeOpaqueFocusText: 'rgba(255,255,254,0.99)',
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
    positiveFocusBg: [ 'positive', '-2', ],
    positiveFocusBorder: 'transparent',
    positiveFocusText: [ 'neutral', 'base', ],
    positiveHoverBg: [ 'positive', '-3', ],
    positiveHoverBorder: [ 'button', 'positiveHoverText', ],
    positiveHoverText: [ 'positive', '+1', ],

    // Positive Opaque
    positiveOpaqueBg: [ 'positive', 'base', ],
    positiveOpaqueBorder: 'transparent',
    positiveOpaqueText: 'white',
    positiveOpaqueActiveBg: [ 'positive', 'base', ],
    positiveOpaqueActiveBorder: 'transparent',
    positiveOpaqueActiveText: 'white',
    positiveOpaqueFocusBg: [ 'positive', '-1', ],
    positiveOpaqueFocusBorder: 'transparent',
    positiveOpaqueFocusText: [ 'neutral', 'base', ],
    positiveOpaqueHoverBg: [ 'positive', '-2', ],
    positiveOpaqueHoverBorder: 'transparent',
    positiveOpaqueHoverText: [ 'neutral', 'base', ],

    // Secondary
    secondaryBg: [ 'secondary', 'base', ],
    secondaryBorder: 'white',
    secondaryText: 'white',
    // todo: ask max about these colors
    secondaryActiveBg: [ 'secondary', '+1', ],
    secondaryActiveBorder: 'white',
    secondaryActiveText: 'white',
    secondaryFocusBg: [ 'secondary', '+2', ],
    secondaryFocusBorder: 'white',
    secondaryFocusText: 'white',
    secondaryHoverBg: [ 'secondary', '+1', ],
    secondaryHoverBorder: 'white',
    secondaryHoverText: 'white',

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

    // Opaque formatting button
    formattingOpaqueBg: [ 'primary', '-6', ],
    formattingOpaqueBorder: 'transparent',
    formattingOpaqueText: [ 'neutral', '-1', ],
    formattingOpaqueActiveBg: [ 'primary', 'base', ],
    formattingOpaqueActiveBorder: 'transparent',
    formattingOpaqueActiveText: 'white',
    formattingOpaqueFocusBg: [ 'primary', 'base', ],
    formattingOpaqueFocusBorder: 'transparent',
    formattingOpaqueFocusText: 'white',
    formattingOpaqueHoverBg: [ 'primary', '-5', ],
    formattingOpaqueHoverBorder: 'transparent',
    formattingOpaqueHoverText: [ 'neutral', '-1', ],

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
    salesFocusText: [ 'neutral', '-1', ],
    salesHoverBg: [ 'sales', '-2', ],
    salesHoverBorder: [ 'button', 'salesHoverText', ],
    salesHoverText: [ 'button', 'salesText', ],

    // Opaque Sales button
    salesOpaqueBg: [ 'sales', 'base', ],
    salesOpaqueBorder: 'transparent',
    salesOpaqueText: [ 'neutral', '-1', ],
    salesOpaqueActiveBg: [ 'sales', '+1', ],
    salesOpaqueActiveBorder: 'transparent',
    salesOpaqueActiveText: [ 'button', 'salesOpaqueText', ],
    salesOpaqueFocusBg: [ 'sales', '+2', ],
    salesOpaqueFocusBorder: 'transparent',
    salesOpaqueFocusText: [ 'button', 'salesOpaqueText', ],
    salesOpaqueHoverBg: [ 'sales', '+2', ],
    salesOpaqueHoverBorder: 'transparent',
    salesOpaqueHoverText: [ 'button', 'salesOpaqueText', ],
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

  footer: {
    bg: [ 'secondary', 'base', ],
    border: 'white',
    text: 'white',
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
    text: [ 'bodyText', 'base', ],
  },
  newsletter: {
    // Newsletter
    highlightBg: [ 'highlight', 'base', ],
    highlightTextTitle: [ 'neutral', 'base', ],
    highlightText: [ 'neutral', 'base', ],

    // Primary
    primaryBg: [ 'primary', '-6', ],
    primaryTextTitle: [ 'neutral', 'base', ],
    primaryText: [ 'neutral', 'base', ],
  },
  highlight: {
    base: [ 'quaternary', 'base', ],
    dimm: [ 'quaternary', '-2', ],
  },
  icon: {
    base: [ 'primary', 'base', ],
    text: [ 'neutral', '-3', ],
  },
  // Primary
  select: {
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
    primaryTextNote: [ 'neutral', '-3', ],
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
    primaryInverseTextNote: [ 'neutral', '-3', ],
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
  },
  image: {
    bgc: [ 'neutral', '-6', ],
  },
  link: {
    base: [ 'primary', 'base', ],
    a11yOnDark: [ 'primary', '-2', ],
    a11yOnLight: [ 'primary', '+1', ],
  },
  radioButton: {
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

  sales: {
    '-2': '#FFF7E5',
    '-1': '#FFBD45',
    base: '#FFA500',
    '+1': '#FA9600',
    '+2': '#ED8600',
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
    '-3': '#E7FFE5',
    '-2': '#6BCC66',
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

export { colors, baseColors, };
export default colors;
