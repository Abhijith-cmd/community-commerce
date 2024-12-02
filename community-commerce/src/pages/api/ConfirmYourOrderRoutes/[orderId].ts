// pages/api/orders/[orderId].ts
import { getOrderById } from '../../../controllers/ConfirmYourOrderController/ConfirmYourOrderController';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getOrderById(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}