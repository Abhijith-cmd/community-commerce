import { NextApiRequest, NextApiResponse } from 'next';
import { addToCart, getCart, updateCartItem, removeCartItem } from '../../../controllers/CartController/CartController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    try {
        switch (method) {
            case 'POST':
                // Add an item to the cart
                await addToCart(req, res);
                break;
            case 'GET':
                // Get the cart details
                await getCart(req, res);
                break;
            case 'PUT':
                // Update an item in the cart
                await updateCartItem(req, res);
                break;
            case 'DELETE':
                // Remove an item from the cart
                await removeCartItem(req, res);
                break;
            default:
                res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while processing the request', error });
    }
}
