import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Category from '../../../models/CategoryModel/CategoryModel'; // Update path if needed
import dbConnection from '../../../lib/DbConnection/DbConnection'; // Ensure this file establishes a database connection

// Ensure database is connected before handling the request
dbConnection();

// Define the API handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    // Query for the product by _id in the category collection
    const product = await Category.findOne({ 'category._id': id }).select('category.$');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Extract the matched product details from the response
    const productDetails = product.category[0];

    res.status(200).json({ success: true, data: productDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
