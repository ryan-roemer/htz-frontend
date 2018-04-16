/* eslint-disable import/no-named-as-default */
/** *************************************** *
 *       C  O  M  P  O  N  E  N  T  S       *
 * **************************************** */
import A11yDialog from './components/A11yDialog/A11yDialog';
import ActionButtons from './components/ActionButtons/ActionButtons';
import Article from './components/Article/Article';
import ArticleBody from './components/ArticleBody/ArticleBody';
import Button from './components/Button/Button';
import ButtonGroup from './components/Button/ButtonGroup';
import Caption from './components/Caption/Caption';
import CheckBox from './components/CheckBox/CheckBox';
import Comments from './components/CommentsSection/CommentsWithApollo';
import Embed from './components/Embed/Embed';
import Form from './components/Form/Form';
import Grid from './components/Grid/Grid';
import GridItem from './components/Grid/GridItem';
import HeadlineElement from './components/HeadlineElement/HeadlineElement';
import HtmlElement from './components/Interactive/components/HtmlElement';
import Image from './components/Image/Image';
import Interactive from './components/Interactive/Interactive';
import LayoutContainer from './components/PageLayout/LayoutContainer';
import LayoutRow from './components/PageLayout/LayoutRow';
import Link from './components/Link/Link';
import LinksBlock from './components/RelatedArticles/LinksBlock';
import List from './components/List/List';
import MobileQuickRegistration from './components/MobileQuickRegistration/MobileQuickRegistration';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Osaka from './components/Osaka/OsakaController';
import Portal from './components/Portal/Portal';
import Quote from './components/Quote/Quote';
import RelatedArticles from './components/RelatedArticles/RelatedArticles';
import RadioButton from './components/RadioButton/RadioButton';
import RadioGroup from './components/RadioButton/RadioGroup';
import StandardArticlePageLayout from './components/PageLayout/StandardArticlePageLayout';
import Scroll from './components/Scroll/Scroll';
import ScrollListener from './components/EventListeners/ScrollListener';
import Select from './components/Select/Select';
import SeriesArticles from './components/RelatedArticles/SeriesArticles';
import Tags from './components/Tags/Tags';
import TextInput from './components/TextInput/TextInput';
import Video from './components/Video/Video';

// Icons
import IconAccessibility from './components/Icon/icons/IconAccessibility';
import IconAlef from './components/Icon/icons/IconAlef';
import IconAlefLogo from './components/Icon/icons/IconAlefLogo';
import IconAlert from './components/Icon/icons/IconAlert';
import IconAndroid from './components/Icon/icons/IconAndroid';
import IconApple from './components/Icon/icons/IconApple';
import IconAvatar from './components/Icon/icons/IconAvatar';
import IconBack from './components/Icon/icons/IconBack';
import IconBold from './components/Icon/icons/IconBold';
import IconCamera from './components/Icon/icons/IconCamera';
import IconClose from './components/Icon/icons/IconClose';
import IconComment from './components/Icon/icons/IconComment';
import IconDislike from './components/Icon/icons/IconDislike';
import IconFacebook from './components/Icon/icons/IconFacebook';
import IconFacebookLogo from './components/Icon/icons/IconFacebookLogo';
import IconGPlus from './components/Icon/icons/IconGPlus';
import IconHaaretzLogo from './components/Icon/icons/IconHaaretzLogo';
import IconHalfStar from './components/Icon/icons/IconHalfStar';
import IconHtzLoader from './components/Icon/icons/IconHtzLoader';
import IconItalic from './components/Icon/icons/IconItalic';
import IconLike from './components/Icon/icons/IconLike';
import IconMail from './components/Icon/icons/IconMail';
import IconMailAlert from './components/Icon/icons/IconMailAlert';
import IconMailFooter from './components/Icon/icons/IconMailFooter';
import IconMenu from './components/Icon/icons/IconMenu';
import IconPlus from './components/Icon/icons/IconPlus';
import IconPrint from './components/Icon/icons/IconPrint';
import IconQuote from './components/Icon/icons/IconQuote';
import IconReading from './components/Icon/icons/IconReading';
import IconRss from './components/Icon/icons/IconRss';
import IconSearch from './components/Icon/icons/IconSearch';
import IconSettings from './components/Icon/icons/IconSettings';
import IconStar from './components/Icon/icons/IconStar';
import IconTheMarker from './components/Icon/icons/IconTheMarker';
import IconTmLoader from './components/Icon/icons/IconTmLoader';
import IconTwitter from './components/Icon/icons/IconTwitter';
import IconWhatsapp from './components/Icon/icons/IconWhatsapp';
import IconZen from './components/Icon/icons/IconZen';
import IconZoomIn from './components/Icon/icons/IconZoomIn';
import IconZoomOut from './components/Icon/icons/IconZoomOut';

// User
import Login from './components/User/Login';
import Logout from './components/User/Logout';
import Register from './components/User/Register';
import UserDispenser from './components/User/UserDispenser';
import UserInjector from './components/User/UserInjector';
import LoginExample from './components/User/LoginExample';
import RegisterExample from './components/User/RegisterExample';

// DFP
import DfpInjector from './components/Ads/DfpInjector';
import AdSlot from './components/Ads/AdSlot';

/** ************************************ *
 *       U  T  I  L  I  T  I  E  S       *
 * ************************************* */
import createDocument from './document';

export {
  A11yDialog,
  ActionButtons,
  Article,
  ArticleBody,
  Button,
  ButtonGroup,
  Caption,
  CheckBox,
  Comments,
  Embed,
  Form,
  Grid,
  GridItem,
  HeadlineElement,
  HtmlElement,
  Image,
  Interactive,
  LayoutContainer,
  LayoutRow,
  Link,
  LinksBlock,
  List,
  MobileQuickRegistration,
  NavigationMenu,
  Osaka,
  Portal,
  Quote,
  RadioButton,
  RadioGroup,
  RelatedArticles,
  Scroll,
  ScrollListener,
  Select,
  SeriesArticles,
  StandardArticlePageLayout,
  Tags,
  TextInput,
  Video,
  // Icons
  IconAccessibility,
  IconAlef,
  IconAlefLogo,
  IconAlert,
  IconAndroid,
  IconApple,
  IconAvatar,
  IconBack,
  IconBold,
  IconCamera,
  IconClose,
  IconComment,
  IconDislike,
  IconFacebook,
  IconFacebookLogo,
  IconGPlus,
  IconHaaretzLogo,
  IconHalfStar,
  IconHtzLoader,
  IconItalic,
  IconLike,
  IconMail,
  IconMailAlert,
  IconMailFooter,
  IconMenu,
  IconPlus,
  IconPrint,
  IconQuote,
  IconReading,
  IconRss,
  IconSearch,
  IconSettings,
  IconStar,
  IconTheMarker,
  IconTmLoader,
  IconTwitter,
  IconWhatsapp,
  IconZen,
  IconZoomIn,
  IconZoomOut,
  // User
  Login,
  Logout,
  Register,
  UserDispenser,
  UserInjector,
  LoginExample,
  RegisterExample,
  DfpInjector,
  AdSlot,
  // Utils
  createDocument,
};
