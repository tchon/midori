/* eslint no-console: 0 */
import http from 'http';
import proxy from '../src/proxy';
import connect from '../src/connect';

const createApp = proxy({ target: 'https://www.google.com', secure: false });

const app = createApp({
  request(req, res) {
    res.statusCode = 404;
    res.end();
  },
  error(err) {
    console.log('GOT ERROR', err);
  },
});

connect(app, http.createServer()).listen(8081);
