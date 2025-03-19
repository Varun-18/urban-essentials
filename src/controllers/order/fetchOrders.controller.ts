import { RES_MESSAGES, STATUS_CODES } from 'constant';
import { AuthRequest } from 'declaration';
import { Response } from 'express';
import { OrderModel } from 'models';

export const fetchOrders = async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.user;
    const { status } = req.query;

    const orders = await OrderModel.find({
      email,
      status: status ? status : 'in transit',
    }).lean();

    res.status(STATUS_CODES.OK).json({ orders });
  } catch (error) {
    console.log(error);
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: RES_MESSAGES.BAD_REQUEST });
  }
};
