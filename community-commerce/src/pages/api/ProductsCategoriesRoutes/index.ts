import { NextApiRequest, NextApiResponse } from 'next';
import Category from '../../../models/ProductsCategoriesModel/ProductsCategoriesModel';
import dbConnection from '@/lib/DbConnection/DbConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection();  // Ensure the DB connection is established

  switch (req.method) {
    // Handle GET request: Fetch all categories
    case 'GET':
      try {
        const category = await Category.find({});
        res.status(200).json({ success: true, category });
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, error: error.message });
        } else {
          res.status(400).json({ success: false, error: 'An unknown error occurred' });
        }
      }
      break;

    // Handle POST request: Create a new category
    case 'POST':
      try {
        const newCategory = await Category.create(req.body);
        res.status(201).json({ success: true, category: newCategory });
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, error: error.message });
        } else {
          res.status(400).json({ success: false, error: 'An unknown error occurred' });
        }
      }
      break;

    // Handle other HTTP methods (PUT, DELETE, etc.)
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
