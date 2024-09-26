import { NextApiRequest, NextApiResponse } from 'next';
import dbConnection from '../../lib/DbConnection/DbConnection';  // Adjust the path to your `db` connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnection();
    res.status(200).json({ message: 'Connected to the database successfully' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Failed to connect to the database' });
  }
}
