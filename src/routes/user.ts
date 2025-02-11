import { Router } from 'express';
import {
  getUserDetails,
  loginUser,
  regsisterUser,
  verifyEmail,
} from 'controllers';
import { authenticateUser, schemaValidator } from 'middlewares';
import {
  loginUserSchema,
  registerUserSchema,
  verifyEmailSchema,
} from 'controllers/user/validators';

const userRouter = Router();

userRouter.post(
  '/register',
  schemaValidator(registerUserSchema),
  regsisterUser
);
userRouter.post('/login', schemaValidator(loginUserSchema), loginUser);
userRouter.get(
  '/verify/:token',
  schemaValidator(verifyEmailSchema),
  verifyEmail
);

/**
 * TODO : make a middleware that updates the refresh token
 */
userRouter.use(authenticateUser);

userRouter.get('/', getUserDetails);

export { userRouter };
