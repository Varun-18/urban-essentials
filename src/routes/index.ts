import { Request, Response, Router } from 'express';
import { userRouter } from './user';
import { productRouter } from './products';
import { categoryRouter } from './category';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).render('home');
});

router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);

export default router;
