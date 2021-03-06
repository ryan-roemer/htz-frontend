// consts
import {
  teaserI18n,
  a11yMenuI18n,
  alertsI18n,
  breadcrumbsI18n,
  clickTrackerI18n,
  commentI18n,
  commentFormI18n,
  commentSentI18n,
  commentsSectionI18n,
  footerDesktopI18n,
  footerMobileListsI18n,
  fryListI18n,
  headerSearchI18n,
  mobileAdditionalShare,
  mobileNavigationMenuI18n,
  mobileQuickRegistrationI18n,
  mobileReadingList,
  mobileSearchI18n,
  mobileUserMenuI18n,
  navigationMenuI18n,
  newsletterI18n,
  osakaI18n,
  readingListMenuI18n,
  seriesArticleI18n,
  serviceByMailI18n,
  tagsElementI18n,
  textInputI18n,
  userMenuI18n,
  welcomePageI18n,
  zenTextI18n,
  zoominText,
  zoomoutText,
  selectAriaLabel,
} from './consts/i18n';
import getDelay from './methods/getDelay';
import articleStyle from './consts/articleStyle';
import bps from './consts/bps';
import btnStyle from './consts/btnStyle';
import captionStyles from './consts/captionStyles';
import cardStyle from './consts/cardStyle';
import commentsStyle from './consts/commentsStyle';
import fontStacks from './consts/fontStacks';
import footerBorderStyle from './consts/footerBorderStyle';
import getColor from './methods/getColor';
import getDuration from './methods/getDuration';
import getMqString from './methods/getMqString';
import getTimingFunction from './methods/getTimingFunction';
import getTransition from './methods/getTransition';
import getTransitionString from './methods/getTransitionString';
import getZIndex from './methods/getZIndex';
import gridStyle from './consts/gridStyle';
import inputStyle from './consts/inputStyle';
import mq from './methods/mq';
import pxToRem from './methods/pxToRem';
import selectStyle from './consts/selectStyle';
import typeConf from './consts/typeConf';
import typesetter from './methods/typesetter';

const tmTheme = Object.freeze({
  // Constants
  articleStyle,
  bps,
  btnStyle,
  captionStyles,
  cardStyle,
  commentsStyle,
  direction: 'rtl',
  gridStyle,
  fontStacks,
  footerBorderStyle,
  inputStyle,
  selectStyle,
  typeConf,

  // I18n
  teaserI18n,
  a11yMenuI18n,
  alertsI18n,
  breadcrumbsI18n,
  clickTrackerI18n,
  commentI18n,
  commentFormI18n,
  commentSentI18n,
  commentsSectionI18n,
  footerDesktopI18n,
  footerMobileListsI18n,
  fryListI18n,
  headerSearchI18n,
  mobileAdditionalShare,
  mobileNavigationMenuI18n,
  mobileQuickRegistrationI18n,
  mobileReadingList,
  mobileSearchI18n,
  mobileUserMenuI18n,
  navigationMenuI18n,
  newsletterI18n,
  osakaI18n,
  readingListMenuI18n,
  seriesArticleI18n,
  serviceByMailI18n,
  tagsElementI18n,
  textInputI18n,
  userMenuI18n,
  welcomePageI18n,
  zenTextI18n,
  zoominText,
  zoomoutText,
  selectAriaLabel,
  // Methods
  color: getColor,
  getDelay,
  getDuration,
  getTimingFunction,
  getTransition,
  getTransitionString,
  getMqString,
  getZIndex,
  mq,
  pxToRem,
  type: typesetter,
});

export default tmTheme;
