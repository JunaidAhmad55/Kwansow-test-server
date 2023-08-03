// taskValidators.ts

import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';
import { handleError } from '../utils/errorHandler';

const createTaskSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

export const createTaskValidator: RequestHandler = (req, res, next) => {
  // Run the celebrate middleware to validate the request
  createTaskSchema(req, res, (err) => {
    if (err) {
      // If there's a validation error, handle it and return a custom response
      const errorMessage = err?.details?.get('body')?.details[0]?.message || 'Task name is required';
      return handleError(res, 400, errorMessage); 
    }
    // If validation passes, move to the next middleware
    next();
  });
};
