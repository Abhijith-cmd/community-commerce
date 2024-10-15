// controllers/ShopMenuItemCategoriesController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import ShopMenuItemCategories, { IShopMenuItem } from '../../models/ShopMenuItemCategoriesModel/ShopMenuItemCategoriesModel'; 

// // Function to get all categories
// export const getShopMenuItemCategories = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const categories = await ShopMenuItemCategories.find();
//         res.status(200).json(categories);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching categories', error });
//     }
// };

// // Function to add a new category
// export const addShopMenuItemCategory = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { name, sections } = req.body;

//     try {
//         const newCategory: IShopMenuItem = new ShopMenuItemCategories({ name, sections });
//         await newCategory.save();
//         res.status(201).json(newCategory);
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating category', error });
//     }
// };

// // Function to update a specific category
// export const updateShopMenuItemCategory = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { id } = req.query;
//     const { name, sections } = req.body;

//     try {
//         const updatedCategory = await ShopMenuItemCategories.findByIdAndUpdate(id, { name, sections }, { new: true });
//         if (!updatedCategory) {
//             return res.status(404).json({ message: 'Category not found' });
//         }
//         res.status(200).json(updatedCategory);
//     } catch (error) {
//         res.status(400).json({ message: 'Error updating category', error });
//     }
// };

// // Function to delete a category
// export const deleteShopMenuItemCategory = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { id } = req.query;

//     try {
//         const deletedCategory = await ShopMenuItemCategories.findByIdAndDelete(id);
//         if (!deletedCategory) {
//             return res.status(404).json({ message: 'Category not found' });
//         }
//         res.status(200).json({ message: 'Category deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting category', error });
//     }
// };




//new function
// Function to get all categories
export const getShopMenuItemCategories = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const categories = await ShopMenuItemCategories.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// Function to add a new category (name only)
export const addShopMenuItemCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.body;

    try {
        const newCategory: IShopMenuItem = new ShopMenuItemCategories({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error });
    }
};

// Function to add categories to a specific category (identified by name or ID)
export const addCategoriesToShopMenuItemCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, sections } = req.body; // Accept sections as an object

    try {
        const updatedCategory = await ShopMenuItemCategories.findByIdAndUpdate(id, { $set: { sections } }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: 'Error updating categories', error });
    }
};

// Function to update a specific category
export const updateShopMenuItemCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { name, sections } = req.body;

    try {
        const updatedCategory = await ShopMenuItemCategories.findByIdAndUpdate(id, { name, sections }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: 'Error updating category', error });
    }
};

// Function to delete a category
export const deleteShopMenuItemCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    try {
        const deletedCategory = await ShopMenuItemCategories.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};