'use strict';

const webpack = require('webpack');
const Server = require('../../lib/Server');

function start(config, options) {
  return new Promise((resolve, reject) => {
    let server;

    // eslint-disable-next-line no-undefined
    if (options.quiet === undefined) {
      options.quiet = true;
    }

    try {
      const compiler = webpack(config);
      server = new Server(compiler, options);

      server.listen(8080, 'localhost', (err) => {
        if (err) {
          end(server).then(() => {
            reject(err);
          });
          return;
        }

        resolve(server);
      });
    } catch (err) {
      end(server).then(() => {
        reject(err);
      });
    }
  });
}

function end(server) {
  if (!server) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    server.close(() => {
      server = null;
      resolve();
    });
  });
}

module.exports = { start, end };
