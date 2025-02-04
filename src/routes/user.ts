import { Response, Router } from 'express';
import { loginUser, regsisterUser } from 'controllers';
import { authenticateUser } from 'middlewares';
import { AuthRequest } from 'declaration';

const userRouter = Router();

userRouter.post('/register', regsisterUser);
userRouter.post('/login', loginUser);

/**
 * TODO : make a middleware that updates the refresh token
 */
userRouter.use(authenticateUser);

userRouter.get('/protected', (req: AuthRequest, res: Response) => {
  const { email } = req.user;
  res.send(`welcome user ${email}..!!`);
});

export { userRouter };
