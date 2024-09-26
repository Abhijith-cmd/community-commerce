import type { NextApiRequest, NextApiResponse } from 'next';
import { logout } from '../../../controllers/logoutController/logoutController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await logout(req, res);
}
