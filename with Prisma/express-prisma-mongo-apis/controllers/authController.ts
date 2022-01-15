import { Request, Response } from 'express';
import { comparePassowrd, hashPassword } from '../utils/passwordUtils';
import { PrismaClient } from '@prisma/client';
import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshToken,
  verifyRefreshToken,
} from '../utils/token';
import { IUserIDPayload } from '../types/authTypes';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const hashedPassword = await hashPassword(password);
  console.log(req.body)
  try {
    const userPresent = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userPresent) {
      return res
        .status(409)
        .json({ message: 'User with email already exists' });
    }
    await prisma.user.create({
      data: {
        email,
        lname,
        fname,
        password: hashedPassword,
        username,
      },
    });
    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.log(error)
    return res.status(424).json({ message: 'Failed to create user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'User with email not found' });
    }

    const passwordVerified = await comparePassowrd(user.password, password);

    if (!passwordVerified) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      firstName: user.fname,
      lastName: user.lname,
    };

    const accessToken = generateAccessToken(tokenPayload);

    const refreshToken = generateRefreshToken(tokenPayload);

    setRefreshToken(res, refreshToken);

    return res.status(200).json({ access_token: accessToken });
  } catch (error) {
    return res.status(424).json({ message: 'Login failed' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.APIJWT as string;

  if (!token) {
    return res.status(401).json({ messgae: 'Refesh token not provided' });
  }

  let payload: null | IUserIDPayload;

  try {
    payload = verifyRefreshToken(token);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const user = await prisma.user.findUnique({ where: { id: payload.id } });

  if (!user) {
    return res.status(404).json({ message: 'No user found' });
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    firstName: user.fname,
    lastName: user.lname,
  };

  return res
    .status(200)
    .json({ OK: true, accessToken: generateAccessToken(tokenPayload) });
};

export const deleteAccount = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'User with email not found' });
    }

    const passwordVerified = await comparePassowrd(user.password, password);

    if (!passwordVerified) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    await prisma.user.delete({
      where: {
        email: email,
      },
    });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(424).json({ message: 'Delete failed' });
  }
};

export const logout = (req: Request, res: Response) => {
  setRefreshToken(res, '');
  return res.status(200).json({ OK: true });
};
