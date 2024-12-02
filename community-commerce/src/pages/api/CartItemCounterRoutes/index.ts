import { NextApiRequest, NextApiResponse } from 'next';
// import mongoose from 'mongoose';
import Cart from '../../../models/CartModel/CartModel';  // Update with the correct path to your model
import dbConnection from '@/lib/DbConnection/DbConnection';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnection();

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

        return res.status(200).json({ itemCount });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
