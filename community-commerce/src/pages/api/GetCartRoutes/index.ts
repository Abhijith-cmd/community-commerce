import { NextApiRequest, NextApiResponse } from 'next';
import { getAllItemsFromCart } from '../../../controllers/CartController/CartController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                // Get the cart details
                await getAllItemsFromCart(req, res);
                break;
            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while processing the request', error });
    }
}
