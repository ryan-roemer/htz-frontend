import gqlServerConfig from '../api';

console.log = jest.fn();

describe('create API', async () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // this is important
    process.env = { ...OLD_ENV, };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('on SUCCESS', async () => {
    process.env.NODE_ENV = 'development';

    await expect(gqlServerConfig().context({ req: { headers: 'www.haaretz.co.il', }, }))
      .resolves.toMatchSnapshot();
  });

  test('Return empty object when request is empty', async () => {
    process.env.NODE_ENV = 'development';

    await expect(gqlServerConfig().context({req:null}))
      .resolves.toEqual({});
  });

  test('Throw when there is no request', async () => {
    process.env.NODE_ENV = 'development';

    await expect(
      gqlServerConfig().context(undefined)
    ).resolves.toEqual({});
  });

  test('Reject when request is null', async () => {
    process.env.NODE_ENV = 'development';

    await expect(
      gqlServerConfig().context(null)
    ).rejects.toThrow('Your request object is "null"\n' +
      'Are you running outside an Apollo context?'
    );
  });
});
