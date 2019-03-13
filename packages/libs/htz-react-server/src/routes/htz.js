import path from 'path';

export default function htz(app, server, DEV) {
  // send robots.txt file
  const options = {
    root: path.join(
      `${process.cwd()}/static${process.env.CONNECTION_PRESET === 'stage' ? '/stage' : ''}`
    ),
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
  };

  server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', options));

  /* Home Page */
  server.get('/', (req, res) => {
    if (req.params[0] && !req.params[0].startsWith('/')) {
      req.params[0] = `/${req.params[0]}`;
    }
    else {
      req.params[0] = '/';
    }
    const query = {
      path: req.params[0],
    };
    return app.render(req, res, '/', query);
  });

  /* test smadar page(homepage test) */
  server.get('/smadar', (req, res) => {
    const query = {
      path: req.path,
    };
    return app.render(req, res, '/smadar_test_', query);
  });

  /* Article Page */
  server.get([ /^.*(1\.\d+){1}$/, ], (req, res) => {
    if (!req.params[0].startsWith('/')) {
      req.params[0] = `/${req.params[0]}`;
    }
    const query = {
      path: req.path,
    };
    console.log(`Article page on path from htz routing: ${req.path}`);

    if (req.path.indexOf('RECIPE-') >= 0) {
      return app.render(req, res, '/recipeArticle', query);
    }
    if (req.path.indexOf('REVIEW-') >= 0) {
      console.log('found review, rendering review page');
      return app.render(req, res, '/reviewArticle', query);
    }
    if (req.path.indexOf('MAGAZINE-') >= 0) {
      console.log('found MAGAZINE, rendering MAGAZINE page');
      return app.render(req, res, '/magazineArticle', query);
    }

    if (req.path.indexOf('LIVE-') >= 0) {
      console.log('found live blog, rendering live blog page');
      return app.render(req, res, '/liveBlogArticle', query);
    }

    console.log('rendering standardArticle');

    return app.render(req, res, '/standardArticle', query);
  });
}
