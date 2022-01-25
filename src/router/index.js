import express from 'express';
import { login, registerUser, retrieveAllUsers } from '../controller';
import { checkIfEmailExists, checkIfUserIsAdmin, verifyToken } from '../middleware';
import validateInput from '../middleware/validation';
import { createUserSchema, loginUserSchema } from '../validation';

const router = express.Router();
router.post('/api/v1/register', validateInput(createUserSchema, 'body'), checkIfEmailExists, registerUser);
router.post('/api/v1/login', validateInput(loginUserSchema, 'body'), login);
router.get('/api/v1/users', verifyToken('admin'), checkIfUserIsAdmin, retrieveAllUsers)

export default router;
