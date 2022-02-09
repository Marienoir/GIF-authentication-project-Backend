/* eslint-disable no-unused-vars */
import * as services from '../services/index';
import { comparePassword, generateResetToken, hashPassword, validatePassword } from '../utils/index';
import { sendResetPasswordLink } from '../utils/mailer';

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

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await services.getAUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User does not exist",
      });
    }

    const resetToken = generateResetToken(user);
    sendResetPasswordLink(email, resetToken);
  
    return res.status(200).json({
      status: "success",
      message: "Reset password link sent successfully",
    })
  } catch (error) {
    return next();
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, password, reset_code } = req.body;
    const code = await services.validateResetCode(reset_code);
    if(!code){
      return res.status(400).json({
        code: 400,
        message: 'Invalid Reset Code'
      });
    }
    const encryptedPassword = await hashPassword(password);
    await services.updatePassword(encryptedPassword, encryptedPassword, email);

    return res.status(200).json({
      code: 200,
      message: 'Password Updated Successfully'
    });
  } catch (error) {
    return next();
  }
};

export const changeUserPassword = async (req, res, next) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;
    const { email } = req.user;
    // req.body.password = new_password;
    req.body.confirm_password = confirm_password;
    console.log(req.body);
    // const user = await services.getAUserByEmail(email);
    // console.log( user);
//     const encryptedPassword = await hashPassword(old_password);
//  const a = await comparePassword(encryptedPassword,user.password)
//  console.log(old_password, user.password, a);
    // const encryptedPassword = await hashPassword(new_password);
    // await services.changePassword(password, confirm_password, email);
    // return res.status(200).json({
    //   code: 200,
    //   message: 'Password Changed Successfully'
    // });
  } catch (error) {
    return next();
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
