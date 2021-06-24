import { Request, Response, Router } from 'express';
import user from './User';

const routes = Router();

routes.use('/v1/user', user);

export { routes };
