const params = require('strong-params');
import bodyParser from 'body-parser';
import express from 'express';
import { Logger } from './lib/logger';
import { routes as apiRoutes } from './routes/index';
const app = express();
const logger = new Logger();

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(params.expressMiddleware());
app.use(logger.getRequestLogger());

app.use('/api', apiRoutes);
app.get('/health', (req, res) => res.json({ status: true, message: 'Health OK!' }));

app.use(logger.getRequestErrorLogger());

app.use((req, res, next) => {
  const err = new Error(404);
  res.statusCode = 404;
  res.send(err.message);
});
export { app };
