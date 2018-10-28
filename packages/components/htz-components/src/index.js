/* eslint-disable import/no-named-as-default, import/no-unresolved */

/** *************************************** *
 *       C  O  M  P  O  N  E  N  T  S       *
 * **************************************** */

// Articles
import RecipeArticle from './components/ArticleTypes/RecipeArticle/RecipeArticle';
import ReviewArticle from './components/ArticleTypes/ReviewArticle/ReviewArticle';
import StandardArticle from './components/ArticleTypes/StandardArticle/StandardArticle';

// components
import A11yDialog from './components/A11yDialog/A11yDialog';
import A11yError from './components/A11yError/A11yError';
import ActionButtons from './components/ActionButtons/ActionButtons';
import AriaLive from './components/AriaLive/AriaLive';
import ArticleBody from './components/ArticleBody/ArticleBody';
import ApolloBoundary from './components/ApolloBoundary/ApolloBoundary';
import Button from './components/Button/Button';
import ButtonGroup from './components/Button/ButtonGroup';
import Caption from './components/Caption/Caption';
import Carousel from './components/Carousel/Carousel';
import ChangeableElementGroup from './components/ChangeableElementGroup/ChangeableElementGroup';
import CheckBox from './components/CheckBox/CheckBox';
import Comments from './components/CommentsSection/WrappedComments';
import Debug from './components/Debug/Debug';
import Embed from './components/Embed/Embed';
import FiniteStateMachine from './components/FiniteStateMachine/FiniteStateMachine';
import Footer from './components/Footer/Footer';
import Form from './components/Form/Form';
import GaDimensions from './components/GoogleAnalytics/GaDimensions';
import GoogleAnalytics from './components/GoogleAnalytics/GoogleAnalytics';
import Grid from './components/Grid/Grid';
import GridItem from './components/Grid/GridItem';
import H from './components/AutoLevels/H';
import HeadlineElement from './components/HeadlineElement/HeadlineElement';
import HtmlElement from './components/Interactive/components/HtmlElement';
import Image from './components/Image/Image';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Interactive from './components/Interactive/Interactive';
import DeviceTypeInjector from './components/DeviceTypeInjector/DeviceTypeInjector';
import LayoutContainer from './components/PageLayout/LayoutContainer';
import LayoutRow from './components/PageLayout/LayoutRow';
import HtzLink from './components/HtzLink/HtzLink';
import LinksBlock from './components/RelatedArticles/LinksBlock';
import List from './components/List/List';
import Masthead from './components/Masthead/Masthead';
import Media from './components/Media/Media';
import MobileQuickRegistration from './components/MobileQuickRegistration/MobileQuickRegistration';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Newsletter from './components/Newsletter/Newsletter';
import Outbrain from './components/Outbrain/Outbrain';
import Osaka from './components/Osaka/OsakaController';
import PageSchema from './components/PageSchema/PageSchema';
import Paragraph from './components/Paragraph/Paragraph';
import Portal from './components/Portal/Portal';
import Quote from './components/Quote/Quote';
import RelatedArticles from './components/RelatedArticles/RelatedArticles';
import RadioButton from './components/RadioButton/RadioButton';
import RadioGroup from './components/RadioButton/RadioGroup';
import RouteChangeListener from './components/EventListeners/RouteChangeListener';
import Scroll from './components/Scroll/Scroll';
import ScrollListener from './components/EventListeners/ScrollListener';
import Section from './components/AutoLevels/Section';
import Select from './components/Select/Select';
import SeriesArticles from './components/RelatedArticles/SeriesArticles';
import Tags from './components/Tags/Tags';
import TextInput from './components/TextInput/TextInput';
import TextLink from './components/TextLink/TextLink';
import Video from './components/Video/Video';
import PremiumContentMeta from './components/PremiumContentMeta/PremiumContentMeta';

