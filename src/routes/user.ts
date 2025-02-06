import { Router } from 'express';
import { loginUser, regsisterUser, verifyEmail } from 'controllers';
import { authenticateUser } from 'middlewares';

const userRouter = Router();

userRouter.post('/register', regsisterUser);
userRouter.post('/login', loginUser);
userRouter.get('/verify/:token',verifyEmail);

/**
 * TODO : make a middleware that updates the refresh token
 */
userRouter.use(authenticateUser);


export { userRouter };
