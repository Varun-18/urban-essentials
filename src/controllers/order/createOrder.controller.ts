import { RES_MESSAGES, STATUS_CODES } from 'constant';
import { AuthRequest } from 'declaration';
import { Response } from 'express';
import { OrderModel } from 'models';
import { updateProducts } from './helpers';
import { OutOfStockError } from 'customClasses/error';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.user;
    const { address, contact, orderItems, orderTotal, pincode } = req.body;

    await updateProducts({ orderItems });

    const order = await OrderModel.create({
      email,
      address,
      contact,
      orderItems,
      orderTotal,
      pincode,
      status: 'in transit',
    });

    res
      .status(STATUS_CODES.CREATED)
      .json({ message: RES_MESSAGES.CREATED, order });
  } catch (error) {
    if (error instanceof OutOfStockError) {
      res
        .status(error.statusCode)
        .json({ name: error.name, message: error.message });
      return;
    }
    console.log(error);
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: RES_MESSAGES.BAD_REQUEST });
  }
};
