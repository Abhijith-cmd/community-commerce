import { NextApiRequest, NextApiResponse } from 'next';
import dbConnection from '../../lib/DbConnection/DbConnection';
import HighlightModel from '../../models/highlightModel';
 
 
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection(); // Ensure the database is connected
 
  if (req.method === 'GET') {
    const { abbreviation } = req.query;
 
    try {
      // Fetch highlights based on the region
      const highlights = await HighlightModel.find({ abbreviation }).exec();
      return res.status(200).json(highlights);
    } catch (error) {
      console.error('Error fetching highlights:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
 
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}