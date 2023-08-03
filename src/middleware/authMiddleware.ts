import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import { handleError } from '../utils/errorHandler';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return handleError(res, 401, 'Unauthorized');
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return handleError(res, 401, 'Invalid token');
  }

  req.userId = (decodedToken as { userId: string }).userId;
  next();
};
