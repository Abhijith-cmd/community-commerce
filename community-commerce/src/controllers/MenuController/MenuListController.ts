import MenuList from '../../models/menuModel/MenuList';

// Fetch all menu items
export const getMenuItems = async () => {
  return await MenuList.find({});
};

// Create default menu items
export const createDefaultMenuItems = async () => {
  const defaultItems = [
    { name: 'Home' },
    { name: 'Shop' },
    { name: 'Categories' },
    { name: 'Community' },
    { name: 'Events' },
    { name: 'Blog' },
    { name: 'About Us' },
    { name: 'Support' },
  ];

  return await MenuList.insertMany(defaultItems);
};

// Delete a menu item by its ID
export const deleteMenuItem = async (id: string) => {
  return await MenuList.findByIdAndDelete(id);
};
