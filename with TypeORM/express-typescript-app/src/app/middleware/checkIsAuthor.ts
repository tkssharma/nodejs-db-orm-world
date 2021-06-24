import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Post from '../modules/entities/Post';
import { IRequest } from './Request'

export const checkIsAuthor = (req: IRequest, res: Response, next: NextFunction) => {
  const currentUserId = req.payload.userId
  getRepository(Post)
    .findOne(req.params.id)
    .then((post: any) => {
      const authorId = post.user.id
      if (authorId === currentUserId) {
        next()
      } else {
        res.status(404).send('Sorry, you are not authorised to modify this post 😿')
      }
    })
}
