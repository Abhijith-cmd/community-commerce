import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient: Connection | null = null;

const dbConnection = async (): Promise<Connection> => {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = await mongoose.connect(MONGODB_URI, {
    });

    console.log("Database Connection established Successfully");
    cachedClient = client.connection;
    return cachedClient;
  } catch (err) {
    console.error("Database Connection Error", err);
    throw err;
  }
};

export default dbConnection;
