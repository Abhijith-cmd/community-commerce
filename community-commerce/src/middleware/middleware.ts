// src/middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verifyToken } from '../utils/jwtUtils';
import { getTokenFromDB } from '../utils/dbUtils';

// export async function middleware(req: NextRequest) {
//     const tokenCookie = req.cookies.get('token');
//     const token = tokenCookie ? tokenCookie.value : null;
  
//     try {
//       if (token) {
//         verifyToken(token);
//         return NextResponse.next(); // Allow access
//       } else {
//         // Redirect to login if not authenticated
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//     } catch (err) {
//       // Handle token verification errors
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

// export async function middleware(req: NextRequest) {
//     const tokenCookie = req.cookies.get('token');
//     const token = tokenCookie ? tokenCookie.value : null;
  
//     try {
//       if (token) {
//         const tokenFromDB = await getTokenFromDB(token);
  
//         if (tokenFromDB) {
//           verifyToken(token);
//           return NextResponse.next(); // Allow access
//         } else {
//           // Redirect to login if token not found in DB
//           return NextResponse.redirect(new URL('/login', req.url));
//         }
//       } else {
//         // Redirect to login if no token
//         return NextResponse.redirect(new URL('/login', req.url));
//       }
//     } catch (err) {
//       // Handle token verification errors
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }


// main function
export async function middleware(req: NextRequest) {
  // Get the token from the Authorization header
  const authHeader = req.headers.get('Authorization');
  const token = authHeader ? authHeader.split(' ')[1] : null; // Assuming Bearer token format

  try {
    if (token) {
      // Fetch token from the database to ensure it's valid
      const tokenFromDB = await getTokenFromDB(token);
  
      if (tokenFromDB) {
        // Verify the token (checks signature and expiration)
        verifyToken(token);
        return NextResponse.next(); // Allow access to protected routes
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
    return NextResponse.redirect(new URL('/login', req.url));
  }
}