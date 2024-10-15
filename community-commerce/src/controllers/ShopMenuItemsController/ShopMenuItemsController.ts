// controllers/shopMenuItemsController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import ShopMenuItem from '../../models/ShopMenuItemsModel/ShopMenuItemsModel';
import dbConnection from '@/lib/DbConnection/DbConnection';

export const getShopMenuItems = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnection();
    try {
        const items = await ShopMenuItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items' });
    }
};

export const addShopMenuItem = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnection();
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const newItem = new ShopMenuItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding menu item' });
    }
};
