import 'dotenv/config';
import path from 'path';
import express from 'express';
// import proxy from 'http-proxy-middleware';
import compression from 'compression';
import helmet from 'helmet';
import next from 'next';
import cors from 'cors';
import config from 'config';
// Even though this isn't used directly in this package, this file acts as the
// server entry point, so it should make any environment adjustments (like
// adding this `fetch` global) here. That way they'll be available to any
// modules that Next.js imports while routing and rendering pages.
import 'isomorphic-fetch';
import morgan from 'morgan';
import morganJson from 'morgan-json';

import htz from './routes/htz';
import tm from './routes/tm';
import hdc from './routes/hdc';
import purchase from './routes/purchase';
import finance from './routes/finance';
import login from './routes/login';

// To satisfy Extend peer dependencies

const enableHttpLogging = config.has('enableHttpLogging')
  ? config.get('enableHttpLogging') === true
  : false;

const DEV = process.env.NODE_ENV === 'development';
const PORT = parseInt(process.env.PORT || (config.has('appPort') ? config.get('appPort') : '3000'), 10);
const assetPrefix = config.has('assetPrefix') ? config.get('assetPrefix') : '';
const app = next({ dev: DEV, });
const handler = app.getRequestHandler();
const selectedRoute = process.argv[2];
const sitesRouting = new Map([
  [ 'htz', htz, ],
  [ 'tm', tm, ],
  [ 'hdc', hdc, ],
  [ 'purchase', purchase, ],
  [ 'finance', finance, ],
  [ 'login', login, ],
]);

// Fail-fast in case of missing routing argument
if (!(selectedRoute && sitesRouting.has(selectedRoute))) {
  console.error(new Error('Missing required routing argument!'));
  process.exit(1);
}

// const serviceBase = config.get('service.base');
// const logLevel = config.has('logLevel') ? config.get('logLevel') : null;
// proxy middleware options
// const proxyOptions = {
//   target: `${serviceBase}`, // target host
//   changeOrigin: true, // needed for virtual hosted sites
//   ws: true, // proxy websockets
//   // pathRewrite: {
//   //   '^/api/old-path': '/api/new-path', // rewrite path
//   //   '^/api/remove/path': '/path', // remove base path
//   // },
//   router: {
//     // when request.headers.host == 'dev.localhost:3000',
//     // override target 'http://www.example.org' to 'http://localhost:8000'
//     [`${serviceBase}:${PORT}`]: `${serviceBase}:8080`,
//   },
// };
// if (logLevel === 'debug') {
//   proxyOptions.logLevel = 'debug';
// }
// console.log('proxy options:', JSON.stringify(proxyOptions));
// // create the proxy (without context)
// const tomcatProxy = proxy(proxyOptions);

async function run() {
  app
    .prepare()
    // eslint-disable-next-line consistent-return
    .then(() => {
      const server = express();
      if (enableHttpLogging) {
        // Morgan json formatted messages
        // const morganFormat = morganJson(':remote-addr - :remote-user [:date[clf]]
        // :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent');
        server.use(
          morgan(
            morganJson({
              short: 'HTTP/:http-version :method :url :status',
              length: ':res[content-length]',
              'response-time': ':response-time ms',
              'remote-addr': ':remote-addr',
              referrer: ':referrer',
              'user-agent': ':user-agent',
            })
          )
        ); // HTTP logging
      }
      if (!DEV) {
        server.use(compression()); // Compress responses.
      }
      server.use(helmet({ frameguard: false, })); // Various security-minded settings.
      // cors allows querying the server from different ports and aliases.
      server.use(cors());

      server.get([ /^((\/_next\/).*)+$/, ], (req, res) => {
        const query = {
          path: req.params[0],
        };
        return app.render(req, res, '/', query);
      });

      // Get the current app's routing module.
      sitesRouting.get(selectedRoute)(app, server, DEV);

      // Use static assets from the `static` directory
      server.use(
        '/static',
        express.static(path.join(`${process.cwd()}/static`), {
          redirect: false,
        })
      );

      server.get('/', handler);

      // Fallback to tomcat via proxy
      // server.all('*', tomcatProxy);
      // For Zones
      console.warn(`assetPrefix set to ${assetPrefix}`);
      app.setAssetPrefix(assetPrefix);

      server.listen(PORT, err => {
        if (err) throw err;
        console.info(`> Ready on your ${config.get('hostIp')}:${PORT}`);
      });
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

try {
  run();
}
catch (e) {
  console.error(e, e.message, e.stack);
  process.exit(1);
}
