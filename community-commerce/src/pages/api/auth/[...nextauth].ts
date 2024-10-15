// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import dbConnection from '../../../lib/DbConnection/DbConnection'; // Your existing DB connection
// import bcrypt from 'bcrypt';
// import UserCredentials from '../../../models/loginModel/userCredentials'; // Your user model
// import dotenv from 'dotenv'
// dotenv.config()

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: "Email", type: "text", placeholder: "email@example.com" },
//         password: { label: "Password", type: "password" }
//       },
//     //   authorize: async (credentials) => {
//     //     // Ensure DB connection
//     //     await dbConnection();
        
//     //     // Find user by username (email)
//     //     const user = await UserCredentials.findOne({ username: credentials?.username });
//     //     if (!user) {
//     //       throw new Error("No user found");
//     //     }

//     //     // Check the password
//     //     const isValidPassword = await bcrypt.compare(credentials?.password as string, user.password);
//     //     if (!isValidPassword) {
//     //       throw new Error("Invalid credentials");
//     //     }

//     //     // If credentials are valid, return the user object
//     //     return {
//     //       id: user._id,
//     //       name: user.firstName + " " + user.lastName,
//     //       email: user.username,
//     //     };
//     //   }
//     authorize: async (credentials) => {
//         console.log("Attempting to authorize:", credentials);
    
//         await dbConnection();
    
//         const user = await UserCredentials.findOne({ username: credentials?.username });
//         console.log("User found:", user);
    
//         if (!user) {
//             console.error("No user found");
//             throw new Error("No user found");
//         }
    
//         const isValidPassword = await bcrypt.compare(credentials?.password as string, user.password);
//         console.log("Password valid:", isValidPassword);
    
//         if (!isValidPassword) {
//             console.error("Invalid credentials");
//             throw new Error("Invalid credentials");
//         }
    
//         return {
//             id: user._id,
//             name: user.firstName + " " + user.lastName,
//             email: user.username,
//         };
//     }
    
//     })
//   ],
//   session: {
//     strategy: 'jwt', // Store sessions in JWT by default (more scalable)
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET, // Set up your JWT secret in environment variables
//   },
// //   callbacks: {
// //     async session({ session, token }) {
// //       // Attach the user ID to the session
// //       session.user.id = token.sub as string;
// //       return session;
// //     },
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.sub = user.id; // Attach the user ID to the JWT token
// //       }
// //       return token;
// //     },
// //   }
// callbacks: {
//     async signIn({ user, account, profile }) {
//         console.log("Sign In Callback: ", user);
//         return true; // Return true to allow sign-in
//     },
//     async session({ session, token }) {
//         console.log("Session Callback: ", session, token);
//         session.user.id = token.sub as string;
//         return session;
//     },
//     async jwt({ token, user }) {
//         if (user) {
//             token.sub = user.id;
//         }
//         return token;
//     },
// }
// ,
//   pages: {
//     signIn: '/app/loginPage/page.tsx', // You can define a custom sign-in page here
//   }
// });


//another function including mongo-client
// import NextAuth, { AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import dbConnection from '../../../lib/DbConnection/DbConnection'; // Your existing DB connection
// import bcrypt from 'bcrypt';
// import UserCredentials from '../../../models/loginModel/userCredentials'; // Your user model
// import dotenv from 'dotenv';
// import connectMongo from 'connect-mongo'; // Import connect-mongo
// import mongoose from 'mongoose'; // For MongoDB connection
// dotenv.config()

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: "Email", type: "text", placeholder: "email@example.com" },
//         password: { label: "Password", type: "password" }
//       },
//       authorize: async (credentials) => {
//         console.log("Attempting to authorize:", credentials);

//         await dbConnection();

//         const user = await UserCredentials.findOne({ username: credentials?.username });
//         console.log("User found:", user);

//         if (!user) {
//             console.error("No user found");
//             throw new Error("No user found");
//         }

//         const isValidPassword = await bcrypt.compare(credentials?.password as string, user.password);
//         console.log("Password valid:", isValidPassword);

