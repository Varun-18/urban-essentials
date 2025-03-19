import { OrderItems } from 'types';

export const calculateTotal = ({
  orderItems,
}: {
  orderItems: OrderItems[];
}): number => {
  return orderItems.reduce((acc, product) => {
    return acc + product.quantity * product.unitPrice;
  }, 0);
};
