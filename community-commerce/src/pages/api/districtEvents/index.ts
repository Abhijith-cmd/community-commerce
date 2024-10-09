import { NextApiRequest, NextApiResponse } from 'next';
import dbConnection from '../../../lib/DbConnection/DbConnection';
import DistrictEventModel from '../../../models/districtEventModel/districtEventModel';
 
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnection(); // Ensure the database is connected
 
//   if (req.method === 'GET') {
//     const { region } = req.query;
 
//     try {
//       const highlights = await RegionalHighlightModel.find({ region }).exec();
//       if (!highlights || highlights.length === 0) {
//         return res.status(404).json({ message: 'No highlights found for this region.' });
//       }
//       return res.status(200).json(highlights);
//     } catch (error) {
//       console.error('Error fetching highlights:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
 
//   res.setHeader('Allow', ['GET']);
//   return res.status(405).end(`Method ${req.method} Not Allowed`);
// }
 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection(); // Ensure the database is connected
 
  if (req.method === 'GET') {
    const { city } = req.query;
 
    try {
      // Fetch highlights based on the region
      const district_events = await DistrictEventModel.find({ city }).exec();
      return res.status(200).json(district_events);
    } catch (error) {
      console.error('Error fetching highlights:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
 
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}