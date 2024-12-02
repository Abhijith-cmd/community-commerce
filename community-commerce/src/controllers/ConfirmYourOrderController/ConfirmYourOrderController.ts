// controllers/orderController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../models/ConfirmYourOrderModel/ConfirmYourOrderModel';
import mongoose from 'mongoose';

export const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

export const getUserOrders = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = req.query;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

export const getLatestOrder = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId } = req.query;
        const latestOrder = await Order.findOne({ userId }).sort({ createdAt: -1 });
        res.status(200).json(latestOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest order', error });
    }
};

export const getOrderById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { orderId } = req.query;
        if (!mongoose.Types.ObjectId.isValid(orderId as string)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order by ID', error });
    }
};
