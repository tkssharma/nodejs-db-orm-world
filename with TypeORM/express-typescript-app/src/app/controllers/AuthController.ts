import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../modules/entities/User';

class AuthController {
  public static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.username = :username', { username })
        .getOne();
    } catch (error) {
      res.status(401).send();
    }
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }
    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, {
      expiresIn: '1h',
    });
    res.send(token);
  };

  public static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.id = :id', { id })
        .getOne();
    } catch (id) {
      res.status(401).send();
    }
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    user.hashPassword();
    userRepository.save(user);
    res.status(200).send('Password changed successfully 🥂');
  };
}

export default AuthController;
