import AddComment from './mocks/AddComment';
import List from './mocks/list';
import NavMenu from './mocks/NavMenu';
import CommentsElement from './mocks/CommentsElement';
import Footer from './mocks/Footer';
import Asset from './mocks/Asset';
import BreakingNewsBox from './mocks/BreakingNewsBoxMock';
import NbaData from './mocks/NbaData';
import FootballGroupssData from './mocks/FootballGroupsData';
import FootballLeaguesData from './mocks/FootballLeaguesData';
import TableScoreError from './mocks/TableScoreError';

const mocks = {
  String: () => null,
  Int: () => null,
  Float: () => null,
  Date: () => 1542116220149,
  ImageAspects: () => ({
    vertical: {
      x: 488,
      y: 0,
      width: 1212,
      height: 1420,
    },
    regular: {
      x: 127,
      y: 36,
      width: 1910,
      height: 1432,
    },
    headline: {
      x: 64,
      y: 87,
      width: 2041,
      height: 1187,
    },
    square: {
      x: 365,
      y: 28,
      width: 1442,
      height: 1440,
    },
    full: {
      width: 2200,
      height: 1468,
    },
  }),
  AddComment,
  CommentsElement,
  Footer,
  List,
  NavMenu,
  Asset,
  BreakingNewsBox,
  NbaData,
  FootballLeaguesData,
  FootballGroupssData,
  TableScoreError,
};

export default mocks;
