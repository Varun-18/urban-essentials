import { OutOfStockError } from 'customClasses/error';
import { Product } from 'models';
import { OrderItems } from 'types';

export const updateProducts = async ({
  orderItems,
}: {
  orderItems: OrderItems[];
}) => {
  if (orderItems.length > 0) {
    for (const product of orderItems) {
      const currentProduct = await Product.findById(product.productId);

      if (!currentProduct) {
        throw new Error(`Product with ID ${product.productId} not found`);
      }

      const totalQuantity = currentProduct.stock[product.size];

      if (totalQuantity === undefined) {
        throw new Error(
          `Size ${product.size} not available for product ${product.productId}`
        );
      }

      if (totalQuantity >= product.quantity) {
        await Product.findByIdAndUpdate(product.productId, {
          $inc: { [`stock.${product.size}`]: -product.quantity },
        });
      } else {
        throw new OutOfStockError(
          `Stock not available for product ${product.productId}. Available: ${totalQuantity}, Requested: ${product.quantity}`
        );
      }
    }
  }
  return;
};
