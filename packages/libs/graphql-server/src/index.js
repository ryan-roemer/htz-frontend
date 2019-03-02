import { schema, } from '@haaretz/app-utils';
import config from 'config';
import { ApolloServer, } from 'apollo-server';
// Even though this isn't used directly in this package, this file acts as the
// server entry point, so it should make any environment adjustments (like
// adding this `fetch` global) here. That way they'll be available to any
// modules that Next.js imports while routing and rendering pages.
import 'isomorphic-fetch';
import createRemoteSchema from './createRemoteSchema';
import gqlServerConfig from './api';

const port = parseInt(
  process.env.GRAPHQL_PORT || (config.has('graphQLPort') ? config.get('graphQLPort') : '4000'),
  10
);
const userInfoUri = config.get('service.userInfoUri');

async function run() {
  const schemas = [];
  let userInfo;
  let fbInstantSubscribe;
  let predicta;
  try {
    userInfo = await createRemoteSchema(userInfoUri);
    schemas.push(userInfo);
  }
  catch (err) {
    console.log(`ms-apps user info / : ${err}`);
  }
  try {
    fbInstantSubscribe = await createRemoteSchema(
      'https://ms-apps.haaretz.co.il/ms-fb-instant/subscribe'
    );
    schemas.push(fbInstantSubscribe);
  }
  catch (err) {
    console.log(`ms-fb-instant error  / : ${err}`);
  }
  try {
    predicta = await createRemoteSchema(
      'http://172.21.1.95:5000/'
    );
    schemas.push(predicta);
  }
  catch (err) {
    console.log(`Predicta error  / : ${err}`);
  }

  const server = new ApolloServer(gqlServerConfig(schemas));

  server.listen({ port, }).then(({ url, }) => {
    console.log(`🚀 Server ready at ${url} (local machine) and ${config.get('hostIp')}:${port} `);
  });
}

try {
  run();
}
catch (e) {
  console.error(e, e.message, e.stack);
  process.exit(1);
}
