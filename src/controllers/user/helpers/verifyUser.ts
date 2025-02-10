import { User } from 'models';
import { UserInterface } from 'types';

export const verifyUser = async (
  email: string
): Promise<UserInterface | null> => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { isVerified: true } }
    );

    if (updatedUser) return updatedUser;

    return null;
  } catch (error) {
    console.log('🚀 ~ checkExistingUser ~ error:', error);
    return null;
  }
};
