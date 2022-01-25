import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { getUserByEmail } from "../services";

dotenv.config();

export const checkIfEmailExists = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email);
  
      if (user) {
        return res.status(403).json({
          status: 'Failed',
          message: 'User Already Exists',
        });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };

  export const verifyToken = (type) => async (req, res, next) => {
    try {
      const token = req.headers['x-access-token'];
      if (!token) {
        return res.status(403).json({
          status: 'Forbidden',
          message: 'Access Denied',
        });
      }
  
      const tokenValidated = jwt.verify(token, process.env.GIF_API_TOKEN_KEY);
      if (type === 'admin') {
        req.user = tokenValidated;
      }
      req.user = tokenValidated;
      return next();
    } catch (err) {
      return res.status(403).json({
        status: 'Failed',
        message: 'Unable to authenticate token.',
      });
    }
  };

  export const checkIfUserIsAdmin = async (req, res, next) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          status: 'Forbidden',
          message: 'Access Denied',
        });
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };