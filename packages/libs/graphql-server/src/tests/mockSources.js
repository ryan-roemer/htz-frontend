import listMock from './mocks/list';
import pageMock from './mocks/page';

export default () => ({
  PageAPI: {
    getPage: args => pageMock(args),
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
