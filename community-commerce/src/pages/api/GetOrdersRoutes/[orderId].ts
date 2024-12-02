import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Order from '../../../models/OrderPlacedModel/OrderPlacedModel'; // Adjust the import based on your project structure
import dbConnection from '@/lib/DbConnection/DbConnection';


// Connect to MongoDB (if you have a singleton or caching connection utility, use it here)
dbConnection();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderId } = req.query;

  // Validate `orderId` format
  if (!mongoose.Types.ObjectId.isValid(orderId as string)) {
    return res.status(400).json({ error: 'Invalid orderId format' });
  }

  try {
    // Handle GET request for retrieving the order details by `orderId`
    if (req.method === 'GET') {
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      return res.status(200).json(order);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default handler;
