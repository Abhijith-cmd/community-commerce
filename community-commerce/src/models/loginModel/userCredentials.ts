// import { Schema,Mongoose, model, Document } from 'mongoose';
import mongoose, { Schema, Document } from 'mongoose';

// interface IUserCredentials extends Document {
//   username: string;
//   password: string;
//   status: boolean; // Change status to boolean
// }

// // Define the schema for user credentials
// const userCredentialsSchema = new Schema<IUserCredentials>({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: Boolean,
//     required: true,
//     default: true // Default to `true` (active)
//   }
// }, { timestamps: true }); // This will automatically add `createdAt` and `updatedAt` timestamps

// // Create the model from the schema, with an explicit collection name
// const UserCredentials = model<IUserCredentials>('UserCredentials', userCredentialsSchema, 'user_credentials');

// export default UserCredentials;

interface IUserCredentials extends Document {
    username: string;
    password: string;
    status: boolean;
  }
  
  // Define the schema for user credentials with a specific collection name
  const userCredentialsSchema = new Schema<IUserCredentials>({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true,
      default: true
    }
  }, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
    collection: 'user_credentials' // Specify the collection name
  });
  
  // Singleton pattern to avoid multiple model definitions
  let UserCredentials: mongoose.Model<IUserCredentials>;
  
  // Check if the model already exists in Mongoose
  if (mongoose.models.UserCredentials) {
    UserCredentials = mongoose.models.UserCredentials;
  } else {
    UserCredentials = mongoose.model<IUserCredentials>('UserCredentials', userCredentialsSchema);
  }
  
  export default UserCredentials;