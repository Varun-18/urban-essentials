import mongoose, { Schema } from 'mongoose';
import { ProductInterface, Size } from 'types';

const productSchema: Schema<ProductInterface> = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String] },
  price: { type: Number, default: 0.0, required: true },
  rating: { type: Number, default: 3 },
  stock: {
    type: Object,
    required: false,
    default: {},
    validate: {
      validator: function (v: { [key in Size]?: number }) {
        return Object.keys(v).every((key) =>
          Object.values(Size).includes(key as Size)
        );
      },
      message: () =>
        `Stock keys must be valid sizes: ${Object.values(Size).join(', ')}`,
    },
  },
  comingSoon: { type: Boolean, default: false, required: false },
  brand: { type: String, required: false },
  size: {
    type: [String],
    enum: Object.values(Size),
    required: true,
  },
});

export const Product = mongoose.model<ProductInterface>(
  'products',
  productSchema
);
