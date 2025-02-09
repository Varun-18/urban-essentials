import { Product } from 'models';

export const findProduct = async (id: string): Promise<boolean> => {
  try {
    const product = await Product.findById(id);

    if (!product || product === null) return false;

    return true;
  } catch (error) {
    console.log('🚀 ~ findProduct ~ error:', error);
    return false;
  }
};
