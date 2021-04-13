import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { userRoutes } from './users.routes';

const router = Router();

// utilizando middlewares

router.use('/categories', categoriesRoutes);

router.use('/specifications', specificationsRoutes);

router.use('/users', userRoutes);

export { router };
