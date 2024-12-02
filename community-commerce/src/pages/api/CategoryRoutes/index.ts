import { NextApiRequest, NextApiResponse } from 'next';
import Category from '../../../models/CategoryModel/CategoryModel'; // Your Category model
import dbConnection from '@/lib/DbConnection/DbConnection'; // Your DB connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection(); // Establish DB connection

  switch (req.method) {
    // GET method: Fetch all categories
    case 'GET':
      try {
        const categories = await Category.find({}); // Fetch all categories from the collection
        res.status(200).json({ success: true, categories }); // Send response with categories
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(400).json({ success: false, error: error.message }); // Handle error with proper type assertion
        } else {
          res.status(400).json({ success: false, error: 'An unknown error occurred' });
        }
      }
      break;

    // POST method: Add a new category
    // case 'POST':
    //   try {
    //     const newCategory = await Category.create({ category: req.body }); // Insert new category data into the array
    //     res.status(201).json({ success: true, category: newCategory }); // Send response with newly added category
    //   } catch (error: unknown) {
    //     if (error instanceof Error) {
    //       res.status(400).json({ success: false, error: error.message }); // Handle error with proper type assertion
    //     } else {
    //       res.status(400).json({ success: false, error: 'An unknown error occurred' });
    //     }
    //   }
    //   break;
    // POST method: Add a new category
case 'POST':
    try {
      // Find the category document, or create a new one if it doesn't exist
      const existingCategory = await Category.findOne({});
  
      if (existingCategory) {
        // Add the new category to the existing array
        existingCategory.category.push(req.body);
        await existingCategory.save(); // Save the updated document
        res.status(201).json({ success: true, category: existingCategory });
      } else {
        // If no category exists, create a new document with the new category
        const newCategory = await Category.create({ category: [req.body] });
        res.status(201).json({ success: true, category: newCategory });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, error: error.message }); // Handle error with proper type assertion
      } else {
        res.status(400).json({ success: false, error: 'An unknown error occurred' });
      }
    }
    break;
  

    // Fallback for unsupported methods
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
