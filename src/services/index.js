import userQueries from "../db/queries";
import db from "../config/db";
import * as utils from "../utils/index";

export const createUser = async (body) => {
    const encryptedPassword = await utils.hashPassword(body.password);
    const encryptedConfirmPassword = await utils.hashConfirmPassword(body.confirm_password);
    const payload = [
      body.name, body.email, body.phone_number, encryptedPassword, encryptedConfirmPassword, body.role
    ];
    return db.one(userQueries.registerUser, payload);
};

export const getAUserByEmail = (email) => db.oneOrNone(userQueries.getUserByEmail, email);

export const getAllUsers = () => db.any(userQueries.getAllUsers);

export const alterUserTable = () => db.any(userQueries.alterUserTable);

export const updatePassword = (password, confirm_password, email) => {
  return db.any(userQueries.updatePassword, [password, confirm_password, email]);
};

export const updateResetCode = (reset_code, email) => db.any(userQueries.updateResetCode, [reset_code, email]);

export const validateResetCode = (reset_code) => db.oneOrNone(userQueries.validateResetCode, reset_code);
