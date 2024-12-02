// // src/middleware.ts
// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import { verifyToken } from '../utils/jwtUtils';
// import { getTokenFromDB } from '../utils/dbUtils';

// // main function
// export async function middleware(req: NextRequest) {
//   // Get the token from the Authorization header
//   const authHeader = req.headers.get('Authorization');
//   const token = authHeader ? authHeader.split(' ')[1] : null; // Assuming Bearer token format

//   try {
//     if (token) {
//       // Fetch token from the database to ensure it's valid
//       const tokenFromDB = await getTokenFromDB(token);
  
//       if (tokenFromDB) {
//         // Verify the token (checks signature and expiration)
//         verifyToken(token);
//         return NextResponse.next(); // Allow access to protected routes
//       } else {
//         // Redirect to login if token is not found in DB
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//     } else {
//       // Redirect to login if no token is present
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   } catch (err) {
//     // Handle any errors during token verification
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }


//second function
// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import { verifyToken } from '../utils/jwtUtils';
// import { getTokenFromDB } from '../utils/dbUtils';
// import { getSession } from 'next-auth/react';
// import type { NextApiRequest } from 'next';

// // main function
// export async function middleware(req: NextRequest) {
//   // Get the token from the Authorization header
//   const authHeader = req.headers.get('Authorization');
//   const token = authHeader ? authHeader.split(' ')[1] : null; // Assuming Bearer token format

//   try {
//     if (token) {
//       // Fetch token from the database to ensure it's valid
//       const tokenFromDB = await getTokenFromDB(token);
      
//       if (tokenFromDB) {
//         // Verify the token (checks signature and expiration)
//         verifyToken(token);
        
//         // Optionally, check for an active session in NextAuth
//         const session = await getSession({ req });
//         if (session) {
//           return NextResponse.next(); // Allow access to protected routes
//         } else {
//           // Redirect to login if no active session found
//           return NextResponse.redirect(new URL('/login', req.url));
//         }
//       } else {
//         // Redirect to login if token is not found in DB
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//     } else {
//       // Redirect to login if no token is present
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   } catch (err) {
//     // Handle any errors during token verification
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }


//third function
// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import { verifyToken } from '../utils/jwtUtils';
// import { getTokenFromDB } from '../utils/dbUtils';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req: NextRequest) {
//   // Get the token from the Authorization header
//   const authHeader = req.headers.get('Authorization');
//   const token = authHeader ? authHeader.split(' ')[1] : null; // Assuming Bearer token format

//   try {
//     if (token) {
//       // Fetch token from the database to ensure it's valid
//       const tokenFromDB = await getTokenFromDB(token);
      
//       if (tokenFromDB) {
//         // Verify the token (checks signature and expiration)
//         const verifiedToken = await verifyToken(token);
        
//         // Check if session is valid
//         const session = await getToken({ req }); // Get session token
//         if (session) {
//           return NextResponse.next(); // Allow access to protected routes
//         } else {
//           // Redirect to login if no active session found
//           return NextResponse.redirect(new URL('/login', req.url));
//         }
//       } else {
//         // Redirect to login if token is not found in DB
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//     } else {
//       // Redirect to login if no token is present
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   } catch (err) {
//     // Handle any errors during token verification
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }


//fourth  function
// src/middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyToken } from '../utils/jwtUtils'; // Your token verification utility
import { getTokenFromDB } from '../utils/dbUtils'; // Your DB utility to get tokens
import { getToken } from 'next-auth/jwt'; // Get token from NextAuth

export async function middleware(req: NextRequest) {
  // Get the token from the Authorization header
  const authHeader = req.headers.get('Authorization');
  const token = authHeader ? authHeader.split(' ')[1] : null; // Assuming Bearer token format

  try {
    // Check if the token exists
    if (token) {
      // Fetch token from the database to ensure it's valid
      const tokenFromDB = await getTokenFromDB(token);
      
      if (tokenFromDB) {
        // Verify the token (checks signature and expiration)
        await verifyToken(token); // Make sure this returns without throwing an error
        
        // Check for a valid session in NextAuth
        const session = await getToken({ req });
        
        if (session) {
          return NextResponse.next(); // Allow access to protected routes
        } else {
          // Redirect to login if no active session found
          return NextResponse.redirect(new URL('/login', req.url));
        }
      } else {
        // Redirect to login if token is not found in DB
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } else {
      // Redirect to login if no token is present
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } catch (err) {
    // Handle any errors during token verification
    console.error('Middleware error:', err); // Log the error for debugging
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Apply the middleware to specific routes
export const config = {
  matcher: ['/home', '/protected-route'], // Define the routes to protect
};
