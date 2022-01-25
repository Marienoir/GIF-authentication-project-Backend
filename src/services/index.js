import userQueries from "../db/queries";
import db from "../db/index";
import * as utils from "../utils/index";

export const createUser = async (body) => {
    const encryptedPassword = await utils.hashPassword(body.password);
    const encryptedConfirmPassword = await utils.hashConfirmPassword(body.confirm_password);
    const payload = [
      body.name, body.email, body.phone_number, encryptedPassword, encryptedConfirmPassword, body.role
    ];
    return db.one(userQueries.registerUser, payload);
};

export const getUserByEmail = (email) => db.oneOrNone(userQueries.getUserByEmail, email);

export const getAllUsers = () => db.any(userQueries.getAllUsers);
