const express = require('express');
const next = require('next');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const compression = require('compression');
const enforce = require('express-sslify');
const mobxReact = require('mobx-react');
const LRUCache = require('lru-cache');
const cookieParser = require('cookie-parser');


// Set up some globals.
const port = 9000;

// Set up next.js.
const app = next({ dir: '.', dev: false });
const handle = app.getRequestHandler();

// Set up MobX for SSR.
mobxReact.useStaticRendering(true);

// Some security middlewares,
const security = [
  hpp(),
  helmet.xssFilter(),
  helmet.frameguard('deny'),
  helmet.ieNoOpen(),
  helmet.noSniff(),
];

let cacheTime = 1000 * 60 * 60;

// if (dev) {
//  cacheTime = 100;
//}

const ssrCache = new LRUCache({
    max: 100,
    maxAge: cacheTime,
  });
  
  function getCacheKey(req) {
    return `${req.url}`;
  }
  
  function renderAndCache(req, res, pagePath, queryParams) {
    const key = getCacheKey(req);
  
    if (ssrCache.has(key)) {
      console.log(`CACHE HIT: ${key}`);
      res.send(ssrCache.get(key));
      return;
    }
  
    app
      .renderToHTML(req, res, pagePath, queryParams)
      .then(html => {
        console.log(`CACHE MISS: ${key}`);
        ssrCache.set(key, html);
  
        res.send(html);
      })
      .catch(err => {
        app.renderError(err, req, res, pagePath, queryParams);
      });
  }
  
  function renderNoCache(req, res, pagePath, queryParams) {
    app
      .renderToHTML(req, res, pagePath, queryParams)
      .then(html => {
        res.send(html);
      })
      .catch(err => {
        app.renderError(err, req, res, pagePath, queryParams);
      });
  }

  app
  .prepare()
  .then(() => {
    const server = express();
    const staticDir = path.resolve(__dirname, '..', '.next/static');
    server.use('/_next/static', express.static(staticDir));
    // form parser.
    server.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    // Body parser.
    server.use(bodyParser.json());

    // Cookie
    server.use(cookieParser());

    // Use CORS.
    server.use(cors());

    // Use HPP & helmet for security.
    server.use(...security);

    // Use compression.
    server.use(compression());

    // Enforce HTTPS on production.
    // if (!dev) server.use(enforce.HTTPS({ trustProtoHeader: true }));

    server.get('*', (req, res) => {
      handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;

      console.log(`${'\u2705'}  Ready on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.log('Application Error =---->', error);
  });