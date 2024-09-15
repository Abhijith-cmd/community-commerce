import type { NextApiRequest, NextApiResponse } from 'next';
import { validateLogin } from '../../../controllers/loginValidationController/loginValidationController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Use the validateLogin controller function to handle the request
    return validateLogin(req, res);
}
