import { RES_MESSAGES, STATUS_CODES } from 'constant';
import { Request, Response } from 'express';
import { findProduct } from './helpers/findProduct';

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const product = await findProduct(id);

    if (!product) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: RES_MESSAGES.NOT_FOUND });
    }

    res.status(STATUS_CODES.OK).json({ product });
  } catch (error) {
    console.log('🚀 ~ getProductDetail ~ error:', error);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: RES_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
