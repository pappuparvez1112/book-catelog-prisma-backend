import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.get('/', CategoryController.getAllFromDB);
// router.get('/:id', BuildingController.getByIdFromDB);

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  //   validateRequest(BuildingValidations.create),
  CategoryController.insertIntoDB
);

// router.patch(
//   '/:id',
//   validateRequest(BuildingValidations.update),
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   BuildingController.updateOneInDB
// );

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   BuildingController.deleteByIdFromDB
// );

export const categoryRoutes = router;
