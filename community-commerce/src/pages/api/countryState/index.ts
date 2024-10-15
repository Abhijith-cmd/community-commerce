import type { NextApiRequest, NextApiResponse } from 'next';
import CountryState from '../../../models/countryStateModel/countryStateModel';
import dbConnection from '../../../lib/DbConnection/DbConnection';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnection();
 
  try {
    const { country } = req.query;
 
    // If a country is specified, return states for that country
    if (country) {
      const countryState = await CountryState.findOne({ country });
      if (countryState) {
        return res.status(200).json({ states: countryState.states });
      } else {
        return res.status(404).json({ message: 'Country not found' });
      }
    }
 
    // Otherwise, return all countries
    const countries = await CountryState.find().select('country');
    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
}
 