const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const http = require('http');

const devProxy = {
  '/passport': {
    target: 'http://42.192.37.117:8080/',
    // target: "https://hub.composablelabs.io",
    changeOrigin: true,
    secure: false,
  },
  '/user': {
    target: 'http://42.192.37.117:8080/',
    // target: "https://hub.composablelabs.io",
    changeOrigin: true,
    secure: false,
  },
  '/project': {
    target: 'http://42.192.37.117:8080/',
    // target: "https://hub.composablelabs.io",
    changeOrigin: true,
    secure: false,
  },
  '/position': {
    target: 'http://42.192.37.117:8080/',
    // target: "https://hub.composablelabs.io",
    changeOrigin: true,
    secure: false,
  },
  '/requirement': {
    target: 'http://42.192.37.117:8080/',
    // target: "https://hub.composablelabs.io",
    changeOrigin: true,
    secure: false,
  },
};

let port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
console.log('dev>>>>', dev);
const app = next({ dev });
const handle = app.getRequestHandler();

function checkPortAvailability(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        reject(err);
      }
    });
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    server.listen(port);
  });
}

async function startServer() {
  let portAvailable = false;
  while (!portAvailable) {
    portAvailable = await checkPortAvailability(port);
    if (!portAvailable) {
      console.log(`Port ${port} is not available. Trying another port...`);
      port++;
    }
  }

  const server = express();

  if (dev && devProxy) {
    Object.keys(devProxy).forEach(function (context) {
      server.use(createProxyMiddleware(context, devProxy[context]));
    });
  }

  server.all('*', (req, res) => {
    handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) {
      console.log('An error occurred, unable to start the server');
      console.log(err);
      return;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
}

app
  .prepare()
  .then(() => {
    startServer();
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
