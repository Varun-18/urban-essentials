import { Router } from 'express';

import {
  createCategory,
  getAllCategories,
  updateCategory,
} from 'controllers/category';

import {
  createCategorySchema,
  updateCategorySchema,
} from 'controllers/category/validators';

import { authenticateUser, schemaValidator } from 'middlewares';

const categoryRouter = Router();

categoryRouter.use(authenticateUser);

categoryRouter.get('/', getAllCategories);

categoryRouter.post(
  '/create',
  schemaValidator(createCategorySchema),
  createCategory
);

categoryRouter.post(
  '/update',
  schemaValidator(updateCategorySchema),
  updateCategory
);

export { categoryRouter };
