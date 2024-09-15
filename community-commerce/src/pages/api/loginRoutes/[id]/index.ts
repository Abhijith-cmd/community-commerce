import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnection from '../../../../lib/DbConnection/DbConnection';
import * as userController from '../../../../controllers/loginController/userCredentialsController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnection(); // Ensure the database connection is established
  
    switch (req.method) {
      case 'GET':
        // Handle GET request for a specific user by ID
        await userController.getUserById(req, res);
        break;
      case 'PUT':
        // Handle PUT request to update a specific user by ID
        await userController.updateUser(req, res);
        break;
      case 'DELETE':
        // Handle DELETE request to remove a specific user by ID
        await userController.deleteUser(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }