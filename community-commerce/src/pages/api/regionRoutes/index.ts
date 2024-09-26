import { NextApiRequest, NextApiResponse } from 'next';
import dbConnection from '../../../lib/DbConnection/DbConnection';
import RegionalHighlightModel from '../../../models/regionalHighlightsModel/regionHighlightModel';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection(); // Ensure the database is connected
 
  if (req.method === 'GET') {
    try {
      // Fetch distinct regions from the database
      const regions = await RegionalHighlightModel.distinct('region').exec();
      if (!regions || regions.length === 0) {
        return res.status(404).json({ message: 'No regions found.' });
      }
      return res.status(200).json(regions);
    } catch (error) {
      console.error('Error fetching regions:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
 
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
 