import { RES_MESSAGES, STATUS_CODES } from 'constant';
import { Request, Response } from 'express';
import { CategoryModel } from 'models';

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const pipeline = [
      { $match: { parent: null } },
      {
        $graphLookup: {
          from: 'categories',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'parent',
          as: 'children',
          maxDepth: 9,
        },
      },
    ];

    const categories = await CategoryModel.aggregate(pipeline);

    res.status(STATUS_CODES.OK).json({ categories });
  } catch (error) {
    console.log('🚀 ~ getAllCategories ~ error:', error);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: RES_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
