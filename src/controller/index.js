/* eslint-disable no-unused-vars */
import paginate from '../middleware/pagination';
import * as services from '../services/index';
import { generateResetToken, hashPassword, validatePassword } from '../utils/index';
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

export const registerAdmin = async (req, res, next) => {
  try {
    const { body } = req;
    const data = await services.createAdmin(body);
    return res.status(201).json({
      code: 201,
      message: 'Admin created successfully',
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
      message: "Email sent successfully. Kindly follow the instructions.",
    })
  } catch (error) {
    return next();
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { password, reset_code } = req.body;
    const code = await services.validateResetCode(reset_code);
   
    if(!code){
      return res.status(400).json({
        code: 400,
        message: 'Reset Code Already Used or Invalid Reset Code'
      });
    }
    const { email } = code;
    const encryptedPassword = await hashPassword(password);
    await services.updatePassword(encryptedPassword, encryptedPassword, email);
    await services.removeResetCode(email);
    return res.status(200).json({
      code: 200,
      message: 'Password Reset Successfully'
    });
  } catch (error) {
    return next();
  }
};

export const changeUserPassword = async (req, res, next) => {
  try {
    const { old_password, new_password, confirm_password } = req.body;
    const { email } = req.user;
    const oldPasswordValidated = await validatePassword(email, old_password);
    
    if(oldPasswordValidated){
      const encryptedPassword = await hashPassword(new_password);
      const encryptedConfirmPassword = await hashPassword(confirm_password);
      await services.changePassword(encryptedPassword, encryptedConfirmPassword, email);
      return res.status(200).json({
        code: 200,
        message: 'Password Changed Successfully',
      });
    }
    return res.status(400).json({
      code: 400,
      message: 'Invalid Password. Password does not exist',
    });
    
  } catch (error) {
    return next();
  }
};

export const retrieveAllUsers = async (req, res, next) => {
  try {
    const { name, all} = req.query;
    const pagination = await paginate(req);
    const { limit, offset } = pagination;
    const users = await services.getAllUsers(all, name, limit, offset);

    return res.status(200).json({
      code: 200,
      message: 'All Users fetched successfully',
      users,
    });
  } catch (error) {
    return next(error);
  }
};

export const retrieveAllAdmins = async (req, res, next) => {
  try {
    const admins = await services.getAllAdmin();

    return res.status(200).json({
      code: 200,
      message: 'All Admins fetched successfully',
      admins,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAdminDetails = async (req, res, next) => {
  try {
    const { id } = req.user;
    const data = await services.getAdminProfile(id);

    return res.status(200).json({
      code: 200,
      data
    });
  } catch (error) {
    return next(error);
  }
};

export const updateAnAdminById = async (req, res, next) => {
  try {
    const { id } = req.user;
    const updatedUser = await services.updateAdminById(
      req.body,
      id
    );

    return res.status(200).json({
      code: 200,
      message: 'Admin Updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};