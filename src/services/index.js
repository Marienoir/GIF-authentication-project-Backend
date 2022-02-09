import userQueries from "../db/queries";
import db from "../config/db";
import * as utils from "../utils/index";

export const createUser = async (body) => {
    const encryptedPassword = await utils.hashPassword(body.password);
    const encryptedConfirmPassword = await utils.hashConfirmPassword(body.confirm_password);
    const payload = [
      body.first_name, body.last_name, body.email, body.phone_number, body.gender, encryptedPassword, encryptedConfirmPassword, body.role
    ];
    return db.one(userQueries.registerUser, payload);
};

export const createAdmin = async (body) => {
  const encryptedPassword = await utils.hashPassword(body.password);
  const encryptedConfirmPassword = await utils.hashConfirmPassword(body.confirm_password);
  const payload = [
    body.first_name, body.last_name, body.email, body.phone_number, body.gender, encryptedPassword, encryptedConfirmPassword, body.role
  ];
  return db.one(userQueries.registerAdmin, payload);
};

export const getAUserByEmail = (email) => db.oneOrNone(userQueries.getUserByEmail, email);

export const getAUserById = (id) => db.oneOrNone(userQueries.getUserById, id);

export const getAllAdmin = () => db.any(userQueries.getAllAdmin);

export const alterUserTable = () => db.any(userQueries.alterUserTable);

export const updatePassword = (password, confirm_password, email) => {
  return db.any(userQueries.updatePassword, [password, confirm_password, email]);
};

export const updateResetCode = (reset_code, email) => db.any(userQueries.updateResetCode, [reset_code, email]);

export const removeResetCode = (reset_code, email) => db.any(userQueries.removeResetCode, [reset_code, email]);

export const validateResetCode = (reset_code) => db.oneOrNone(userQueries.validateResetCode, reset_code);

export const changePassword = (password, confirm_password, email) => {
  return db.any(userQueries.changePassword, [password, confirm_password, email]);
};

export const getAdminProfile = (id) => db.oneOrNone(userQueries.getAdminProfile, id);

export const updateAdminById = (body, id) => {
  return db.one(userQueries.updateAdminById, [body.first_name, body.last_name, body.phone_number,
    body.gender, id]);
};

export const getAllUsers = ( all, search = '', limit, offset) => {
  if (search) {
    return db.any(userQueries.searchUserByFirstName, search);
  }
  if (all) {
    return db.any(userQueries.getAllUsers);
  }
  return db.any(userQueries.getPaginatedUsers, [limit, offset]);
};