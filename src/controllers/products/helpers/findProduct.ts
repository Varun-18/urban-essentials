import { Product } from 'models';

export const findProduct = async (id: string) => {
  try {
    const product = await Product.findById(id);

    if (!product || product === null) return null;

    return product;
  } catch (error) {
    console.log('🚀 ~ findProduct ~ error:', error);
    return null;
  }
};
