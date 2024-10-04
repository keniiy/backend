import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationOptions, ValidationErrorItem } from 'joi';

export function validate(schema: Schema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const options: ValidationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const message: string = error.details
        .map((x: ValidationErrorItem) => x.message)
        .join(', ');
      next({ statusCode: 400, message });
    } else {
      req.body = value;
      next();
    }
  };
}
