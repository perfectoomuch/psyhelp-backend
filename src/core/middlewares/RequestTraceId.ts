import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const RequestTraceId = (req: Request, res: Response, next: NextFunction) => {
  req.traceId = uuidv4();
  next();
};

export default RequestTraceId;
