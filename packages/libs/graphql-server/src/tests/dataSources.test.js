import { RESTDataSource, } from 'apollo-datasource-rest';
import dataSources from '../dataSources';

describe('DataSources', () => {
  const {
    PageAPI,
    PapiAPI,
    SsoAPI,
    PurchasePageAPI,
    FinanceAPI,
    OtpAPI,
    NewSsoOperationsAPI,
    HtzFunctionOperationsAPI,
    TableScoreAPI,
  } = dataSources();

  test('Page API', () => {
    expect(PageAPI).toBeInstanceOf(RESTDataSource);
  });

  test('Papi API', () => {
    expect(PapiAPI).toBeInstanceOf(RESTDataSource);
  });

  test('Sso API', () => {
    expect(SsoAPI).toBeInstanceOf(RESTDataSource);
  });

  test('PurchasePage API', () => {
    expect(PurchasePageAPI).toBeInstanceOf(RESTDataSource);
  });

  test('Finance API', () => {
    expect(FinanceAPI).toBeInstanceOf(RESTDataSource);
  });

  test('Otp API', () => {
    expect(OtpAPI).toBeInstanceOf(RESTDataSource);
  });

  test('NewSsoOperations API', () => {
    expect(NewSsoOperationsAPI).toBeInstanceOf(RESTDataSource);
  });

  test('HtzFunctionOperations API', () => {
    expect(HtzFunctionOperationsAPI).toBeInstanceOf(RESTDataSource);
  });

  test('TableScore API', () => {
    expect(TableScoreAPI).toBeInstanceOf(RESTDataSource);
  });
});
