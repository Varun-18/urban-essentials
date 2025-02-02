import { STATUS_CODES } from 'constants/httpStatusCodes';
import { AuthRequest } from 'declaration';
import { NextFunction, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res
        .status(403)
        .json({ message: 'A token is required for authentication' });
      return;
    }

    const decoded = verify(token, process.env.JWT_SECRET as Secret);

    req.user = decoded;

    next();
  } catch (error) {
    console.log('🚀 ~ error:', error);
    res.status(STATUS_CODES.BAD_REQUEST).json(error);
  }
};
