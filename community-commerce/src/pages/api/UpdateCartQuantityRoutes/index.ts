import { NextApiRequest, NextApiResponse } from 'next';
import { updateCartItemQuantity } from '../../../controllers/CartUpdateController/CartUpdateController'; // Import the update function
import dbConnection from '@/lib/DbConnection/DbConnection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnection()
    
    if (req.method === 'PUT') {
        await updateCartItemQuantity(req, res); // Call the update function
    } else {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
