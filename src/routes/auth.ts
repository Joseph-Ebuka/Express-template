import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { userSchemas } from '../utils/validation';

const router = Router();

// Auth routes with Zod validation
router.post('/register', validate(userSchemas.createUser), authController.register);
router.post('/login', validate(userSchemas.login), authController.login);
router.get('/me', authenticate, authController.getMe);

export default router;
