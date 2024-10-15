import { NextApiRequest,NextApiResponse } from 'next';
import { getShopMenuItems, addShopMenuItem } from '../../../controllers/ShopMenuItemsController/ShopMenuItemsController';

export default async function handler(req: NextApiRequest, res : NextApiResponse) {
    if (req.method === 'GET') {
        return getShopMenuItems(req, res);
    } else if (req.method === 'POST') {
        return addShopMenuItem(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
