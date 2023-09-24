import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/', BookController.getAllFromDB);
router.get('/:id/category', BookController.getBookCategory);
router.get('/:id', BookController.getByIdFromDB);

// router.get('/my-courses',
//     auth(ENUM_USER_ROLE.STUDENT),
//     StudentController.myCourses);

// router.get('/my-course-schedules',
//     auth(ENUM_USER_ROLE.STUDENT),
//     StudentController.getMyCourseSchedules
// );
// router.get('/my-academic-info',
//     auth(ENUM_USER_ROLE.STUDENT),
//     StudentController.myAcademicInfo
// );

// router.get('/:id', StudentController.getByIdFromDB);

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  //   validateRequest(StudentValidation.create),
  BookController.insertIntoDB
);

// router.patch(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   validateRequest(StudentValidation.update),
//   StudentController.updateIntoDB
// );

// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   StudentController.deleteFromDB
// );

export const bookRoutes = router;
