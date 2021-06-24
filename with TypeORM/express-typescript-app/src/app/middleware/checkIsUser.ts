import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { IRequest } from "./Request";


export const checkIsUser = (req: IRequest, res: Response, next: NextFunction) => {
  const curentUserId = req.payload.userId;
  if(curentUserId === Number(req.params.id)){
     next()
  } else {
      res.status(401).json({'message' : 'you are not allowed for this operations'})
  }
}