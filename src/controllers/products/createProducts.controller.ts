import { STATUS_CODES } from 'constants/httpStatusCodes';
import { Request, Response } from 'express';
import { dummyProducts } from './constants/dummyProducts';
import { Product } from 'models';

export const createDummyProducts = (req: Request, res: Response) => {
  try {
    dummyProducts.forEach(async (product) => {
      const newProduct = new Product(product);
      await newProduct.save();
    });
    res
      .status(STATUS_CODES.CREATED)
      .json({ message: 'products created successfully' });
  } catch (error) {
    console.log('🚀 ~ createDummyProducts ~ error:', error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
  }
};
