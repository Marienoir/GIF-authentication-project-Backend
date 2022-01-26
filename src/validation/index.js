import Joi from 'joi';

export const createUserSchema = {
  schema: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    phone_number: Joi.number().required(),
    password: Joi.string().min(3).max(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // pattern(new RegExp('/^([a-zA-Z]{4})([0-9]{1})([\!@$%^&#*]{1})$/')).required(),
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
