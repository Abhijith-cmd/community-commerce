import dbConnection from '../lib/DbConnection/DbConnection';
import UserCredentials from '@/models/loginModel/userCredentials';
import dotenv from 'dotenv'

dotenv.config()



// export const getTokenFromDB = async (token: string) => {
//   await dbConnection(); // Ensure DB connection
//   return TokenModel.findOne({ token }).exec();
// };


//new function with error logging
// export const getTokenFromDB = async (token: string) => {
//   await dbConnection(); // Ensure DB connection
//   console.log('Searching for token:', token); // Log the token being searched
//   const tokenRecord = await TokenModel.findOne({ token }).exec();
//   console.log('Found token record:', tokenRecord); // Log the result of the search
//   return tokenRecord;
// };

//main
// export const getTokenFromDB = async (token: string) => {
//   await dbConnection(); // Ensure DB connection
//   console.log('Searching for token:', token); // Log the token being searched
  
//   const userRecord = await UserCredentials.findOne({ 'tokens': token }).exec();
  
//   console.log('Found user record with token:', userRecord); // Log the result of the search
//   return userRecord; // Return the user record instead of the token
// };


///
export const getTokenFromDB = async (token: string) => {
  await dbConnection(); // Ensure DB connection
  console.log('Searching for token:', token); // Log the token being searched
  
  const userRecord = await UserCredentials.findOne({ tokens: token }).exec(); // Updated query
  
  console.log('Found user record with token:', userRecord); // Log the result of the search
  return userRecord; // Return the user record
};

