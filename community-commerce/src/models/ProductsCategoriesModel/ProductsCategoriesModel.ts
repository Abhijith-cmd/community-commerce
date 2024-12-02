import mongoose, { Schema, Document } from 'mongoose';

// Define the Categories Interface
interface ICategories extends Document {
  name: string;
  primaryCategory: string;
  subCategory: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  currency: string;
  images: Array<{
    url: string;
    altText: string;
    color: string;
  }>;
  colors: Array<{
    colorName: string;
    price: number;
    inventory: number;
  }>;
  material?: string | null;
  brand?: string | null;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
    weight?: number;
  };
  specifications?: {
    processor?: string;
    ram?: string;
    storage?: string;
    screenSize?: string;
    battery?: string;
    features?: string[];
  };
  available: boolean;
  isOnSale: boolean;
  salePrice?: number | null;
  tags?: string[];
  rating: number;
  size?: string[] | null;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Schema for Categories
const categorySchema: Schema = new Schema({
  name: { type: String, required: true },
  primaryCategory : { type: String, required: true },
  subCategory: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true, default: 'USD' },
  images: [
    {
      url: { type: String },
      altText: { type: String },
      color: { type: String }
    }
  ],
  colors: [
    {
      colorName: { type: String },
      price: { type: Number, required: true },
      inventory: { type: Number, default: 0 }
    }
  ],
  material: { type: String, default: null },
  brand: { type: String, default: null },
  dimensions: {
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
    weight: { type: Number }
  },
  specifications: {
    processor: { type: String },
    ram: { type: String },
    storage: { type: String },
    screenSize: { type: String },
    battery: { type: String },
    features: [String]
  },
  available: { type: Boolean, default: true },
  isOnSale: { type: Boolean, default: false },
  salePrice: { type: Number, default: null },
  tags: [String],
  rating: { type: Number, default: 0 },
  size: { type: [String], default: null },
  inventory: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware to update the `updatedAt` timestamp
categorySchema.pre<ICategories>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create and export the model with a specific collection name
const Category = mongoose.models.Categories || mongoose.model<ICategories>('Categories', categorySchema, 'categories');
export default Category;