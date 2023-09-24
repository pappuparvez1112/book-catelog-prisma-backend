import express from 'express';
import { UserRoutes } from '../Modules/User/user.route';
import { bookRoutes } from '../Modules/book/book.route';
import { categoryRoutes } from '../Modules/category/category.route';
import { AuthRoutes } from './../Modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/categories',
    routes: categoryRoutes,
  },
  {
    path: '/books',
    routes: bookRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
