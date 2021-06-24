import { getRepository } from 'typeorm';
import { Request } from 'express';
import { User } from '../modules/entities/User';
import APIError from '../global/response/apierror';
import Err from '../global/response/errorcode';

export class UserService {

    async get(): Promise<User[] | null> {
        // Get users from database
        try {
            // TBD
            const userRepo = getRepository(User);
            return await userRepo.find({});
        }
        catch (error) {
            throw new Error(error);
            // return Promise.reject(new APIError('User Already exists', Err.EmailAlreadyExists));

        }
    }
    async add(data: any): Promise<User> {
       try {
           const user = new User();
           const userRepo = getRepository(User);
           const newUser = await userRepo.save(user);
           return newUser;
           
       }catch(err){
           // error
           return Promise.reject(new APIError('User Already exist', 1001));
       }
    }
}