// Icons
import IconAccessibility from './components/Icon/icons/IconAccessibility';
import IconAlef from './components/Icon/icons/IconAlef';
import IconAlefLogo from './components/Icon/icons/IconAlefLogo';
import IconAlefLogoTransparent from './components/Icon/icons/IconAlefLogoTransparent';
import IconAlert from './components/Icon/icons/IconAlert';
import IconAndroid from './components/Icon/icons/IconAndroid';
import IconApple from './components/Icon/icons/IconApple';
import IconAvatar from './components/Icon/icons/IconAvatar';
import IconBack from './components/Icon/icons/IconBack';
import IconBold from './components/Icon/icons/IconBold';
import IconBundle from './components/Icon/icons/IconBundle';
import IconCamera from './components/Icon/icons/IconCamera';
import IconCheck from './components/Icon/icons/IconCheck';
import IconClock from './components/Icon/icons/IconClock';
import IconClose from './components/Icon/icons/IconClose';
import IconComment from './components/Icon/icons/IconComment';
import IconCredit from './components/Icon/icons/IconCredit';
import IconDislike from './components/Icon/icons/IconDislike';
import IconDrive from './components/Icon/icons/IconDrive';
import IconFacebook from './components/Icon/icons/IconFacebook';
import IconFacebookLogo from './components/Icon/icons/IconFacebookLogo';
import IconGPlus from './components/Icon/icons/IconGPlus';
import IconHaaretzLogo from './components/Icon/icons/IconHaaretzLogo';
import IconHaaretzFullLogo from './components/Icon/icons/IconHaaretzFullLogo';
import IconHtzLoader from './components/Icon/icons/IconHtzLoader';
import IconInfo from './components/Icon/icons/IconInfo';
import IconItalic from './components/Icon/icons/IconItalic';
import IconLevels from './components/Icon/icons/IconLevels';
import IconLike from './components/Icon/icons/IconLike';
import IconLock from './components/Icon/icons/IconLock';
import IconMail from './components/Icon/icons/IconMail';
import IconMailAlert from './components/Icon/icons/IconMailAlert';
import IconMarkerLogo from './components/Icon/icons/IconMarkerLogo';
import IconMarkerLogoTransparent from './components/Icon/icons/IconMarkerLogoTransparent';
import IconMenu from './components/Icon/icons/IconMenu';
import IconMessenger from './components/Icon/icons/IconMessenger';
import IconPaypal from './components/Icon/icons/IconPaypal';
import IconPdf from './components/Icon/icons/IconPdf';
import IconPlus from './components/Icon/icons/IconPlus';
import IconPortions from './components/Icon/icons/IconPortions';
import IconPrint from './components/Icon/icons/IconPrint';
import IconQuote from './components/Icon/icons/IconQuote';
import IconReading from './components/Icon/icons/IconReading';
import IconRss from './components/Icon/icons/IconRss';
import IconSafePayment from './components/Icon/icons/IconSafePayment';
import IconSave from './components/Icon/icons/IconSave';
import IconSearch from './components/Icon/icons/IconSearch';
import IconSettings from './components/Icon/icons/IconSettings';
import IconStar from './components/IconStar/IconStar';
import IconTablet from './components/Icon/icons/IconTablet';
import IconTheMarker from './components/Icon/icons/IconTheMarker';
import IconTmLoader from './components/Icon/icons/IconTmLoader';
import IconTwitter from './components/Icon/icons/IconTwitter';
import IconWhatsapp from './components/Icon/icons/IconWhatsapp';
import IconZen from './components/Icon/icons/IconZen';
import IconZoomIn from './components/Icon/icons/IconZoomIn';
import IconZoomOut from './components/Icon/icons/IconZoomOut';

// User
import CheckEmailExists from './components/User/CheckEmailExists';
import Login from './components/User/Login';
import Logout from './components/User/Logout';
import Register from './components/User/Register';
import UserDispenser from './components/User/UserDispenser';
import UserInjector from './components/User/UserInjector';
import LoginExample from './components/User/LoginExample';
import RegisterExample from './components/User/RegisterExample';

