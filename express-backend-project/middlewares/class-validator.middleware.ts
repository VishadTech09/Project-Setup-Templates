// middlewares.ts

import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import HttpStatusCode from './../util/http-status-code';

// Define a generic type for the DTO class
type DTOType<T> = { new(): T };

export const validateAndTransform = <T>(dtoClass: DTOType<T>) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {

      // Transform plain object to class instance
      const dtoInstance = plainToClass(dtoClass, req.body);

      // Validate the dtoInstance object
      const errors = await validate(dtoInstance as Object);

      if (errors.length > 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors });
      }

      // Attach the transformed and validated object to the request for further use
      req.data = dtoInstance;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
};
