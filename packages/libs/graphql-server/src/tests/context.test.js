import createContext from '../utils/createContext';

describe('create context', async () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // this is important
    process.env = { ...OLD_ENV, };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('in DEV', () => {
    process.env.NODE_ENV = 'development';

    const context = createContext({ hostname: 'www.haaretz.co.il', });

    expect(context).toMatchSnapshot();
  });

  test('in PROD', () => {
    process.env.NODE_ENV = 'production';

    const context = createContext({ hostname: 'www.haaretz.co.il', });

    expect(context).toMatchSnapshot();
  });
});
