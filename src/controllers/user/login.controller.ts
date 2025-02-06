import { Request, Response } from 'express';
import { Secret, sign, SignOptions } from 'jsonwebtoken';

import { compareHash } from 'utils';

import { checkExistingUser } from './helpers';

import { STATUS_CODES } from 'constant';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await checkExistingUser(email);

    if (user === null) {
      res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: 'user does not exists' });
      return;
    }

    const isMatch = await compareHash(password, user.password);

    if (!isMatch) {
      res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: 'email or password does not match' });
      return;
    }

    const token = sign(
      { email: user.email },
      (process.env.JWT_SECRET || 'jwtsecret') as Secret,
      { expiresIn: process.env.JWT_EXPIRY || '1h' } as SignOptions
    );

    res
      .status(STATUS_CODES.OK)
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      })
      .json({ message: 'login successfully' });
  } catch (error) {
    console.log('🚀 ~ loginUser ~ error:', error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
  }
};
