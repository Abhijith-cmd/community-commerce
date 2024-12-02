// pages/api/orders/latest.ts
// import { getLatestOrder } from '../../../controllers/ConfirmYourOrderController/ConfirmYourOrderController';
import { NextApiRequest, NextApiResponse } from 'next';

import Order from '../../../models/ConfirmYourOrderModel/ConfirmYourOrderModel';
import dbConnection from '@/lib/DbConnection/DbConnection';

 const getLatestOrder = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnection(); // Ensure the database connection is established
    
    try {
        const { userId } = req.query;

        // Check if userId is present
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the latest order for the given user
        const latestOrder = await Order.findOne({ userId }).sort({ createdAt: -1 });

        if (!latestOrder) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(latestOrder);
    } catch (error) {
        console.error('Error fetching latest order:', error);
        res.status(500).json({ message: 'Error fetching latest order', error });
    }
};

export default getLatestOrder;


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'GET') {
//         await getLatestOrder(req, res);
//     } else {
//         res.setHeader('Allow', ['GET']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

