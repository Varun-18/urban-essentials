import { STATUS_CODES } from 'constant';
import { Request, Response } from 'express';
import { findProduct } from './helpers/findProduct';
import { updateProduct } from './helpers/updateProduct';

export const editProducts = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      description,
      category,
      price,
      stock,
      brand,
      images,
      size,
    } = req.body;

    const productExists = await findProduct(id);

    if (!productExists) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: 'Product does not exists' });
      return;
    }

    const newProduct = await updateProduct({
      id,
      name,
      description,
      category,
      price,
      stock,
      brand,
      images,
      size,
    });

    res.status(STATUS_CODES.OK).json({ product: newProduct });
  } catch (error) {
    console.log('🚀 ~ editProducts ~ error:', error);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};
