/* eslint-disable no-unused-vars */
import * as services from '../services/index';
import { validatePassword } from '../utils/index';

export const registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    const data = await services.createUser(body);
    return res.status(201).json({
      code: 201,
      message: 'User created successfully',
      data
    });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await services.getAUserByEmail(email);

    const token = await validatePassword(email, password);

    if (!token) {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const retrieveAllUsers = async (req, res, next) => {
    try {
      const data = await services.getAllUsers();

      return res.status(200).json({
        code: 200,
        message: 'All Users fetched successfully',
        data
      });
    } catch (error) {
      return next(error);
    }
  };
