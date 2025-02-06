import { STATUS_CODES } from 'constant';
import { Request, Response } from 'express';
import { Product } from 'models';

export const getProducts = async (req: Request, res: Response) => {
  try {
    // const {} = req.query;
    const products = await Product.find();

    res.status(STATUS_CODES.OK).json({ products });
  } catch (error) {
    console.log('🚀 ~ getProducts ~ error:', error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
  }
};
