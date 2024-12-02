"use client";
import React from 'react';
import { useRouter } from 'next/navigation';



export default function CartPage() {
 const router = useRouter();

 const handleNavigation = (path: string) => {
      router.push(path);
    };

 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Shopping Cart</h1>
      <p className="text-lg text-center mb-6">
        You are currently viewing your cart as a guest. 
        <br />
        To save your cart for later, please log in or sign up.
      </p>

      <div className="flex flex-col gap-4">
        <button 
          onClick={() => handleNavigation('/')} 
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-center"
        >
          Log In
        </button>
        <button 
          onClick={() => handleNavigation('/signUpPage')} 
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition text-center"
        >
          Sign Up
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">Continue shopping to add items to your cart!</p>
        <button 
          onClick={() => handleNavigation('/shop')} 
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Go to Shop
        </button>
      </div>
    </div>
  </div>
  );
}
