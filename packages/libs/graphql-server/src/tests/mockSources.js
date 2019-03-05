import listMock from './mocks/list';
import homePageMock from './mocks/homePage';
import regularArticle from './mocks/regularArticle';
import scalarsMock from './mocks/scalars';

export default () => ({
  PageAPI: {
    getPage: args => {
      switch (args) {
        case '/':
          return homePageMock;
        case 'scalars':
          return scalarsMock.article;
        default:
          return regularArticle;
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
