import listMock from './mocks/list';
import homePageMock from './mocks/homePage';
import regularArticleMock from './mocks/regularArticle';
import mouseStoryMock, { withoutMain, } from './mocks/mouseStory';

export default () => ({
  PageAPI: {
    getPage: args => {
      switch (args) {
        case 'regularArticle':
          return regularArticleMock;
        case 'mouseStory':
          return mouseStoryMock;
        case 'mouseStoryWithoutMainElement':
          return withoutMain;
        default:
          return homePageMock;
      }
    },
  },
  PapiAPI: {
    getList: args => listMock(args),
  },
  SsoAPI: {},
  PurchasePageAPI: {},
  FinanceAPI: {},
  OtpAPI: {},
  NewSsoOperationsAPI: {},
  HtzFunctionOperationsAPI: {},
  TableScoreAPI: {},
});
