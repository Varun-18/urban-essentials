import { RES_MESSAGES, STATUS_CODES } from 'constant';
import { AuthRequest } from 'declaration';
import { Response } from 'express';
import { findCategory } from './helpers';
import { CategoryModel } from 'models';

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id, status, name } = req.body;

    const categoryExists = await findCategory({ id, name });

    if (!!categoryExists) {
      res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: 'Category with such properties already exists' });
      return;
    }

    const result = await CategoryModel.findByIdAndUpdate(
      id,
      {
        $set: { status, name },
      },
      { new: true }
    );

    res.status(STATUS_CODES.OK).json({ updateCategory: result });
  } catch (error) {
    console.log('🚀 ~ updateCategory ~ error:', error);
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: RES_MESSAGES.BAD_REQUEST });
  }
};
