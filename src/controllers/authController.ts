import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwtUtils';
import UserModel from '../models/userModel';
import { handleError } from '../utils/errorHandler';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return handleError(res, 409, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();

    res.json({ user: { id: newUser._id, email: newUser.email } });
  } catch (err) {
    handleError(res, 500, 'Internal server error');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return handleError(res, 401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return handleError(res, 401, 'Invalid credentials');
    }

    const token = signToken({ userId: user._id });
    res.json({ jwt: token });
  } catch (err) {
    handleError(res, 500, 'Internal server error');
  }
};
