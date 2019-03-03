import testServer from '../runTestServer';
import query from './listQuery.graphql';

it('fetches single list', async () => {
  // // run query against the server and snapshot the output
  const { errors, data, } = await testServer.query({ query, variables: { input: { listId: '7.7829323', }, }, });

  expect(errors).toBeUndefined();
  expect(data).toMatchSnapshot();
});
