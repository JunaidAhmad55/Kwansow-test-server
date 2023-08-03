// authValidators.ts

import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';
import { handleError } from '../utils/errorHandler';

const registrationSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

export const registrationValidator: RequestHandler = (req, res, next) => {
  registrationSchema(req, res, (err) => {
    if (err) {
        const errorMessage = err?.details?.get('body')?.details[0]?.message || 'Email and Atleast 6 digit Password is required';
        return handleError(res, 400, errorMessage); 
    }
    next();
  });
};

const loginSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const loginValidator: RequestHandler = (req, res, next) => {
  loginSchema(req, res, (err) => {
    if (err) {
      const errorMessage = err?.details?.get('body')?.details[0]?.message || 'Email and  Password is required';
      return handleError(res, 400, errorMessage); 
    }
    next();
  });
};
