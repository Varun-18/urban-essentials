import { Request, Response } from 'express';
import { checkExistingUser } from './helpers';
import { User } from 'models';
import { generateHash } from 'utils';

const regsisterUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await checkExistingUser(email);

    if (existingUser) {
      res.status(400).json({ message: 'user already exists with this email' });
      return;
    }

    const hashedPassword = await generateHash(password);

    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();

    res.status(201).json({
      message: 'user created successfully',
    });
  } catch (error) {
    console.log('🚀 ~ registerUser ~ error:', error);
    res.status(500).json({
      message: 'internal server error',
    });
  }
};

export { regsisterUser };
