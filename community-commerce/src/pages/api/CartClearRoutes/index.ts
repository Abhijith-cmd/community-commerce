import { NextApiRequest, NextApiResponse } from 'next';
import { clearCart } from '../../../controllers/CartController/CartController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'DELETE') {
        try {
            await clearCart(req, res);
        } catch (error) {
            res.status(500).json({ message: 'Error clearing cart', error });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
