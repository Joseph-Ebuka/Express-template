import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate, validateQuery, validateParams } from '../middleware/validation';
import { userSchemas, querySchemas } from '../utils/validation';
import * as userController from '../controllers/userController';

const router = Router();

router
  .route('/')
  .get(
    authenticate,
    validateQuery(querySchemas.pagination),
    userController.getAllUsers
  )
  .post(
    authenticate,
    authorize('admin'),
    validate(userSchemas.createUser),
    userController.createUser
  );

router
  .route('/:id')
  .get(
    authenticate,
    validateParams(querySchemas.userId),
    userController.getUserById
  )
  .patch(
    authenticate,
    validateParams(querySchemas.userId),
    validate(userSchemas.updateUser),
    userController.updateUser
  )
  .delete(
    authenticate,
    authorize('admin'),
    validateParams(querySchemas.userId),
    userController.deleteUser
  );

export default router;
