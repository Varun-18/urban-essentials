import { Product } from 'models';
import { Size } from 'types';

type updateProductPayload = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: { [key in Size]?: number };
  brand: string;
  images: string[];
  size: Size[];
};

export const updateProduct = async ({
  id,
  name,
  description,
  category,
  price,
  stock,
  brand,
  images,
  size,
}: updateProductPayload) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name,
        description,
        category,
        price,
        stock,
        brand,
        images,
        size,
      }
    );

    if (!updatedProduct) return null;

    return updatedProduct;
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return null;
  }
};
