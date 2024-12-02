import mongoose, { Schema, Document, Model } from "mongoose";

export interface CartItem {
    productId: mongoose.Types.ObjectId;
    productName: string;
    productPrice: number;
    productColor?: string;
    quantity: number;
}

export interface CartDocument extends Document {
    cartId?: string;  
    userId: mongoose.Types.ObjectId;
    items: CartItem[];
    totalAmount: number;
}

const cartItemSchema = new Schema<CartItem>({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productColor: { type: String, default: 'default color' },
    quantity: { type: Number, required: true },
});

const cartSchema = new Schema<CartDocument>({
    cartId: { type: String },  // Optional field
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, default: 0 },
}, { timestamps: true });

cartSchema.pre<CartDocument>('save', function (next) {
    this.totalAmount = this.items.reduce((total, item) => 
        total + item.productPrice * item.quantity, 0
    );
    next();
});

// Check if the model is already defined to avoid OverwriteModelError
const Cart: Model<CartDocument> = mongoose.models.Cart || mongoose.model<CartDocument>('Cart', cartSchema);

export default Cart;
