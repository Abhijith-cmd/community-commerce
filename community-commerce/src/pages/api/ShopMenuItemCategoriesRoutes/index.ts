import { NextApiRequest, NextApiResponse } from 'next';
import { getShopMenuItemCategories, addShopMenuItemCategory, addCategoriesToShopMenuItemCategory } from '../../../controllers/ShopMenuItemCategoriesController/ShopMenuItemCategoriesController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getShopMenuItemCategories(req, res);
        case 'POST':
            return addShopMenuItemCategory(req, res);
        case 'PUT':
            return addCategoriesToShopMenuItemCategory(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}