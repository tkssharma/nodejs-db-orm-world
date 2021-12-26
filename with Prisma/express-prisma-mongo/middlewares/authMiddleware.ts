import { NextFunction, Response } from 'express';
import { IAuthRequest } from '../types/authTypes';
import { verifyAccessToken } from '../utils/token';

export const isAuth = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(401).json({ message: 'Bearer token not provided' });
  }

  try {
    const token = authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token malformed' });
    }

    const user = verifyAccessToken(token);

    if (!user) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};
