import mongoose, { Document, Schema } from 'mongoose';

export interface IShopMenuItem extends Document {
    name: string;
}

const ShopMenuItemSchema: Schema = new Schema({
    name: { type: String, required: true },
});

const ShopMenuItem = mongoose.models.ShopMenuItem || mongoose.model<IShopMenuItem>('ShopMenuItem', ShopMenuItemSchema);

export default ShopMenuItem;
