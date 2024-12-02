import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';  // Ensure mongoose is imported
import OrderModel from '../../../models/OrderPlacedModel/OrderPlacedModel';  // Adjust the import path as necessary

export const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({ message: 'Valid User ID is required' });
    }

    // Convert userId to mongoose ObjectId (if it isn't already)
    const objectId = new mongoose.Types.ObjectId(userId);

    // Fetch orders for a specific user, sorted by creation date
    const orders = await OrderModel.find({ userId: objectId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching orders', error });
  }
};
