import { NextApiRequest, NextApiResponse } from 'next';
import { createOrder } from '../../../controllers/OrderPlacedController/OrderPlacedControlller';

// Route handler for POST requests to /api/orders
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // If the method is not POST, return a 405 Method Not Allowed response
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Handle the POST request for creating an order
  try {
    await createOrder(req, res); // Call the createOrder function from the controller
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({ message: 'Error creating order', error });
  }
}
