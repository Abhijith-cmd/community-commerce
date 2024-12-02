import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'; 
import Cart from '../../models/CartModel/CartModel';

// export const updateCartItemQuantity = async (req: NextApiRequest, res: NextApiResponse) => {
//     // Log the incoming request body to verify the data
//     console.log('Request body:', req.body);

//     // Extract userId, productId, and quantity from the request body
//     const { userId, productId, quantity } = req.body;

//     // Validate the request data
//     if (!userId || !productId || quantity == null || quantity <= 0) {
//         return res.status(400).json({ message: 'Invalid input: Ensure userId, productId, and a positive quantity are provided' });
//     }

//     try {
//         // Ensure productId and userId are in correct format
//         const productIdObj = mongoose.Types.ObjectId.isValid(productId)
//             ? new mongoose.Types.ObjectId(productId)
//             : null;
//         const userIdObj = mongoose.Types.ObjectId.isValid(userId)
//             ? new mongoose.Types.ObjectId(userId)
//             : null;

//         if (!productIdObj || !userIdObj) {
//             return res.status(400).json({ message: 'Invalid userId or productId format' });
//         }

//         // Find and update the item quantity within the user's cart
//         const updatedCart = await Cart.findOneAndUpdate(
//             { userId: userIdObj, 'items.productId': productIdObj },
//             { $set: { 'items.$.quantity': quantity } },
//             { new: true } // Return the updated document
//         );

//         if (!updatedCart) {
//             console.log('Cart or item not found');
//             return res.status(404).json({ message: 'Cart or item not found' });
//         }

//         // Respond with success and updated cart data
//         return res.status(200).json({ message: 'Quantity updated successfully', cart: updatedCart });
//     } catch (error) {
//         console.error('Error updating cart quantity:', error);
//         return res.status(500).json({ message: 'Server error', error });
//     }
// };


export const updateCartItemQuantity = async (req: NextApiRequest, res: NextApiResponse) => {
    // Log the incoming request body to verify the data
    console.log('Request body:', req.body);

    // Extract userId, productId, and quantity from the request body
    const { userId, productId, quantity } = req.body;

    // Validate the request data
    if (!userId || !productId || quantity == null || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid input: Ensure userId, productId, and a positive quantity are provided' });
    }

    try {
        // Ensure productId and userId are in correct format
        const productIdObj = mongoose.Types.ObjectId.isValid(productId)
            ? new mongoose.Types.ObjectId(productId)
            : null;
        const userIdObj = mongoose.Types.ObjectId.isValid(userId)
            ? new mongoose.Types.ObjectId(userId)
            : null;

        if (!productIdObj || !userIdObj) {
            return res.status(400).json({ message: 'Invalid userId or productId format' });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId: userIdObj });

        if (!cart) {
            console.log('Cart not found for userId:', userId);
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the item in the cart
        const item = cart.items.find(item => item.productId.equals(productIdObj));

        if (!item) {
            console.log('Item not found in cart for productId:', productId);
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Update the item's quantity
        item.quantity = quantity;

        // Recalculate the total amount
        cart.totalAmount = cart.items.reduce((total, item) => 
            total + item.productPrice * item.quantity, 0
        );

        // Save the updated cart to the database
        await cart.save();

        // Respond with success and updated cart data
        return res.status(200).json({ message: 'Quantity updated successfully', cart });
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};
