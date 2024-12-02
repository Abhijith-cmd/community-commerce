import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';  // Ensure mongoose is imported
import OrderModel from '../../../models/OrderPlacedModel/OrderPlacedModel';  // Adjust the import path as necessary
import dbConnection from '@/lib/DbConnection/DbConnection';

// export const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     const { userId } = req.query;

//     if (!userId || Array.isArray(userId)) {
//       return res.status(400).json({ message: 'Valid User ID is required' });
//     }

//     // Convert userId to mongoose ObjectId (if it isn't already)
//     const objectId = new mongoose.Types.ObjectId(userId);

//     // Fetch orders for a specific user, sorted by creation date
//     const orders = await OrderModel.find({ userId: objectId }).sort({ createdAt: -1 });

//     if (!orders.length) {
//       return res.status(404).json({ message: 'No orders found for this user.' });
//     }

//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error fetching orders', error });
//   }
// };


// The handler for the API route
// export const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Check if the request method is GET
//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method Not Allowed' });  // If not GET, return 405 error
//   }

//   try {
//     const { userId } = req.query;  // Get userId from query parameters

//     // Check if userId is valid
//     if (!userId || Array.isArray(userId)) {
//       return res.status(400).json({ message: 'Valid User ID is required' });  // Return error if userId is missing or invalid
//     }

//     // Convert userId to mongoose ObjectId
//     const objectId = new mongoose.Types.ObjectId(userId);

//     // Fetch orders for this user, sorted by creation date in descending order
//     const orders = await OrderModel.find({ userId: objectId }).sort({ createdAt: -1 });

//     // If no orders found, return a 404 error
//     if (!orders.length) {
//       return res.status(404).json({ message: 'No orders found for this user.' });
//     }

//     // If orders are found, return them with a 200 status
//     return res.status(200).json(orders);
//   } catch (error) {
//     // In case of an error, log it and return a 500 error
//     console.error(error);
//     return res.status(500).json({ message: 'Error fetching orders', error });
//   }
// };


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnection()

  try {
    const { userId } = req.query;

    // Check if userId is valid
    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({ message: 'Valid User ID is required' });
    }

    // Convert userId to mongoose ObjectId
    const objectId = new mongoose.Types.ObjectId(userId as string);

    // Fetch orders for this user, sorted by creation date in descending order
    const orders = await OrderModel.find({ userId: objectId }).sort({ createdAt: -1 });

    // If no orders found, return a 404 error
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    // If orders are found, return them with a 200 status
    return res.status(200).json(orders);
  } catch (error) {
    // In case of an error, log it and return a 500 error
    console.error(error);
    return res.status(500).json({ message: 'Error fetching orders', error });
  }
}