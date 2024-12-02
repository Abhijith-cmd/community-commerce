// pages/api/orders/index.ts
import dbConnection from '@/lib/DbConnection/DbConnection';
import { createOrder, getUserOrders } from '../../../controllers/ConfirmYourOrderController/ConfirmYourOrderController';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnection()
    if (req.method === 'POST') {
        await createOrder(req, res);
    } else if (req.method === 'GET') {
        await getUserOrders(req, res);
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}