import dbConnection from '@/lib/DbConnection/DbConnection';
import UserCredentials from '../../models/loginModel/userCredentials';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt'
import { generateToken } from '../../utils/jwtUtils';

// export const validateLogin = async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === 'POST') {
//         const { username, password } = req.body;

//         try {
//             await dbConnection();
//             // Find the user by username
//             const user = await UserCredentials.findOne({ username });

//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }

//             // Directly compare passwords if they're stored as plain text
//             if (user.password !== password) {
//                 return res.status(400).json({ error: 'Invalid password' });
//             }

//             // If login is successful
//             res.status(200).json({ message: 'Login successful' });
//         } catch (error) {
//             res.status(500).json({ error: 'Error logging in' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// };


//comparing hashed passwords
// export const validateLogin = async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === 'POST') {
//         const { username, password } = req.body;

//         try {
//             await dbConnection();

//             // Find the user by username
//             const user = await UserCredentials.findOne({ username });

//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }

//             // Compare the password entered by the user with the hashed password stored in the database
//             const isPasswordValid = await bcrypt.compare(password, user.password);

//             if (!isPasswordValid) {
//                 return res.status(400).json({ error: 'Invalid password' });
//             }

//             // If login is successful
//             res.status(200).json({ message: 'Login successful' });
//         } catch (error) {
//             res.status(500).json({ error: 'Error logging in' });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// };

//comparing hashed passwords and getting token upon login
export const validateLogin = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            await dbConnection();

            // Find the user by username
            const user = await UserCredentials.findOne({ username });

            if (!user) {
                return res.status(404).json({ error: 'Invalid Username' });
            }

            // Compare the password entered by the user with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // if (!isPasswordValid) {
            //     return res.status(400).json({ error: 'Invalid password' });
            // }

            if (!isPasswordValid) {
                console.log("Password entered:", password);
                console.log("Hashed password in DB:", user.password);
                return res.status(400).json({ error: 'Invalid password' });
            }

            // Generate JWT token
            const token = generateToken(user._id.toString());

            // Store the token in the user's record
            user.tokens = user.tokens ? [...user.tokens, token] : [token];
            await user.save();

            // Send the token as a response
            // res.status(200).json({ token });

            // Send the token and a success message in the response
            res.status(200).json({
                message: 'Login successful',
                token
            });

        } catch (error) {
            console.error(error); // Optional: Log the error for debugging purposes
            res.status(500).json({ error: 'Error logging in' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};