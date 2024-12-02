"use client";
import React, { useEffect,useRef,useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './styles.css'
import Image from 'next/image';

interface cartItemNumber{
    itemCount:number
  }
  

interface MenuItem {
    _id: string;
    name: string;
    sections?: {
        [key: string]: string[]; // Each key can have an array of strings
    };
}

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
    colors: { colorName: string; price: number; inventory: number }[];
    material: string;
    brand: string;
    available: boolean;
    isOnSale: boolean;
    salePrice?: number;
    tags: string[];
    rating: number;
    inventory: number;
}

interface Category {
    _id: string;
    category: Product[];
}

export default function ProtectedShopPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { token } = useAuth() // Use the token from AuthContext
  const { setToken } = useAuth();

  const [userId, setUserId] = useState<string | null>(null); // State to store userId
  // const [username, setUsername] = useState<string>(''); // To store the username
  // const [firstName, setFirstName] = useState<string>(''); // To store the username
  // const [lastName, setLastName] = useState<string>(''); // To store the username
  const [fullname, setFullName] = useState<string>('');

//For Cart Item Count
  const [cartItemNumber,setCartItemNumber] = useState<cartItemNumber>({ itemCount: 0 })

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/'); // Redirect to homepage or login page if not authenticated
    }
  }, [isAuthenticated, router]);

  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  //for error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //shop Menu Items
  const [shopMenuItems, setShopMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown

  //for filtering with price
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

//   const router = useRouter();

  // Function to handle dropdown toggle
  const toggleDropdown = (id: string) => {
      setOpenDropdown(openDropdown === id ? null : id); // Toggle the dropdown
      console.log(setToken,fullname);
      
  };

  // Fetch menu items from the API
  useEffect(() => {
      const fetchMenuItems = async () => {
          try {
              const response = await fetch('/api/MenuListRoutes');
              const data = await response.json();
              const menuNames = data.map((item: { name: string }) => item.name); // Extract names from the data
              console.log(menuItems);

              setMenuItems(menuNames);
          } catch (error) {
              console.error('Error fetching menu items:', error);
          }
      };

      fetchMenuItems();
  }, []);

  // Function to handle click and navigate to a specific page
  const handleNavigation = (path: string) => {
      router.push(path);
  };

  useEffect(() => {
      const fetcShopMenuItems = async () => {
          try {
              const response = await axios.get('/api/ShopMenuItemCategoriesRoutes');
              setShopMenuItems(response.data); // Assuming your API returns an array of menu items
              console.log("the shop categories data", response.data)
          } catch (err) {

              console.error(err);
          } finally {
              setLoading(false);
          }
      };

      fetcShopMenuItems();
  }, []);

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await fetch("/api/CategoryRoutes");
              const data = await response.json();

              if (data.success && data.categories.length > 0) {
                  const allProducts: Product[] = data.categories.flatMap((category: Category) => category.category);
                  setProducts(allProducts);
                  setFilteredProducts(allProducts);
              } else {
                  console.log("Failed to load products.");
              }
          } catch (error) {
              console.log("Error fetching data.");
          } finally {
              setLoading(false);
          }
      };

      fetchProducts();
  }, []);

  // Function to handle price filter
  const applyPriceFilter = () => {

      if (minPrice !== undefined && maxPrice !== undefined) {
          if (minPrice === maxPrice) {
              setErrorMessage("Minimum price cannot be equal to maximum price.");
              return;
          }
          if (minPrice > maxPrice) {
              setErrorMessage("Minimum price cannot be greater than maximum price.");
              return;
          }
      }
  
  
      setErrorMessage(null); // Reset error message if no error is found

      const filtered = products.filter((product) => {
          // const productPrice = product.isOnSale ? product.salePrice || product.price : product.price;
          const productPrice = product.price;
          const meetsMinPrice = minPrice === undefined || productPrice >= minPrice;
          const meetsMaxPrice = maxPrice === undefined || productPrice <= maxPrice;
          return meetsMinPrice && meetsMaxPrice;
      });

      setFilteredProducts(filtered);
  };

  // Reset price filter
  const resetFilter = () => {
      if(errorMessage){
          setErrorMessage(null);
      }
      setMinPrice(undefined);
      setMaxPrice(undefined);
      setFilteredProducts(products);
  };

   // Handle the keydown and keyup events to block 'e' and negative values
   const handleKeyDown = (e: React.KeyboardEvent) => {
      const isArrowKey = e.key === 'ArrowUp' || e.key === 'ArrowDown';
      if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '.') {
          e.preventDefault();
      }

      if (isArrowKey) {
          e.preventDefault();
      }
  };

  // Prevent scrolling (both mouse and keyboard)
  const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault();
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setPrice: React.Dispatch<React.SetStateAction<number | undefined>>) => {
  //     const value = e.target.value;
  //     if (value === '' || /^[0-9]*$/.test(value)) {
  //         setPrice(value === '' ? undefined : parseFloat(value));
  //     }
  // };


  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
              setOpenDropdown(null); // Close dropdown when clicking outside
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

  const handleProductNavigation = (productId: string) => {
      router.push(`/pdpPageForAuthenticated/${productId}`);
  };

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

//   useEffect(() => {
//     if (!userId) return; // Ensure userId is available before making the call

//     let intervalId: NodeJS.Timeout | null = null;

//     const fetchCartItemCount = async () => {
//       try {
//         const response = await axios.get(
//           `/api/CartItemCounterRoutes/?userId=${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const fetchedItemCount = response.data.itemCount;
//         setCartItemNumber({ itemCount: fetchedItemCount });
//       } catch (error) {
//         console.error('Error fetching cart item count:', error);
//         // Optionally handle error state here
//       }
//     };

//     // Start polling every 5 seconds
//     intervalId = setInterval(() => {
//       fetchCartItemCount();
//     }, 100);

//     // Cleanup interval on unmount
//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [userId, token]);


useEffect(() => {
    const fetchCartItemCount = async () => {
      if (!userId || !token) return; // Ensure both userId and token are available
  
      try {
        const response = await axios.get(`/api/CartItemCounterRoutes/?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItemNumber({ itemCount: response.data.itemCount }); // Update state with the fetched count
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };
  
    fetchCartItemCount(); // Call immediately when userId or token changes
  }, [userId, token]); // Only trigger when userId or token change


  // Render the component
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Display the protected content only if authenticated */}
      {isAuthenticated && (
       <div className="flex flex-col flex-shrink overflow-x-hidden min-h-screen  text-black">
       {/* Header Section */}
       <div className="flex flex-col sm:flex-row h-auto w-full">
           {/* Logo Section */}
           <div className="w-full sm:w-2/5 md:w-1/5 bg-white flex justify-center items-center p-2">
               <div className="flex justify-center items-center cursor-pointer" onClick={() => handleNavigation('/home')}>Logo</div>
           </div>

           {/* Navigation Links */}
           <div className="w-full sm:w-3/5 md:w-4/5 bg-white flex flex-wrap">
               <div className="flex justify-between px-3 py-2 w-full">
                   <div className="flex items-center">
                       {/* Header navigation */}
                   </div>

                   <div className="flex flex-wrap justify-end gap-4 font-bold items-center">
                       {/* <div className="block text-black">{fullname}</div> */}
                       <div><div className="flex flex-wrap justify-center w-full px-4 py-3 font-bold bg-white">
                           <div className="flex flex-wrap gap-6 sm:gap-12">
                               {["Home", "Support", "Community"].map((menuItem, index) => (
                                   <div
                                       key={index}
                                       className="cursor-pointer"
                                       onClick={menuItem === "Home" ? () => handleNavigation('/home') : undefined} // Add the onClick handler here
                                   >
                                       {menuItem}
                                   </div>
                               ))}
                           </div>
                       </div>
                       </div>
                       <div className="block hover:underline cursor-pointer" onClick={() => handleNavigation('/contactUs')}>Contact Us</div>
                       {/* <a href="" className="block">Login/Sign Up/Logout</a> */}
                       {/* <span className='flex flex-row'>
                           <span className='block hover:underline cursor-pointer' onClick={()=>handleNavigation('/loginPage')}>Login</span>/
                           <span className='block hover:underline cursor-pointer' onClick={() => handleNavigation('/signUpPage')}>Sign Up</span>
                           </span> */}
                       <select className="block outline-none px-1 py-1 text-center rounded-md">
                           <option value="Language">Select Language</option>
                           <option value="English">English</option>
                           <option value="French">French</option>
                       </select>
                       {/* <a href="#" className="block" onClick={() => handleNavigation('/Profile')}>Profile</a> */}
                       {/* <div className='block hover:underline cursor-pointer' onClick={() => handleNavigation('/profile')}>Profile</div>
          */}
                       <div className="relative bg-white">
                       </div>
                       <div onClick={()=>handleNavigation('/ordersPageForAuthenticated')} className="block cursor-pointer">My Orders</div>
                       {/* <div onClick={()=>handleNavigation('/cartPageForAuthenticated')} className="block cursor-pointer">Cart <FontAwesomeIcon icon={faShoppingCart} size="lg" /></div> */}
                       <div onClick={()=>handleNavigation('/cartPageForAuthenticated')} className="block cursor-pointer relative">Cart <FontAwesomeIcon icon={faShoppingCart} size="2xl" />   {cartItemNumber.itemCount > 0 && (
            <span className="absolute top-1/3 left-1/2 transform translate-x-1/2 -translate-y-1/2  text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemNumber.itemCount}
            </span>
        )}</div>
                   </div>
               </div>
           </div>
       </div>

       {/* Divider */}
       <div className="bg-white h-[2px]"></div>

       {/* Main Menu Section */}
       <div className="flex flex-wrap relative justify-center w-full px-4 py-3 font-bold bg-black text-white">
           <div className="flex text-sm flex-wrap justify-center gap-8 w-full">
               {/* {shopMenuItems.map((item, index) => (
                   <div key={index}>{item.name}</div>
               ))} */}
               {shopMenuItems.map((item) => (
                   <div key={item._id} className=" cursor-pointer">
                       <div className='flex flex-col w-full' onMouseOver={() => toggleDropdown(item._id)}>{item.name}</div>
                       {/* Dropdown Section */}
                       {openDropdown === item._id && item.sections && (
                           <div className="absolute left-0 top-11 bg-black text-black w-full flex flex-col px-8 py-4 dropdown" style={{ border: "2px solid white" }} ref={dropdownRef}>
                               {/* Accessing sections */}
                               {Object.entries(item.sections).map(([sectionName, subSections]) => (
                                   <div key={sectionName} className="flex flex-col w-full">
                                       <h4 className="font-bold mb-2 text-lg text-white">{sectionName}</h4>
                                       <div className="flex flex-wrap gap-8 w-full">
                                           {/* Sub-Sections with Items */}
                                           {Object.entries(subSections).map(([subSectionName, items]) => (
                                               <div key={subSectionName} className="flex flex-col min-w-[200px]">
                                                   <h5 className="font-bold text-purple-600">{subSectionName}</h5>
                                                   <ul className="text-white list-disc list-inside">
                                                       {Array.isArray(items) && items.length > 0 ? (
                                                           items.map((subItem, index) => (
                                                               <li key={index}>{subItem}</li>
                                                           ))
                                                       ) : (
                                                           <li>No items available</li>
                                                       )}
                                                   </ul>
                                               </div>
                                           ))}
                                       </div>
                                   </div>
                               ))}
                           </div>
                       )}
                   </div>

               ))}


           </div>
       </div>
       {/* Divider */}
       <div className="bg-white h-[2px]"></div>
       {/* Main Content Section */}
       <div className="flex flex-col sm:flex-row w-full h-full bg-black">
           {/* Local Highlights Section */}
           <aside className="w-full sm:w-3/6 bg-white text-black py-4 px-4">
               <div>
                   <h3 className="font-bold text-lg mb-4">Filter by Price</h3>
                   <div className="mb-4">
                       <label htmlFor="minPrice" className="block mb-1">Min Price:</label>
                       <input
                           type="number"
                           id="minPrice"
                           value={minPrice || ''}
                           onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                           onKeyDown={handleKeyDown}
                           onWheel={handleWheel}
                           className="w-full p-2 border rounded numberpriceinputfield"
                           placeholder="Enter minimum price"
                       />
                   </div>
                   <div className="mb-4">
                       <label htmlFor="maxPrice" className="block mb-1">Max Price:</label>
                       <input
                           type="number"
                           id="maxPrice"
                           value={maxPrice || ''}
                           onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                           onKeyDown={handleKeyDown}
                           onWheel={handleWheel}
                           className="w-full p-2 border rounded numberpriceinputfield"
                           placeholder="Enter maximum price"
                       />
                   </div>
                   <div className='w-full text-red-500 py-2 px-2'>
                       {errorMessage}
                   </div>
                   <div className='flex flex-col w-full gap-2'>
                       <button
                           onClick={applyPriceFilter}
                           className="w-full bg-purple-600 text-white py-2 rounded"
                       >
                           Apply Filter
                       </button>
                       <button
                           onClick={resetFilter}
                           className="w-full bg-black text-white py-2 px-4 rounded-md"
                       >
                           Reset Filter
                       </button>
                   </div>
               </div>
           </aside>
           <div className="w-full max-h-full bg-white text-black flex justify-center items-center px-2 py-4">
               <div className="px-4 py-4 bg-black text-white w-full max-w-screen-xl">
                   <div className="flex flex-wrap justify-center">
                       {filteredProducts.length > 0 ?
                           (filteredProducts.map((product) => (
                               <div key={product._id} className="product-card w-full md:w-1/2 lg:w-1/3 p-4" onClick={() => handleProductNavigation(product._id)}>
                                   <div className="bg-white p-4 rounded-lg shadow-md text-black h-full flex flex-col">
                                       {/* Image Container */}
                                       <div className="relative w-full h-64 mb-4 lg:h-96">
                                           {/* <Image
                                               src={product.images[0].url}
                                               alt={product.images[0].altText}
                                               layout="fill" // Responsive fill
                                               objectFit="contain" // Maintain aspect ratio
                                               className="rounded-lg" // Rounded corners for the image
                                           /> */}
                                           {product.images[0]?.url ? (
                                                    <Image
                                                        src={product.images[0].url}
                                                        alt={product.images[0].altText || "Product image"}
                                                        layout="fill" // Responsive fill
                                                        objectFit="contain" // Maintain aspect ratio
                                                        className="rounded-lg" // Rounded corners for the image
                                                    />
                                                ) : (
                                                    <p className="flex items-center justify-center w-full h-full text-gray-500">
                                                        Image not available
                                                    </p>
                                                )}
                                       </div>

                                       {/* Product Info */}
                                       <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                                       <p className="text-sm mb-2">{product.shortDescription}</p>
                                       <p className="text-sm mb-2">
                                           Price: {product.currency} {product.price.toFixed(2)}
                                           {product.isOnSale && (
                                               <span> (On Sale: {product.salePrice?.toFixed(2)})</span>
                                           )}
                                       </p>
                                       <p className="text-sm mb-2">Rating: {product.rating} stars</p>
                                       {/* <p className="text-sm mb-2">Brand: {product.brand}</p>
       <p className="text-sm mb-2">Available: {product.available ? "Yes" : "No"}</p> */}
                                   </div>
                               </div>
                           ))
                           ) : (
                               <div>No Products available for this filter</div>
                               )
                       }
                   </div>
               </div>
           </div>

           {/* Login Page Section */}
           {/* <div className="w-full min-h-full  bg-white">
     <LoginPage />
   </div> */}

       </div>

       {/* Divider */}
       <div className="bg-white h-[2px]"></div>

       {/* Promotional Banners Section */}
       <div className="flex justify-center bg-white">

           <div className='flex flex-row px-4 py-2 scroll-smooth items-center w-full'>

           </div>
           <div className='flex items-center'>

           </div>
       </div>

       {/* Divider */}
       <div className="bg-white h-[2px]"></div>

       {/* Regional Highlights Section */}
       <div className="flex flex-col sm:flex-row w-full h-auto">

       </div>

       {/* Divider */}
       <div className="bg-white"></div>

       {/* Footer */}
       <div className="flex flex-row flex-grow justify-evenly items-center px-16 py-4 bg-white text-black">
           <div className='flex flex-col px-2 py-2'>

           </div>
           <div className='px-2 py-2'>

           </div>
           <div className='px-2 py-2'>

           </div>
           <div className='px-2 py-2'>

           </div>
       </div>
   </div>
      )}
    </div>
  );
}
