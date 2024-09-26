import { NextApiRequest, NextApiResponse } from 'next';
import PromotionalBanner from '../../models/promotionalBannerModel/promotionalBanner';
import dbConnection from '../../lib/DbConnection/DbConnection';

export const getPromotionalBanners = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnection(); // Ensure database connection
    const banners = await PromotionalBanner.find({ isActive: true }); // Fetch active banners
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banners', error });
  }
};


// Function to create a new promotional banner
export const createPromotionalBanner = async (req: NextApiRequest, res: NextApiResponse) => {
    const { imageUrl, description, link, isActive } = req.body;
  
    try {
      await dbConnection(); // Ensure database connection
  
      // Create a new instance of PromotionalBanner with the data from the request body
      const newBanner = new PromotionalBanner({
        imageUrl,
        description,
        link,
        isActive: isActive ?? true, // Default to true if not provided
      });
  
      // Save the banner to the database
      await newBanner.save();
  
      // Respond with the created banner
      res.status(201).json({ message: 'Banner created successfully', banner: newBanner });
    } catch (error) {
      res.status(500).json({ message: 'Error creating banner', error });
    }
  };