import listMock from './mocks/list';

export default () => ({
  PageAPI: {},
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
