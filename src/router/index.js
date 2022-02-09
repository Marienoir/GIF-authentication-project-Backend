import express from 'express';
import { changeUserPassword, forgotPassword, getAdminDetails, login, registerAdmin, registerUser, resetPassword, retrieveAllAdmins, retrieveAllUsers, updateAnAdminById } from '../controller';
import { checkIfEmailExists, checkIfUserIsAdmin, checkIfUserIsSuperAdmin, verifyToken } from '../middleware';
import validateInput from '../middleware/validation';
import { changePasswordSchema, createUserSchema, forgotPasswordSchema, loginUserSchema, resetPasswordSchema } from '../validation';

const router = express.Router();

// AUTHENTICATION
router.post('/api/v1/register', validateInput(createUserSchema, 'body'), checkIfEmailExists, registerUser);
router.post('/api/v1/admin/register', verifyToken('super-admin'), checkIfUserIsSuperAdmin, validateInput(createUserSchema, 'body'), checkIfEmailExists, registerAdmin);
router.post('/api/v1/login', validateInput(loginUserSchema, 'body'), login);
router.post('/api/v1/forgot-password', validateInput(forgotPasswordSchema, 'body'), forgotPassword);
router.put('/api/v1/reset-password',validateInput(resetPasswordSchema, 'body'), resetPassword);
router.put('/api/v1/change-password', verifyToken('user'), validateInput(changePasswordSchema, 'body'), changeUserPassword);

// PROFILE
router.get('/api/v1/users', verifyToken('admin'), checkIfUserIsAdmin, retrieveAllUsers);
router.get('/api/v1/admins', verifyToken('super-admin'), checkIfUserIsSuperAdmin, retrieveAllAdmins);
router.get('/api/v1/profile', verifyToken('admin'), checkIfUserIsAdmin, getAdminDetails);
router.put('/api/v1/update', verifyToken('admin'), checkIfUserIsAdmin, updateAnAdminById);
export default router;
