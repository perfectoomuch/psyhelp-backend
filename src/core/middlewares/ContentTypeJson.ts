import { NextFunction, Request, Response } from 'express';

const ContentTypeJson = (req: Request, res: Response, next: NextFunction) => {
  if (!req.url.includes('uploads')) {
    res.setHeader('Content-Type', 'application/json');
  }
  next();
};

export default ContentTypeJson;