//         if (!isValidPassword) {
//             console.error("Invalid credentials");
//             throw new Error("Invalid credentials");
//         }

//         return {
//             id: user._id,
//             name: user.firstName + " " + user.lastName,
//             email: user.username,
//         };
//       }
//     })
//   ],
//   session: {
//     strategy: 'database', // Use 'database' strategy for storing sessions in MongoDB
//     maxAge: 30 * 24 * 60 * 60, // Set session expiry (30 days)
//     store: connectMongo.create({
//       mongoUrl: process.env.MONGODB_URI, // Your MongoDB connection string
//       ttl: 14 * 24 * 60 * 60, // Expiry time for sessions in seconds (e.g., 14 days)
//       autoRemove: 'native', // Automatically remove expired sessions
//     }),
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET, // Set up your JWT secret in environment variables
//   },
//   callbacks: {
//     async signIn({ user, account, profile }) {
//         console.log("Sign In Callback: ", user);
//         return true; // Return true to allow sign-in
//     },
//     async session({ session, token }) {
//         console.log("Session Callback: ", session, token);
//         session.user.id = token.sub as string;
//         return session;
//     },
//     async jwt({ token, user }) {
//         if (user) {
//             token.sub = user.id




//another function(3)
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import connectMongo from 'connect-mongo';
// import dbConnection from '../../../lib/DbConnection/DbConnection'; // Your existing DB connection
// import bcrypt from 'bcrypt';
// import UserCredentials from '../../../models/loginModel/userCredentials'; // Your user model
// import dotenv from 'dotenv';

