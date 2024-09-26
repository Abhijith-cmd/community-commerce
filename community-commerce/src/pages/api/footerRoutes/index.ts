// src/pages/api/footer.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getFooterData, createFooterData } from '../../../controllers/footerController/footerController';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        return getFooterData(req, res); // Call function to fetch footer data
    } else if (req.method === 'POST') {
        return createFooterData(req, res); // Call function to create footer data
    }

    return res.status(405).json({ message: 'Method not allowed' }); // Handle unsupported methods
};


export default handler;