// src/controllers/footerController.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Footer from '../../models/footerModel/footerModel';
import dbConnection from '@/lib/DbConnection/DbConnection';

// Function to fetch footer data
export const getFooterData = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await dbConnection(); // Ensure database connection
        const footer = await Footer.findOne(); // Fetch footer document
        if (!footer) return res.status(404).json({ message: 'Footer not found' });
        return res.status(200).json(footer); // Send footer data
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching footer data', error });
    }
};

// Function to create footer data
export const createFooterData = async (req: NextApiRequest, res: NextApiResponse) => {
    const { section_1, section_2, section_3, section_4 } = req.body;

    try {
        await dbConnection(); // Ensure database connection

        // Create a new instance of Footer with the data from the request body
        const newFooter = new Footer({
            section_1,
            section_2,
            section_3,
            section_4,
        });

        // Save the footer to the database
        await newFooter.save();

        // Respond with the created footer
        res.status(201).json({ message: 'Footer created successfully', footer: newFooter });
    } catch (error) {
        res.status(500).json({ message: 'Error creating footer', error });
    }
};