// DFP
import DfpInjector from './components/Ads/DfpInjector';
import GeneralAdSlot from './components/Ads/GeneralAdSlot';

/** ************************************ *
 *       U  T  I  L  I  T  I  E  S       *
 * ************************************* */
import createApp from './createApp';
import createDocument from './createDocument';
import setColor from './utils/setColor';
import { appendScript, } from './utils/scriptTools';
import { stylesPropType, } from './propTypes/stylesPropType';
import extractParamFromUrl from './components/BI/extractParamFromUrl';

// BI
import BIAction from './components/BI/BIAction';
import BIRequest from './components/BI/BIRequest';

// Event tracker
import EventTracker from './utils/EventTracker';

export {
  // ArticleTypes
  StandardArticle,
  RecipeArticle,
  ReviewArticle,
  // Components
  A11yDialog,
  A11yError,
  ActionButtons,
  AriaLive,
  ArticleBody,
  Button,
  ButtonGroup,
  Caption,
  Carousel,
  ChangeableElementGroup,
  CheckBox,
  Comments,
  Debug,
  DeviceTypeInjector,
  Embed,
  FiniteStateMachine,
  Footer,
  Form,
  GaDimensions,
  GoogleAnalytics,
  Grid,
  GridItem,
  H,
  HeadlineElement,
  HtmlElement,
  Image,
  ImageGallery,
  Interactive,
  LayoutContainer,
  LayoutRow,
  HtzLink,
  LinksBlock,
  List,
  Masthead,
  Media,
  MobileQuickRegistration,
  NavigationMenu,
  Outbrain,
  Osaka,
  PageSchema,
  Paragraph,
  Portal,
  Quote,
  RadioButton,
  RadioGroup,
  RelatedArticles,
  RouteChangeListener,
  Scroll,
  ScrollListener,
  Section,
  Select,
  SeriesArticles,
  Tags,
  TextInput,
  TextLink,
  Video,
  PremiumContentMeta,
  // Icons
  IconAccessibility,
  IconAlef,
  IconAlefLogo,
  IconAlefLogoTransparent,
  IconAlert,
  IconAndroid,
  IconApple,
  IconAvatar,
  IconBack,
  IconBold,
  IconBundle,
  IconCamera,
  IconCheck,
  IconClock,
  IconClose,
  IconComment,
  IconCredit,
  IconDislike,
  IconDrive,
  IconFacebook,
  IconFacebookLogo,
  IconGPlus,
  IconHaaretzLogo,
  IconHaaretzFullLogo,
  IconHtzLoader,
  IconInfo,
  IconItalic,
  IconLevels,
  IconLike,
  IconLock,
  IconMail,
  IconMailAlert,
  IconMarkerLogo,
  IconMarkerLogoTransparent,
  IconMenu,
  IconMessenger,
  IconPaypal,
  IconPdf,
  IconPlus,
  IconPortions,
  IconPrint,
  IconQuote,
  IconReading,
  IconRss,
  IconSafePayment,
  IconSave,
  IconSearch,
  IconSettings,
  IconStar,
  IconTablet,
  IconTheMarker,
  IconTmLoader,
  IconTwitter,
  IconWhatsapp,
  IconZen,
  IconZoomIn,
  IconZoomOut,
  // User
  CheckEmailExists,
  Login,
  Logout,
  Newsletter,
  Register,
  UserDispenser,
  UserInjector,
  LoginExample,
  RegisterExample,
  DfpInjector,
  GeneralAdSlot,
  // Utils
  appendScript,
  createApp,
  createDocument,
  setColor,
  stylesPropType,
  extractParamFromUrl,
  // BI
  BIAction,
  BIRequest,
  // Event tracker
  EventTracker,
  ApolloBoundary,
};
