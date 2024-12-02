"use client";
import React, {useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Image from 'next/image';
import axios from 'axios';


interface Product {
    _id: string;
    name: string;
    primaryCategory: string;
    subCategory: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    currency: string;
    images: { url: string; altText: string; color: string }[];
    colors: { colorName: string; price: number; inventory: number,  _id: string; }[];
    material: string;
    brand: string;
    available: boolean;
    isOnSale: boolean;
    salePrice?: number;
    tags: string[];
    rating: number;
    inventory: number;
}

// interface Category {
//     _id: string;
//     category: Product[];
// }



export default function ProtectedPdpPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { token } = useAuth() // Use the token from AuthContext
  const { setToken } = useAuth();

  

  const [userId, setUserId] = useState<string | null>(null); // State to store userId
  // const [username, setUsername] = useState<string>(''); // To store the username
  // const [firstName, setFirstName] = useState<string>(''); // To store the username
  // const [lastName, setLastName] = useState<string>(''); // To store the username
  const [fullname, setFullName] = useState<string>('');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/'); // Redirect to homepage or login page if not authenticated
    }
  }, [isAuthenticated, router]);

  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

//   const handleNavigation = (path: string) => {
//     router.push(path);
//   };


  useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(
            `/api/productsBasedOnIdRoutes/${id}`
          );
          setProduct(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product details:', error);
          setLoading(false);
        }
      };
  
      fetchProductDetails();
    }, [id]);

    useEffect(() => {
        const fetchProtectedData = async () => {
          if (!token) return;
    
          try {
            const response = await axios.get('/api/protectedRoutes', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            const { user } = response.data; // Extract user from the response
            if (user && user.userId) {
              setUserId(user.userId); // Store userId in state
              console.log(user.userId);
              console.log("the user ID the value for user Id", userId);
              console.log(setToken,fullname);
              
            }
            console.log('Protected Data:', response.data);
          } catch (error) {
            console.error('Error fetching protected data:', error);
          }
        };
    
        fetchProtectedData();
      }, [token, userId]);
    
      useEffect(() => {
        console.log("user ID verification here");
    
        if (!userId) return; // Don't fetch if userId is not set yet
        console.log("user ID verification DONE");
    
        const fetchUsername = async () => {
          try {
            console.log("Fetching username for userId:", userId);
            const userResponse = await axios.get(`/api/loginRoutes/${userId}`);
            // setUsername(userResponse.data.username); // Assuming the API returns a 'username' field
            console.log(userResponse.data.username, "the data for fetch username");
            // setFirstName(userResponse.data.firstName); 
            // setLastName(userResponse.data.lastName); 
            setFullName(`${userResponse.data.firstName} ${userResponse.data.lastName}`); 
            console.log(userResponse.data.address.country,"the name of the user's country");
            
    
          } catch (error) {
            console.error('Error fetching username:', error);
          }
        };
    
        fetchUsername();
      }, [userId]);


  const handleAddToCart = async () => {
    if (!userId || !product) return;

    const colorToAdd =  product.colors[0]?.colorName;

    try {
      await axios.post(
        '/api/CartRoutes',
        {
          userId,
          productId: product._id,
          productName: product.name,
          productPrice: product.price,
          productColor: colorToAdd,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      router.push('/cartPageForAuthenticated');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
    if (loading) {
      return <div>Loading product details...</div>;
    }
  
    if (!product) {
      return <div>Product not found</div>;
    }

  if (!id) {
    return <div>Loading...</div>; // Loading state if id is missing
  }

      // Render the component
      // if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Display the protected content only if authenticated */}
      {isAuthenticated && (
       <div className="container mx-auto px-4 py-10">
       <div className="flex flex-col lg:flex-row gap-8">
         {/* Image Gallery */}
         <div className="flex-1">
           {/* <div className="flex justify-center mb-4">
             {product.images.map((image, index) => (
               <Image
                 key={index}
                 src={image.url}
                 alt={image.altText}
                 width={500}
                 height={500}
                 layout="responsive"
                 className="rounded-lg shadow-lg"
               />
             ))}
           </div> */}
           {product.images && product.images.length > 0 && (
  <div className="flex justify-center mb-4">
    {product.images.map((image, index) => (
      <Image
        key={index}
        src={image.url}
        alt={image.altText}
        width={500}
        height={500}
        layout="responsive"
        className="rounded-lg shadow-lg"
      />
    ))}
  </div>
)}
         </div>
   
         {/* Product Info */}
         <div className="flex-1">
           <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
           {/* <h2 className="text-xl text-gray-600 mb-4">
             {product.primaryCategory} - {product.subCategory}
           </h2> */}
           <p className="text-lg font-medium text-gray-800 mb-6">{product.shortDescription}</p>
           <p className="text-sm text-gray-600 mb-6">{product.longDescription}</p>
   
           {/* Pricing */}
           <div className="flex items-center mb-6">
             <span className="text-2xl font-semibold text-green-600">
               {product.currency} {product.price.toFixed(2)}
             </span>
             {/* {product.isOnSale && (
               <span className="ml-4 text-lg text-red-600 line-through">
                 Sale Price: {product.currency} {product.salePrice?.toFixed(2)}
               </span>
             )} */}
           </div>
   
           {/* Color Options */}
           {product.colors.length > 0 && (
             <div className="mb-6">
               <h3 className="text-lg font-semibold mb-2">Available Colors:</h3>
               <ul className="flex space-x-4">
                 {product.colors.map((color) => (
                   <li
                     key={color._id}
                     className={`w-10 h-10 rounded-full border cursor-pointer ${
                       color.colorName === selectedColor ? 'border-blue-500' : 'border-gray-300'
                     }`}
                     style={{ backgroundColor: color.colorName }}
                     onClick={() => setSelectedColor(color.colorName)}
                   ></li>
                 ))}
               </ul>
             </div>
           )}
   
           {/* Tags */}
           <div className="mb-6">
             <h3 className="text-lg font-semibold mb-2">Tags:</h3>
             <ul className="flex space-x-2">
               {product.tags.map((tag, index) => (
                 <li
                   key={index}
                   className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full"
                 >
                   {tag}
                 </li>
               ))}
             </ul>
           </div>
   
           {/* Add to Cart Button */}
           <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"  onClick={handleAddToCart}>
             Add to Cart
           </button>
         </div>
       </div>
     </div>
      )}
    </div>
  );
}
