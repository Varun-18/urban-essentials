import { createOrder, fetchOrders } from 'controllers/order';
import { Router } from 'express';
import { authenticateUser } from 'middlewares';

const orderRouter = Router();

orderRouter.use(authenticateUser);

orderRouter.get('/', fetchOrders);
orderRouter.post('/create', createOrder);

export { orderRouter };
