import { NextApiRequest, NextApiResponse } from 'next';
import OrderModel from '../../models/OrderPlacedModel/OrderPlacedModel';  // Make sure the correct path is used

// Add an order
export const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const orderData = req.body;

    const newOrder = new OrderModel({
      userId: orderData.userId,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      shippingMethod: orderData.shippingMethod,  // Add shippingMethod
      shippingEstimate: orderData.shippingEstimate,  // Add shippingEstimate
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentStatus,
      orderStatus: orderData.orderStatus,
      totalAmount: orderData.totalAmount,
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get orders by userId
export const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });  // Fetch orders for a specific user
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching orders', error });
  }
};
