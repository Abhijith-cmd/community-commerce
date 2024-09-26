// import { Schema,Mongoose, model, Document } from 'mongoose';
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt'

//main function
// interface IUserCredentials extends Document {
//     username: string;
//     password: string;
//     status: boolean;
//   }
  
//   // Define the schema for user credentials with a specific collection name
//   const userCredentialsSchema = new Schema<IUserCredentials>({
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true
//     },
//     password: {
//       type: String,
//       required: true
//     },
//     status: {
//       type: Boolean,
//       required: true,
//       default: true
//     }
//   }, {
//     timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
//     collection: 'user_credentials' // Specify the collection name
//   });
  
//   // Singleton pattern to avoid multiple model definitions
//   let UserCredentials: mongoose.Model<IUserCredentials>;
  
//   // Check if the model already exists in Mongoose
//   if (mongoose.models.UserCredentials) {
//     UserCredentials = mongoose.models.UserCredentials;
//   } else {
//     UserCredentials = mongoose.model<IUserCredentials>('UserCredentials', userCredentialsSchema);
//   }
  
//   export default UserCredentials;

//model included with token (main function till on 23-09-2024)

// interface IUserCredentials extends Document {
//   username: string;
//   password: string;
//   status: boolean;
//   tokens?: string[]; // Add tokens field
// }

// // Define the schema for user credentials with a specific collection name
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
//     default: true
//   },
//   tokens: [String] // Tokens field
// }, {
//   timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
//   collection: 'user_credentials' // Specify the collection name
// });

// // Hash the password before saving
// userCredentialsSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// // Singleton pattern to avoid multiple model definitions
// const UserCredentials = mongoose.models.UserCredentials || mongoose.model<IUserCredentials>('UserCredentials', userCredentialsSchema);

// export default UserCredentials;

//next function after 23-09-2024 for including all the details of the username
// Define the interface for user credentials
interface IUserCredentials extends Document {
  firstName: string;
  lastName: string;
  username: string; // This will be the email ID
  password: string;
  status: boolean;
  address: {
    line1: string;
    line2?: string; // Optional field
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  locality: string;
  community: string;
  preferredLanguage: string;
  phoneNumber: string;
  tokens?: string[]; // Optional tokens field
}

// Define the schema for user credentials
const userCredentialsSchema = new Schema<IUserCredentials>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  address: {
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  locality: {
    type: String,
    required: true,
  },
  community: {
    type: String,
    required: true,
  },
  preferredLanguage: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  tokens: [String], // Optional tokens field
}, {
  timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
  collection: 'user_credentials', // Specify the collection name
});

// // Hash the password before saving
// userCredentialsSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// // Singleton pattern to avoid multiple model definitions
// const UserCredentials = mongoose.models.UserCredentials || mongoose.model<IUserCredentials>('UserCredentials', userCredentialsSchema);

// export default UserCredentials;

// userCredentialsSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//       this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
//   });

userCredentialsSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

  // Singleton pattern to avoid multiple model definitions
  const UserCredentials = mongoose.models.UserCredentials || mongoose.model<IUserCredentials>('UserCredentials', userCredentialsSchema);
  
  export default UserCredentials;