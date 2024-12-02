import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../models/CategoriesModel/CategoriesModel';
import dbConnection from '@/lib/DbConnection/DbConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection();

  switch (req.method) {
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json({ success: true, Categories: products });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, Categories: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
