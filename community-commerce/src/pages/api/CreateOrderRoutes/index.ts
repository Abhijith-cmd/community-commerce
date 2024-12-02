import dbConnection from "@/lib/DbConnection/DbConnection";
import Order from "../../../models/OrderPlacedModel/OrderPlacedModel";
import { NextApiRequest, NextApiResponse } from "next";


// export default async function createOrderHandler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") {
//       return res.status(405).json({ message: "Method Not Allowed" });
//     }
  
//     try {
//       const { userId, items, shippingAddress, paymentMethod, totalAmount } = req.body;
  
//       // Validate the data before proceeding
//       if (!userId || !items || !shippingAddress || !totalAmount) {
//         return res.status(400).json({ message: "Missing required fields" });
//       }
  
//       // Create order as usual
//       const order = await Order.create({
//         userId,
//         items,
//         shippingAddress,
//         paymentMethod,
//         orderStatus: "Pending",
//         totalAmount,
//       });
  
//       // Call to remove items from cart
//       await Order.removeItemsFromCart(userId, items);
  
//       return res.status(201).json(order);  // Successfully created order
//     } catch (error: unknown) {
//       // Type-check error to see if it has a 'message' property
//       if (error instanceof Error) {
//         console.error("Error creating order:", error.message);
//         return res.status(500).json({ message: "Internal Server Error", error: error.message });
//       } else {
//         console.error("Unexpected error:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }
//     }
//   }
  



export default async function createOrderHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnection()
  try {
    const { userId, items, shippingAddress, shippingMethod, shippingEstimate, paymentMethod, totalAmount } = req.body;

    // Validate the data before proceeding
    if (!userId || !items || !shippingAddress || !shippingMethod || !shippingEstimate || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create order with additional fields
    const order = await Order.create({
      userId,
      items,
      shippingAddress,
      shippingMethod,       // Include shippingMethod
      shippingEstimate,     // Include shippingEstimate
      paymentMethod,
      orderStatus: "Pending",
      totalAmount,
    });

    // Call to remove items from cart
    await Order.removeItemsFromCart(userId, items);

    return res.status(201).json(order);  // Successfully created order
  } catch (error: unknown) {
    // Type-check error to see if it has a 'message' property
    if (error instanceof Error) {
      console.error("Error creating order:", error.message);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
