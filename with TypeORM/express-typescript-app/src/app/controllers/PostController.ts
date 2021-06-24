import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import Post from "../modules/entities/Post";
import { IRequest } from "../middleware/Request";
import { validate } from "class-validator";
import User from "../modules/entities/User";
import Comment from "../modules/entities/Comment";



export class PostController {
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        const postRepo = getRepository(Post);
        try {
            const posts = await postRepo.find({});
            res.status(200).json({ data: posts });
        } catch (err) {
            next(err)
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const id: number = +req.params.id;
        const postRepository = getRepository(Post);
        try {
            const post = await postRepository.findOneOrFail(id);
            res.send(post);
        } catch (error) {
            res.status(404).send('Post not found');
        }
    }
    static newPost = async (req: IRequest, res: Response, next: NextFunction) => {
        const {title, url ,text} = req.body;
        const { userId } = req.payload;
        
        const userRepository = getRepository(User);
        let user;
        try {
          user = await userRepository.findOneOrFail(userId);
        } catch (error) {
          res.status(404).send('User not found');
          return;
        }
        const post = new Post;
        post.title = title;
        post.text = text || '';
        post.url = url || '';
        post.user = user;
        const errors = await validate(post);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
        const postRepository = getRepository(Post);

        try {
            const newpost = await postRepository.save(post);
            res.status(201).send(newpost);
        } catch (error) {
            next(error)
        }
    }

    static editPost = async (req: IRequest, res: Response, next: NextFunction) => {
        const {title, url ,text} = req.body;
        const { id } = req.params;
        
        const userRepository = getRepository(User);
        const postRepository = getRepository(Post);
        let post;
        try {
          post = await postRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).send('post not found');
          return;
        }
        post.title = title;
        post.text = text || '';
        post.url = url || '';
        const errors = await validate(post);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
        try {
            const newpost = await postRepository.save(post);
            res.status(200).send(newpost);
        } catch (error) {
            next(error)
        }
    }
    public static deletePost = async (req: Request, res: Response) => {
        const id = req.params.id;
        const postRepository = getRepository(Post);
        let post: Post;
        try {
          post = await postRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).send('Sorry, post does not exist in the first place 😿');
          return;
        }
        postRepository.delete(id);
        res.status(200).send('Post deleted');
      };

      public static listAllComments  = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const commentRepo = getRepository(Comment);
        try {
            const comments = 
            await commentRepo
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .where('comment.post.id = :id', {id})
            .getMany();
            res.json({data : comments})

        } catch (error) {
          next(error)
        }
      };
}