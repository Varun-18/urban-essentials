import mongoose from 'mongoose';

export type CategoryType = {
  name: string;
  parent: mongoose.Types.ObjectId | null;
  children: mongoose.Types.ObjectId[];
};
