import { join } from 'bluebird';
import Joi from 'joi';

export const createUserSchema = {
  schema: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    phone_number: Joi.number().required(),
    gender: Joi.string().required(),
    password: Joi.string().min(3).max(6).pattern(new RegExp('([a-zA-Z]{4})([0-9]{1})([\!@$%^&#*]{1})$')).required(),
  }),
  message: 'Error creating user',
};

export const loginUserSchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required().lowercase(),
  }),
};

export const forgotPasswordSchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().required().lowercase()
  }),
};

export const resetPasswordSchema = {
  schema: Joi.object().keys({
    reset_code: Joi.string().required(),
    password: Joi.string().min(3).max(6).pattern(new RegExp('([a-zA-Z]{4})([0-9]{1})([\!@$%^&#*]{1})$')).required(),
    confirm_password: Joi.ref('password'),
  }),
};

export const changePasswordSchema = {
  schema: Joi.object().keys({
    old_password: Joi.string().min(3).max(6).pattern(new RegExp('([a-zA-Z]{4})([0-9]{1})([\!@$%^&#*]{1})$')).required(),
    new_password: Joi.string().min(3).max(6).pattern(new RegExp('([a-zA-Z]{4})([0-9]{1})([\!@$%^&#*]{1})$')).required(),
    confirm_password: Joi.ref('new_password'),
  }),
};
