import { Request, Response } from 'express';
import { checkExistingUser } from './helpers';
import { User } from 'models';
import { generateHash, sendEmail, verfiyEmailTemplate } from 'utils';
import { RES_MESSAGES, STATUS_CODES } from 'constant';
import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

dotenv.config();

const regsisterUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await checkExistingUser(email, false);

    if (existingUser) {
      res.status(400).json({ message: RES_MESSAGES.BAD_REQUEST });
      return;
    }

    const hashedPassword = await generateHash(password);

    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();

    const emailVerificationToken = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET as Secret,
      { expiresIn: '24h' }
    );

    const frontEndUrl =
      process.env.FRONTEND_URL + '/verfiy/' + emailVerificationToken;

    sendEmail({
      to: newUser.email,
      subject: 'Urban Essentials || Email Verification',
      html: verfiyEmailTemplate(frontEndUrl),
    });

    res.status(STATUS_CODES.CREATED).json({
      message: 'user created successfully, please verify your email !',
    });
  } catch (error) {
    console.log('🚀 ~ registerUser ~ error:', error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: RES_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

export { regsisterUser };
