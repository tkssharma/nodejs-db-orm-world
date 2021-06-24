import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { User } from '../modules/entities/User';

class UserController {
  public static listAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    try {
      const users = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.posts', 'post')
        .leftJoinAndSelect('user.comments', 'comment')
        .getMany();
      res.send(users);
    } catch (error) {
      res.status(404).send();
    }
  };

  public static getOneById = async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const userRepository = getRepository(User);
    try {
      const user = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.posts', 'post')
        .leftJoinAndSelect('user.comments', 'comment')
        .where('user.id = :id', { id })
        .getOne();
      if (user) res.send(user);
      else res.status(404).send('User not found');
    } catch (error) {
      res.status(404).send('User not found');
    }
  };

  public static newUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = new User();
    user.username = username;
    user.password = password;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    user.hashPassword();
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('Sorry, this username already exists 😿');
      return;
    }
    res.status(201).send('User created');
  };

  public static editUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { username } = req.body;
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    user = { ...user, username: username };
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('Sorry, this username already exists 😿');
      return;
    }
    res.status(200).send('User updated');
  };

  public static deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    userRepository.delete(id);
    res.status(200).send('Goodbye!');
  };
}

export default UserController;
