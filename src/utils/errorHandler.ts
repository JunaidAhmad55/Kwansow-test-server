import { Response } from 'express';

export const handleError = (res: Response, status: number, message: string) => {
  return res.status(status).json({ error: message });
};