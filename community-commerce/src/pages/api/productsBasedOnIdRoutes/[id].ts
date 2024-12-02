import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Category, { ICategoryDetails } from '../../../models/CategoryModel/CategoryModel';
import dbConnection from '@/lib/DbConnection/DbConnection';

// Connect to the database
dbConnection();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { id } = req.query;
  
    try {
      // Check if the ID is provided
      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
  
      // Convert ID into a valid ObjectId
      const objectId = new mongoose.Types.ObjectId(id as string);
  
      // Find the product with the matching _id
      const category = await Category.findOne({
        'category._id': objectId
      });
  
      // Check if the category containing the product exists
      if (!category) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Find the specific product in the category array
      const product = category.category.find((product: ICategoryDetails) => product._id.equals(objectId));
  
      // If the product is not found
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Return the product details
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return res.status(500).json({ error: 'Server error while fetching product' });
    }
  }