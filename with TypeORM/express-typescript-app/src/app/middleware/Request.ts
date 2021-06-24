import { NextFunction, Request, Response } from "express";

export interface IRequest extends Request {
    [key: string]: any
  }