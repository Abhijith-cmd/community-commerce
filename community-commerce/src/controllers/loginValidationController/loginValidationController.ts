import dbConnection from '@/lib/DbConnection/DbConnection';
import UserCredentials from '../../models/loginModel/userCredentials';
import type { NextApiRequest, NextApiResponse } from 'next';

export const validateLogin = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            await dbConnection();
            // Find the user by username
            const user = await UserCredentials.findOne({ username });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Directly compare passwords if they're stored as plain text
            if (user.password !== password) {
                return res.status(400).json({ error: 'Invalid password' });
            }

            // If login is successful
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            res.status(500).json({ error: 'Error logging in' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
