import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose'; 
import Cart, { CartDocument } from '../../models/CartModel/CartModel';

// Add to Cart
// export const addToCart = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { userId, productId, productName, productPrice, productColor, quantity } = req.body;
//     try {
//         let cart = await Cart.findOne({ userId });

//         const cartItem = { productId, productName, productPrice, productColor, quantity };

//         if (!cart) {
//             cart = new Cart({
//                 userId,
//                 items: [cartItem],
//                 totalAmount: productPrice * quantity,
//             });
//         } else {
//             const existingItem = cart.items.find(item => item.productId.equals(productId));
//             if (existingItem) {
//                 existingItem.quantity += quantity;
//             } else {
//                 cart.items.push(cartItem);
//             }
//         }
//         await cart.save();
//         return res.status(200).json(cart);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error adding to cart', error });
//     }
// };


// Add to Cart
export const addToCart = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, productId, productName, productPrice, productColor, quantity } = req.body;

    // Check for missing fields
    if (!userId || !productId || !productName || !productPrice || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        let cart = await Cart.findOne({ userId });

        // Create a new ObjectId instance for productId
        const cartItem = { 
            productId: new mongoose.Types.ObjectId(productId), // Use 'new' keyword here
            productName, 
            productPrice, 
            productColor, 
            quantity 
        };

        if (!cart) {
            cart = new Cart({
                userId,
                items: [cartItem],
                totalAmount: productPrice * quantity,
            });
        } else {
            const existingItem = cart.items.find(item => item.productId.equals(cartItem.productId));
            if (existingItem) {
                existingItem.quantity += quantity; // Update quantity if item already exists
            } else {
                cart.items.push(cartItem); // Add new item to cart
            }
        }

        // Recalculate total amount
        cart.totalAmount = cart.items.reduce((total, item) => total + item.productPrice * item.quantity, 0);
        
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding to cart:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error adding to cart', error });
    }
};

// Get Cart
export const getCart = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.query;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching cart', error });
    }
};

// Get All Items from All Carts
// export const getAllItemsFromCart = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         // Fetch all carts from the database
//         const carts: CartDocument[] = await Cart.find(); // This will get all the carts

//         // Extract items from each cart into a single array
//         const allItems: CartItem[] = carts.reduce<CartItem[]>((acc, cart) => {
//             return acc.concat(cart.items); // Combine items from all carts into a single array
//         }, []);

//         return res.status(200).json(allItems); // Return all items
//     } catch (error) {
//         console.error('Error fetching cart items:', error); // Log the error for debugging
//         return res.status(500).json({ message: 'Error fetching cart items', error });
//     }
// };

export const getAllItemsFromCart = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Fetch all carts from the database
        const carts: CartDocument[] = await Cart.find(); // Get all carts

        // Prepare an array to hold all items along with their userId
        const allItemsWithUserId = carts.flatMap(cart => 
            cart.items.map(item => ({
                userId: cart.userId, // Include userId
                productId: item.productId,
                productName: item.productName,
                productPrice: item.productPrice,
                productColor: item.productColor,
                quantity: item.quantity,
            }))
        );

        return res.status(200).json(allItemsWithUserId); // Return all items with associated userId
    } catch (error) {
        console.error('Error fetching cart items:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error fetching cart items', error });
    }
};

// Update Item in Cart
export const updateCartItem = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const item = cart.items.find(item => item.productId.equals(productId));
        if (!item) return res.status(404).json({ message: 'Item not found in cart' });

        item.quantity = quantity;
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating cart item', error });
    }
};

// Remove Item from Cart
export const removeCartItem = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => !item.productId.equals(productId));
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: 'Error removing cart item', error });
    }
};

// Clear Cart
export const clearCart = async (req: NextApiRequest, res: NextApiResponse) => {
    const { userId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = [];
        cart.totalAmount = 0;
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ message: 'Error clearing cart', error });
    }
};

// Update product quantity in cart
// export const updateCartItemQuantity = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { userId, productId, quantity } = req.body; // Assuming userId, productId, and quantity are passed in the request body

//     try {
//         // Find the cart for the user
//         const cart = await Cart.findOne({ userId });

//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }

//         // Find the item in the cart
//         const item = cart.items.find(item => item.productId.toString() === productId);

//         if (!item) {
//             return res.status(404).json({ message: 'Item not found in cart' });
//         }

//         // Update the item's quantity
//         item.quantity = quantity;

//         // Save the updated cart
//         await cart.save();

//         return res.status(200).json({ message: 'Quantity updated', cart });
//     } catch (error) {
//         return res.status(500).json({ message: 'Server error', error });
//     }
// };

