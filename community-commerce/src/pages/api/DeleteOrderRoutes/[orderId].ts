// pages/api/orders/[orderId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Order from '../../../models/OrderPlacedModel/OrderPlacedModel'; // Adjust the path if needed
import dbConnection from '@/lib/DbConnection/DbConnection';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection();

  const { orderId } = req.query;

  if (req.method === 'DELETE') {
    try {
      // Validate the order ID format
      if (!mongoose.Types.ObjectId.isValid(orderId as string)) {
        return res.status(400).json({ message: 'Invalid order ID format' });
      }

      // Find and delete the order by ID
      const deletedOrder = await Order.findByIdAndDelete(orderId as string);

      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }

      // Return success message
      res.status(200).json({ message: 'Order deleted successfully', orderId });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'An error occurred while deleting the order' });
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
