import Joi from 'joi';

export const createUserSchema = {
  schema: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    phone_number: Joi.number().required(),
    password: Joi.string().lowercase().required(),
    confirm_password: Joi.ref('password'),
  }),
  message: 'Error creating user',
};

export const loginUserSchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required().lowercase(),
  }),
};
