import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserIDPayload } from '../types/authTypes';

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACCESS_JWT_SECRET as string, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, process.env.REFRESH_JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export const verifyAccessToken = (token: string) => {
  const payload = jwt.verify(token, process.env.ACCESS_JWT_SECRET as string);
  return payload as IUserIDPayload;
};

export const verifyRefreshToken = (token: string) => {
  const payload = jwt.verify(token, process.env.REFRESH_JWT_SECRET as string);
  return payload as IUserIDPayload;
};

export const setRefreshToken = (res: Response, token: string) => {
  res.cookie('refresh_token', token, {
    httpOnly: true,
  });
};
