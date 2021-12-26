import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IAuthRequest extends Request {
  user?: IUserIDPayload;
}

export interface IUserIDPayload extends JwtPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
