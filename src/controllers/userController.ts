import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import { handleError } from '../utils/errorHandler';

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return handleError(res, 404, 'User not found');
    }

    res.json({ user: { id: user._id, email: user.email } });
  } catch (err) {
    handleError(res, 500, 'Internal server error');
  }
};
