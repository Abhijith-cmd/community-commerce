import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the menu list item
interface IMenuList extends Document {
  name: string;
}

// Define the schema for the menu list
const menuListSchema = new Schema<IMenuList>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: 'menu_list', // Specify the collection name
  }
);

// Singleton pattern to avoid multiple model definitions
let MenuList: mongoose.Model<IMenuList>;

if (mongoose.models.MenuList) {
  MenuList = mongoose.models.MenuList;
} else {
  MenuList = mongoose.model<IMenuList>('MenuList', menuListSchema);
}

export default MenuList;
