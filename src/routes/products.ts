import { Router } from 'express';

import { createDummyProducts, getProducts } from 'controllers/products';
import { authenticateUser } from 'middlewares';

const productRouter = Router();

productRouter.get('/', getProducts);

productRouter.use(authenticateUser);
productRouter.get('/create', createDummyProducts);

export { productRouter };
