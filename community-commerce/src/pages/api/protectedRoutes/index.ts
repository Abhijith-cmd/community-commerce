import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../utils/jwtUtils'; // Assuming verifyToken is in utils/jwtUtils
import { getTokenFromDB } from '../../../utils/dbUtils'; // Assuming you store tokens in DB

// const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader ? authHeader.split(' ')[1] : null; // Extract token from 'Bearer <token>'

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     // Fetch token from the DB to ensure it's valid
//     const tokenFromDB = await getTokenFromDB(token);

//     if (!tokenFromDB) {
//       return res.status(401).json({ message: 'Invalid or expired token' });
//     }

//     // Verify the token (decode it and get the user info)
//     const decoded = verifyToken(token);

//     // You can now use the decoded user info
//     // For example, decoded.userId or decoded.username
//     return res.status(200).json({ message: 'You have access to this protected route!', user: decoded });
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };

// export default protectedRoute;


//function with error logs
// const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
//     const authHeader = req.headers.authorization;
//     const token = authHeader ? authHeader.split(' ')[1] : null; // Extract token from 'Bearer <token>'
  
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }
  
//     try {
//       console.log('Received Token:', token); // Log received token
  
//       // Fetch token from the DB to ensure it's valid
//       const tokenFromDB = await getTokenFromDB(token);
//       console.log('Token from DB:', tokenFromDB); // Log token fetched from the database
  
//       if (!tokenFromDB) {
//         return res.status(401).json({ message: 'Invalid or expired token from DB' });
//       }
  
//       // Verify the token (decode it and get the user info)
//       const decoded = verifyToken(token);
//       console.log('Decoded Token:', decoded); // Log the decoded token info
  
//       // If the token is verified, proceed with the request
//       return res.status(200).json({ message: 'You have access to this protected route!', user: decoded });
//     } catch (error) {
//       console.error('Error verifying token:', error); // Log verification error
//       return res.status(403).json({ message: 'Invalid or expired token' });
//     }
//   };
  
//   export default protectedRoute;

//
const protectedRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null; // Extract token from 'Bearer <token>'
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      console.log('Received Token:', token); // Log received token
  
      // Fetch token from the DB to ensure it's valid
      const userRecord = await getTokenFromDB(token);
      console.log('User Record:', userRecord); // Log the fetched user record
  
      if (!userRecord) {
        return res.status(401).json({ message: 'Invalid or expired token from DB' });
      }
  
      // Verify the token (decode it and get the user info)
      const decoded = verifyToken(token);
      console.log('Decoded Token:', decoded); // Log the decoded token info
  
      // If the token is verified, proceed with the request
      return res.status(200).json({ message: 'You have access to this protected route!', user: decoded });
    } catch (error) {
      console.error('Error verifying token:', error); // Log verification error
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

export default protectedRoute;



//function (3)
// export default async function protectedRoute(req: NextApiRequest, res: NextApiResponse) {
//     // Connect to the database
//     await dbConnection();
  
//     // Get the token from the request headers
//     const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  
//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }
  
//     try {
//       // Verify the token
//       const decoded = verifyToken(token);
      
//       // Search for the user in the database
//       const user = await UserCredentials.findById(decoded.userId); // Adjust based on your token payload
  
//       if (!user || !user.status) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
  
//       // Check if the token exists in user's tokens array
//       const isTokenValid = user.tokens.includes(token);
  
//       if (!isTokenValid) {
//         return res.status(401).json({ message: 'Invalid token' });
//       }
  
//       // Token is valid and user is found
//       res.status(200).json({ message: 'Access granted', userId: user._id });
//     } catch (error) {
//       console.error('Token verification failed:', error);
//       return res.status(401).json({ message: 'Token verification failed' });
//     }
//   }