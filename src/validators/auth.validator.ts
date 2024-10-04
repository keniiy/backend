import Joi, { ObjectSchema } from 'joi';

export const registerSchema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  businessType: Joi.string().optional(),
});

export const loginSchema: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
