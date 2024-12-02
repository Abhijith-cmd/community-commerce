import { NextApiRequest, NextApiResponse } from 'next';
 // Ensure you have this connection file
import Category from '../../../models/CategoryModel/CategoryModel'; // Assuming this is your Category model file
import dbConnection from '@/lib/DbConnection/DbConnection';

// Connect to MongoDB
dbConnection

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { primaryCategory } = req.query;
  
    if (req.method === 'GET') {
      try {
        const products = await Category.aggregate([
          {
            // Unwind the category array to treat each category object as its own document
            $unwind: '$category'
          },
          {
            // Match only documents where the primaryCategory is the one we're searching for
            $match: { 'category.primaryCategory': primaryCategory }
          },
          {
            // Group them back by the original document _id and collect only the matched categories
            $group: {
              _id: '$_id',
              category: { $push: '$category' }
            }
          }
        ]);
  
        if (!products || products.length === 0) {
          return res.status(404).json({ message: 'No products found for this primary category' });
        }
  
        return res.status(200).json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  
  export default handler;