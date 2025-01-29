import { Request, Response, Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req: Request, res: Response) => {
  res.send('The dummy user route works..!!');
});

export { userRouter };
