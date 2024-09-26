import dbConnection from '@/lib/DbConnection/DbConnection';
import UserCredentials from '../../models/loginModel/userCredentials';
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../utils/jwtUtils';

export const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        try {
            await dbConnection();

            // Verify the token to get the user ID
            const decoded = verifyToken(token);
            const userId = decoded.userId; // Using userId from your jwtUtils.ts

            if (!userId) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            // Find the user by ID and remove the token from their tokens array
            const user = await UserCredentials.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const tokenExists = user.tokens.includes(token);
            if (!tokenExists) {
                return res.status(400).json({ error: 'Invalid or already logged out' });
            }


            // Remove the token from the user's tokens array
            user.tokens = user.tokens.filter((storedToken: string) => storedToken !== token);
            await user.save();

            // Send a response indicating successful logout
            res.status(200).json({ message: 'Logout successful' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error logging out' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default logout;
