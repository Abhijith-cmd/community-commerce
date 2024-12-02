// pages/api/orders/latest.ts
import { getLatestOrder } from '../../../controllers/ConfirmYourOrderController/ConfirmYourOrderController';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getLatestOrder(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}