import { User } from 'models';
import { UserInterface } from 'types';

export const checkExistingUser = async (
  email: string
): Promise<UserInterface | null> => {
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return existingUser;

    return null;
  } catch (error) {
    console.log('🚀 ~ checkExistingUser ~ error:', error);
    return null;
  }
};
