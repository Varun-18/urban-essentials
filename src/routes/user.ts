import { Router } from 'express';
import { loginUser, regsisterUser, verifyEmail } from 'controllers';
import { authenticateUser } from 'middlewares';

const userRouter = Router();

userRouter.post('/register', regsisterUser);
userRouter.post('/login', loginUser);

/**
 * TODO : make a middleware that updates the refresh token
 */
userRouter.use(authenticateUser);

userRouter.get('/verify/:token',verifyEmail);

export { userRouter };
