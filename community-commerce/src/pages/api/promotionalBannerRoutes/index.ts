import { getPromotionalBanners, createPromotionalBanner } from '../../../controllers/promotionalBannerController/promotionalBannerController';
import type { NextApiRequest, NextApiResponse } from 'next';


// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     return getPromotionalBanners(req, res);
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      return getPromotionalBanners(req, res); // Handles fetching promotional banners
    } else if (req.method === 'POST') {
      return createPromotionalBanner(req, res); // Handles creating a new promotional banner
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }