import { Request, Response, Router } from 'express';
import user from './user';

const routes = Router();

routes.use('/v1/user', user);

export { routes };
