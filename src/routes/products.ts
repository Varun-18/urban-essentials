import { Router } from 'express';

import {
  createDummyProducts,
  editProducts,
  getProductDetail,
  getProducts,
} from 'controllers/products';
import { authenticateUser } from 'middlewares';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductDetail);

productRouter.put('/update', editProducts);

productRouter.use(authenticateUser);
productRouter.get('/create', createDummyProducts);

export { productRouter };
