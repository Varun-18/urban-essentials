import { STATUS_CODES } from 'constant';
import { Request, Response } from 'express';
import { Product } from 'models';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let products;

    if (category) {
      products = await Product.find({
        category: capitalize(category.toString()),
      });
    } else {
      products = await Product.find();
    }

    res.status(STATUS_CODES.OK).json({ products });
  } catch (error) {
    console.log('🚀 ~ getProducts ~ error:', error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
  }
};
