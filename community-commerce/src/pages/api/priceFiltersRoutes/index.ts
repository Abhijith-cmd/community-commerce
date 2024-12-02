import { NextApiRequest, NextApiResponse } from 'next';
import Category from '../../../models/CategoryModel/CategoryModel';
import dbConnection from '@/lib/DbConnection/DbConnection';
import { ICategoryDetails } from '../../../models/CategoryModel/CategoryModel';


// Connect to the database
dbConnection()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnection();
  
    const { minPrice, maxPrice } = req.query;
  
    try {
      if (!minPrice || !maxPrice) {
        return res.status(400).json({ error: 'minPrice and maxPrice are required' });
      }
  
      const min = parseInt(minPrice as string);
      const max = parseInt(maxPrice as string);
  
      if (isNaN(min) || isNaN(max)) {
        return res.status(400).json({ error: 'minPrice and maxPrice should be valid numbers' });
      }
  
      const categories = await Category.find({
        'category.price': { $gte: min, $lte: max },
      });
  
      // Use ICategoryDetails to type the `product`
      const productsInRange = categories.flatMap(category =>
        category.category.filter((product: ICategoryDetails) => product.price >= min && product.price <= max)
      );
  
      return res.status(200).json(productsInRange);
    } catch (error) {
      console.error('Error fetching products by price range:', error);
      return res.status(500).json({ error: 'Server error while fetching products' });
    }
  }