import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  //   validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateIntoDB
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteFromDB);

export const UserRoutes = router;
