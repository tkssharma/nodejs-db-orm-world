const params = require('strong-params');
import bodyParser from 'body-parser';
import express from 'express';
import { NOT_FOUND_STATUS_CODE, NOT_FOUND_STATUS_MESSAGE } from './config/constants';
import { Logger } from './lib/logger';
import {middlewares } from './app/middleware/errorHandler';
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
  const err = new Error(NOT_FOUND_STATUS_MESSAGE);
  res.statusCode = NOT_FOUND_STATUS_CODE;
  res.send(err.message);
});
app.use(middlewares.handleRequestError);

export { app };
