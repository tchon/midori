/* eslint no-console: 0 */
import compose from 'lodash/flowRight';
import http from 'http';
import serve from '../src/middleware/serve';
import status from '../src/middleware/status';
import send from '../src/middleware/send';
import verbs from '../src/middleware/match/verbs';
import connect from '../src/adapter/http';

const createApp = compose(
  verbs.get('/foo', serve({ root: __dirname })),
  compose(status(404), send()),
);

const app = createApp({
  request() {
    console.log('GOT REQUEST');
  },
  error(err) {
    console.log('GOT ERROR', err);
  },
});

connect(app, http.createServer()).listen(8081);