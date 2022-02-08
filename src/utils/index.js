/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as services from '../services/index';

dotenv.config();

export const hashPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

export const hashConfirmPassword = async (confirm_password) => {
    const encryptedConfirmPassword = await bcrypt.hash(confirm_password, 10);
    return encryptedConfirmPassword;
};

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.GIF_API_TOKEN_KEY,
    {
      expiresIn: '2hr',
    },
  );
  return token;
};

export const generateResetToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.GIF_API_RESET_KEY,
    {
      expiresIn: '1hr',
    },
  );
  return token;
};

export const comparePassword = async (password, userPassword) => {
  const isValid = await bcrypt.compare(password, userPassword);
  return isValid;
};

export const validatePassword = async (email, password) => {
  const user = await services.getAUserByEmail(email);

  if (user) {
    const isValid = await comparePassword(password, user.password);
    if (isValid) {
      const token = await generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      });
      return token;
    }
  }
  return false;
};

export const generateResetCode = () => {
  let code = ((Math.random() + 1).toString(36).substring(5)).toUpperCase();
  return code;
};