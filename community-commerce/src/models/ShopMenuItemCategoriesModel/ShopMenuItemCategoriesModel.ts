import mongoose, { Document, Schema } from 'mongoose';


export interface ICategory {
    [category: string]: string[] | []; 
}

// Interface for MenuItem, which will have sections and categories
export interface IShopMenuItem extends Document {
    name: string;
    sections?: { [section: string]: ICategory }; 
    createdAt: Date; 
}

// Define the schema for ShopMenuItemCategories
const ShopMenuItemSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true }, 
    sections: { type: Object, default: {} }, 
    createdAt: { type: Date, default: Date.now } 
});

// Model for ShopMenuItemCategories
const ShopMenuItemCategories = mongoose.models.ShopMenuItemCategories || mongoose.model<IShopMenuItem>('ShopMenuItemCategories', ShopMenuItemSchema);

export default ShopMenuItemCategories;
