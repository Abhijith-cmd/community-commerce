import { NextApiRequest, NextApiResponse } from 'next';
import { createDefaultMenuItems, getMenuItems, deleteMenuItem } from '../../../controllers/MenuController/MenuListController';
import dbConnection from '@/lib/DbConnection/DbConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection();

  if (req.method === 'GET') {
    // Handle fetching menu items
    try {
      const menuItems = await getMenuItems();
      res.status(200).json(menuItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching menu items', error });
    }
  } else if (req.method === 'POST') {
    // Handle creating default menu items
    try {
      const defaultMenuItems = await createDefaultMenuItems();
      res.status(201).json(defaultMenuItems);
    } catch (error) {
      res.status(500).json({ message: 'Error creating menu items', error });
    }
  } else if (req.method === 'DELETE') {
    // Handle deleting a menu item
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'Menu item ID is required' });
      }

      const deletedItem = await deleteMenuItem(id);

      if (!deletedItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }

      res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting menu item', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
