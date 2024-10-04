import { NextApiRequest, NextApiResponse } from 'next';
import dbConnection from '../../lib/DbConnection/DbConnection';
import HighlightModel from '../../models/highlightModel';
 
 
 
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnection(); // Ensure the database is connected
 
//   if (req.method === 'GET') {
//     const { abbreviation } = req.query;
 
//     try {
//       // Fetch highlights based on the region
//       const highlights = await HighlightModel.find({ abbreviation }).exec();
//       return res.status(200).json(highlights);
//     } catch (error) {
//       console.error('Error fetching highlights:', error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
 
//   res.setHeader('Allow', ['GET']);
//   return res.status(405).end(`Method ${req.method} Not Allowed`);
// } 

interface Highlight {
  title: string;
  description: string;
  date: string;
  link: string;
  isActive: boolean;
  priority: number;
  _id: string;
}
 
// Define a type for the main highlight document
interface HighlightDocument {
  _id: string;
  abbreviation: string;
  country_name: string;
  highlights: Highlight[];
}
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection(); // Ensure the database is connected
 
  if (req.method === 'GET') {
    const { abbreviation } = req.query;
 
    try {
      // Fetch a highlight document based on the abbreviation
      const highlightDocument: HighlightDocument | null = await HighlightModel.findOne({ abbreviation }).exec();
 
      if (!highlightDocument) {
        return res.status(404).json({ message: 'Highlight not found' });
      }
 
      // Filter highlights to get only active ones
      const activeHighlights = highlightDocument.highlights.filter((highlight: Highlight) => highlight.isActive);
 
      // Return the document with active highlights
      return res.status(200).json({
        _id: highlightDocument._id,
        abbreviation: highlightDocument.abbreviation,
        country_name: highlightDocument.country_name,
        highlights: activeHighlights,
      });
    } catch (error) {
      console.error('Error fetching highlights:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
 
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