// dotenv.config();

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         try {
//           // Ensure DB connection
//           await dbConnection();

//           // Find user by username (email)
//           const user = await UserCredentials.findOne({ username: credentials?.username });
//           if (!user) {
//             return null; // Return null if no user is found
//           }

//           // Check the password
//           const isValidPassword = await bcrypt.compare(credentials?.password as string, user.password);
//           if (!isValidPassword) {
//             return null; // Return null if password is invalid
//           }

//           // If credentials are valid, return the user object
//           return {
//             id: user._id,
//             name: user.firstName + " " + user.lastName,
//             email: user.username,
//           };
//         } catch (error) {
//           console.error("Error during user authorization:", error);
//           return null; // Return null if any error occurs
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: 'database', // Use "database" strategy for session storage
//     store: connectMongo.create({
//       mongoUrl: process.env.MONGODB_URI, // Your MongoDB URI
//     }),
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET, // Define the JWT secret
//   },
//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.sub as string;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.sub = user.id; // Attach user ID to token
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: '/app/loginPage/page.tsx', // Custom sign-in page
//   },
// });


//another function(4)
// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import dbConnection from '../../../lib/DbConnection/DbConnection'; // Your existing DB connection
// import bcrypt from 'bcrypt';
// import UserCredentials from '../../../models/loginModel/userCredentials'; // Your user model
// import clientPromise from '../../../lib/mongodb'; // Your MongoDB client promise
// import dotenv from 'dotenv';

// dotenv.config();

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         try {
//           // Ensure DB connection
//           await dbConnection();

//           // Find user by username (email)
//           const user = await UserCredentials.findOne({ username: credentials?.username });
//           if (!user) {
//             return null; // Return null if no user is found
//           }

//           // Check the password
//           const isValidPassword = await bcrypt.compare(credentials?.password as string, user.password);
//           if (!isValidPassword) {
//             return null; // Return null if password is invalid
//           }

//           // If credentials are valid, return the user object
//           return {
//             id: user._id,
//             name: user.firstName + " " + user.lastName,
//             email: user.username,
//           };
//         } catch (error) {
//           console.error("Error during user authorization:", error);
//           return null; // Return null if any error occurs
//         }
//       },
//     }),
//   ],
//   adapter: MongoDBAdapter(clientPromise), // Use MongoDB adapter for session management
//   session: {
//     strategy: 'database', // Use "database" strategy for session storage
//   },
//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.sub as string;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.sub = user.id; // Attach user ID to token
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: '/app/loginPage/page.tsx', // Custom sign-in page
//   },
// });



//another function(5)
// import NextAuth, { AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import { mongoClientPromise } from '../../../lib/mongodb';

// import bcrypt from 'bcrypt';
// import UserCredentials from '../../../models/loginModel/userCredentials'; // Your user model
// import dotenv from 'dotenv';

// dotenv.config();

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         try {
//           // Ensure DB connection
//           const client = await mongoClientPromise; // Ensure you're connecting to the DB
//           const db = client.db(); // Get the DB instance

//           // Find user by username (email)
//           const user = await UserCredentials.findOne({ username: credentials?.username });
//           if (!user) {
//             return null; // Return null if no user is found
//           }

//           // Check the password
//           const isValidPassword = await bcrypt.compare(credentials?.password as string, user.password);
//           if (!isValidPassword) {
//             return null; // Return null if password is invalid
//           }

//           // If credentials are valid, return the user object
//           return {
//             id: user._id,
//             name: user.firstName + " " + user.lastName,
//             email: user.username,
//           };
//         } catch (error) {
//           console.error("Error during user authorization:", error);
//           return null; // Return null if any error occurs
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: 'database', // Use "database" strategy for session storage
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   adapter: MongoDBAdapter(mongoClientPromise), // Use the MongoDB adapter
//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.sub as string;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.sub = user.id; // Attach user ID to token
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: '/app/loginPage/page.tsx', // Custom sign-in page
//   },
// };

// export default NextAuth(authOptions);


//another function(6)
// import NextAuth, { AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import { mongoClientPromise } from '../../../lib/mongodb';

// import bcrypt from 'bcrypt';
// import UserCredentials from '../../../models/loginModel/userCredentials'; // Your user model
// import dotenv from 'dotenv';

// dotenv.config();

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         try {
//           // Ensure DB connection
//         //   const client = await mongoClientPromise; // Ensure you're connecting to the DB
//         //   const db = client.db(); // Get the DB instance

//           // Find user by username (email)
//           const user = await UserCredentials.findOne({ username: credentials?.username });
//           if (!user) {
//             return null; // Return null if no user is found
//           }

//           // Check the password
//           const isValidPassword = await bcrypt.compare(credentials?.password as string, user.password);
//           if (!isValidPassword) {
//             return null; // Return null if password is invalid
//           }

//           // If credentials are valid, return the user object
//           return {
//             id: user._id,
//             name: user.firstName + " " + user.lastName,
//             email: user.username,
//           };
//         } catch (error) {
//           console.error("Error during user authorization:", error);
//           return null; // Return null if any error occurs
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: 'database', // Use "database" strategy for session storage
//     maxAge: 30 * 24 * 60 * 60, // Session duration
//   },
//   adapter: MongoDBAdapter(mongoClientPromise), // Use the MongoDB adapter
//   callbacks: {
//     // async session({ session, token }) {
//     //   session.user.id = token.sub as string;
//     //   return session;
//     // },
//     // async jwt({ token, user }) {
//     //   if (user) {
//     //     token.sub = user.id; // Attach user ID to token
//     //   }
//     //   return token;
//     // },
//     async session({ session, token }) {
//         session.user.id = token.sub as string;
//         return session;
//       },
      
//       async jwt({ token, user }) {
//         if (user) {
//           token.sub = user.id; // Attach user ID to token
//         }
//         return token;
//       }
      
//   },
//   cookies: {
//     sessionToken: {
//       name: `__Secure-next-auth.session-token`, // Cookie name
//       options: {
//         httpOnly: true, // Prevent JavaScript access to the cookie
//         sameSite: 'lax', // Controls when cookies are sent
//         path: '/', // Cookie path
//         secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//       },
//     },
//   },
//   pages: {
//     signIn: '/app/loginPage/page.tsx', // Custom sign-in page
//   },
// };

// export default NextAuth(authOptions);
