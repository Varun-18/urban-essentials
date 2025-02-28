import { Router } from 'express';

const cartRouter = Router();

import {
    getUserDetails,
    loginUser,
    regsisterUser,
    verifyEmail,
  } from 'controllers';

import { authenticateUser, schemaValidator } from 'middlewares';
import { getCartDetails } from 'controllers/cart/getCartDetails.controller';



cartRouter.use(authenticateUser);

cartRouter.get('/', getCartDetails);

export { cartRouter };