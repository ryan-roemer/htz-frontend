import { HttpLink, } from 'apollo-link-http';
import { RetryLink, } from 'apollo-link-retry';
import { getMainDefinition, } from 'apollo-utilities';
import { introspectSchema, makeRemoteExecutableSchema, } from 'apollo-server';
import { WebSocketLink, } from 'apollo-link-ws';
import { SubscriptionClient, } from 'subscriptions-transport-ws';
import WebSocket from 'ws';
import fetch from 'node-fetch';


const createWsLink = gqlServerUrl => {
  const wsUri = `ws://${gqlServerUrl}`;
  const wsClient = new SubscriptionClient(
    wsUri,
    {
      reconnect: true, // if connection is lost, retry
    },
    WebSocket
  );

  return new WebSocketLink(wsClient);
};

const createRemoteSchema = async uri => {
  const httpLink = new HttpLink({ uri, fetch, });
  const wsLink = createWsLink(uri);

  const link = new RetryLink({
    // these are the defaults, change them as you will
    delay: {
      initial: 300, // The number of milliseconds to wait before attempting the first retry.
      max: Infinity, // The maximum number of milliseconds that the link should wait for any retry
      jitter: true, // Whether delays between attempts should be randomized.
    },
    attempts: {
      max: 5, // The max number of times to try a single operation before giving up.
      retryIf: (error, _operation) => !!error, // A predicate function that can determine whether a particular response should be retried.
    },
  }).split( // using "Directional Composition" of links
    ({ query, }) => {
      const { kind, operation, } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const schema = await introspectSchema(httpLink);

  return makeRemoteExecutableSchema({
    schema,
    link,
  });
};

export default createRemoteSchema;
