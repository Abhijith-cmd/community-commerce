// import mongoose, { Schema, Document } from 'mongoose';

// interface Address {
//     line1: string;
//     line2: string;
//     city: string;
//     state: string;
//     country: string;
//     postalCode: string;
// }

// interface OrderDocument extends Document {
//     userId: string;
//     billingAddress: Address;
//     shippingMethod: string;
//     shippingEstimate: number;
//     items: Array<{
//         productId: string;
//         quantity: number;
//         price: number;
//         productName:string;
//         productColor:string;
//     }>;
//     totalAmount: number;
//     status: string; 
//     createdAt: Date;
//     updatedAt: Date;
// }

// const AddressSchema: Schema = new Schema({
//     line1: { type: String, required: true },
//     line2: { type: String },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     country: { type: String, required: true },
//     postalCode: { type: String, required: true },
// });

// const OrderSchema: Schema = new Schema(
//     {
//         userId: { type: String, required: true },
//         billingAddress: { type: AddressSchema, required: true },
//         shippingMethod: { type: String, required: true },
//         shippingEstimate: { type: Number, required: true },
//         items: [
//             {
//                 productId: { type: String, required: true },
//                 quantity: { type: Number, required: true },
//                 price: { type: Number, required: true },
//                 productName: { type: String, required: true }, 
//                 productColor: { type: String, required: true },
//             },
//         ],
//         totalAmount: { type: Number, required: true },
//         status: { type: String, default: 'Pending' },
//     },
//     { timestamps: true }
// );

// export default mongoose.models.Order || mongoose.model<OrderDocument>('confirmyourorder', OrderSchema);



//new model
import mongoose, { Schema, Document } from 'mongoose';

interface Address {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

interface OrderDocument extends Document {
    userId: string;
    billingAddress: Address;
    shippingMethod: string;
    shippingEstimate: number;
    items: Array<{
        productId: string;
        quantity: number;
        price: number;
        productName: string;
        productColor: string;
    }>;
    totalAmount: number;
    status: string; 
    createdAt: Date;
    updatedAt: Date;
}

const AddressSchema: Schema = new Schema({
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
});

const OrderSchema: Schema = new Schema(
    {
        userId: { type: String, required: true },
        billingAddress: { type: AddressSchema, required: true },
        shippingMethod: { type: String, required: true },
        shippingEstimate: { type: Number, required: true },
        items: [
            {
                productId: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                productName: { type: String, required: true },
                productColor: { type: String, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        status: { type: String, default: 'Pending' },
    },
    { timestamps: true }
);

export default mongoose.models.confirmyourorder || mongoose.model<OrderDocument>('confirmyourorder', OrderSchema);
