import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'
dotenv.config()

// const client = new MongoClient(process.env.MONGODB_URI as string); // Ensure the URI is defined

// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable to avoid repeated instantiation
//   if (!global._mongoClientPromise) {
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, use the MongoClient instance directly
//   clientPromise = client.connect();
// }

// export default clientPromise;

// Ensure that your MongoDB URI is defined in your .env file
const uri: string = process.env.MONGODB_URI as string;

// Create a new MongoClient
const client = new MongoClient(uri);

// Export a promise that resolves to the MongoClient
export const mongoClientPromise = client.connect();