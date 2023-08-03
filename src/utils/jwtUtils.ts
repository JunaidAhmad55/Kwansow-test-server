import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Replace this with your actual secret key in production

export const signToken = (payload: object): string => {
  return jwt.sign(payload, secretKey);
};

export const verifyToken = (token: string): object | null => {
  try {
    return jwt.verify(token, secretKey) as object;
  } catch (err) {
    return null;
  }
};
