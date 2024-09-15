import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnection from '../../../lib/DbConnection/DbConnection';
import * as userController from '../../../controllers/loginController/userCredentialsController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection(); // Ensure the database connection is established

  switch (req.method) {
    case 'GET':
      // Handle GET request for all users
      await userController.getAllUsers(req, res);
      break;
    case 'POST':
      // Handle POST request to create a new user
      await userController.createUser(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
