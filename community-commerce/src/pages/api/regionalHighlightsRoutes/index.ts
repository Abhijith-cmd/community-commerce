import { NextApiRequest, NextApiResponse } from 'next';
import dbConnection from '../../../lib/DbConnection/DbConnection';
import RegionalHighlightModel from '../../../models/regionalHighlightsModel/regionHighlightModel';
 
interface Highlight {
  _id: string;
  title: string;
  description: string;
  link: string;
  isActive: boolean;
  Priority?: number; // Optional if Priority is not always present
}


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
 

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnection(); // Ensure the database is connected
 
//   if (req.method === 'GET') {
//     const { region } = req.query;
 
//     try {
//       // Fetch highlights based on the region
//       const regional_highlights = await RegionalHighlightModel.find({ region }).exec();
//       return res.status(200).json(regional_highlights);
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
    const { region } = req.query;

    try {
      // Fetch documents by region
      const regionalData = await RegionalHighlightModel.find({ region }).exec();

      if (!regionalData || regionalData.length === 0) {
        return res.status(404).json({ message: 'No highlights found for this region.' });
      }

      // Filter highlights where isActive is true
      const activeHighlights = regionalData.map(regionItem => ({
        ...regionItem._doc, // Spread existing document fields
        highlights: regionItem.highlights.filter((highlight : Highlight) => highlight.isActive === true) // Filter only active highlights
      }));

      return res.status(200).json(activeHighlights);
    } catch (error) {
      console.error('Error fetching highlights:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}