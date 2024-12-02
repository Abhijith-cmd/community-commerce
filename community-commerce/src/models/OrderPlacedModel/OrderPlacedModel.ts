//main function
// import mongoose, { Schema, Document, Model } from "mongoose";
// import Cart from "../CartModel/CartModel"; // Ensure Cart model is imported

// interface OrderItemImage {
//   url: string;
//   altText: string;
//   color: string;
// }

// interface OrderItem {
//   productId: mongoose.Types.ObjectId;
//   productName: string;
//   quantity: number;
//   price: number;
//   image: OrderItemImage;
// }

// interface ShippingAddress {
//   fullName: string;
//   addressLine1: string;
//   addressLine2?: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
//   phone: string;
// }

// interface OrderDocument extends Document {
//   userId: mongoose.Types.ObjectId;
//   items: OrderItem[];
//   shippingAddress: ShippingAddress;
//   paymentMethod?: string;
//   paymentStatus?: string;
//   orderStatus: string;
//   totalAmount: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Add a new interface for Order model with static methods
// interface OrderModel extends Model<OrderDocument> {
//   removeItemsFromCart: (userId: mongoose.Types.ObjectId, items: OrderItem[]) => Promise<void>;
// }

// const OrderItemImageSchema = new Schema<OrderItemImage>({
//   url: { type: String, required: true },
//   altText: { type: String, required: true },
//   color: { type: String, required: true }
// }, { _id: false });

// const OrderItemSchema = new Schema<OrderItem>({
//   productId: { type: Schema.Types.ObjectId, required: true },
//   productName: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   price: { type: Number, required: true },
//   image: { type: OrderItemImageSchema, required: true }
// }, { _id: false });

// const ShippingAddressSchema = new Schema<ShippingAddress>({
//   fullName: { type: String, required: true },
//   addressLine1: { type: String, required: true },
//   addressLine2: String,
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   postalCode: { type: String, required: true },
//   country: { type: String, required: true },
//   phone: { type: String, required: true },
// }, { _id: false });

// const OrderSchema = new Schema<OrderDocument, OrderModel>({
//   userId: { type: Schema.Types.ObjectId, required: true },
//   items: { type: [OrderItemSchema], required: true },
//   shippingAddress: { type: ShippingAddressSchema, required: true },
//   paymentMethod: { type: String },
//   paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
//   orderStatus: { type: String, enum: ['Order Placed', 'Confirmed', 'Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
//   totalAmount: { type: Number, required: true, min: [0, 'Total amount must be positive'] },
// }, { timestamps: true });

// // Define the static method for removing items from the cart
// OrderSchema.statics.removeItemsFromCart = async function (userId, items) {
//   const cart = await Cart.findOne({ userId });
//   if (!cart) return;

//   items.forEach((orderItem:OrderItem) => {
//     const cartItemIndex = cart.items.findIndex(
//       item => item.productId.equals(orderItem.productId)
//     );
//     if (cartItemIndex > -1) {
//       const cartItem = cart.items[cartItemIndex];
//       if (cartItem.quantity <= orderItem.quantity) {
//         cart.items.splice(cartItemIndex, 1);
//       } else {
//         cartItem.quantity -= orderItem.quantity;
//       }
//     }
//   });

//   await cart.save();
// };

// // Ensure TypeScript is aware of the model with the static method
// const Order = mongoose.models.Order as OrderModel || mongoose.model<OrderDocument, OrderModel>("Order", OrderSchema, "Orders");

// export default Order;



//second function
import mongoose, { Schema, Document, Model } from "mongoose";
import Cart from "../CartModel/CartModel"; // Ensure Cart model is imported

interface OrderItemImage {
  url: string;
  altText: string;
  color: string;
}

interface OrderItem {
  productId: mongoose.Types.ObjectId;
  productName: string;
  quantity: number;
  price: number;
  image: OrderItemImage;
}

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface OrderDocument extends Document {
  userId: mongoose.Types.ObjectId;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: string; // New field
  shippingEstimate: string; // New field
  paymentMethod?: string;
  paymentStatus?: string;
  orderStatus: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Add a new interface for Order model with static methods
interface OrderModel extends Model<OrderDocument> {
  removeItemsFromCart: (userId: mongoose.Types.ObjectId, items: OrderItem[]) => Promise<void>;
}

const OrderItemImageSchema = new Schema<OrderItemImage>({
  url: { type: String, required: true },
  altText: { type: String, required: true },
  color: { type: String, required: true }
}, { _id: false });

const OrderItemSchema = new Schema<OrderItem>({
  productId: { type: Schema.Types.ObjectId, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: OrderItemImageSchema, required: true }
}, { _id: false });

const ShippingAddressSchema = new Schema<ShippingAddress>({
  fullName: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
}, { _id: false });

const OrderSchema = new Schema<OrderDocument, OrderModel>({
  userId: { type: Schema.Types.ObjectId, required: true },
  items: { type: [OrderItemSchema], required: true },
  shippingAddress: { type: ShippingAddressSchema, required: true },
  shippingMethod: { type: String, required: true }, // New field
  shippingEstimate: { type: String, required: true }, // New field
  paymentMethod: { type: String },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  orderStatus: { type: String, enum: ['Order Placed', 'Confirmed', 'Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  totalAmount: { type: Number, required: true, min: [0, 'Total amount must be positive'] },
}, { timestamps: true });

// Define the static method for removing items from the cart
OrderSchema.statics.removeItemsFromCart = async function (userId, items) {
  const cart = await Cart.findOne({ userId });
  if (!cart) return;

  items.forEach((orderItem: OrderItem) => {
    const cartItemIndex = cart.items.findIndex(
      item => item.productId.equals(orderItem.productId)
    );
    if (cartItemIndex > -1) {
      const cartItem = cart.items[cartItemIndex];
      if (cartItem.quantity <= orderItem.quantity) {
        cart.items.splice(cartItemIndex, 1);
      } else {
        cartItem.quantity -= orderItem.quantity;
      }
    }
  });

  await cart.save();
};

// Ensure TypeScript is aware of the model with the static method
const Order = mongoose.models.Order as OrderModel || mongoose.model<OrderDocument, OrderModel>("Order", OrderSchema, "Orders");

export default Order;
