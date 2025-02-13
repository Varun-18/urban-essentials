import { createCategory, getAllCategories } from 'controllers/category';
import { createCategorySchema } from 'controllers/category/validators';
import { Router } from 'express';
import { authenticateUser, schemaValidator } from 'middlewares';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);

categoryRouter.use(authenticateUser);

categoryRouter.post(
  '/create',
  schemaValidator(createCategorySchema),
  createCategory
);

export { categoryRouter };
