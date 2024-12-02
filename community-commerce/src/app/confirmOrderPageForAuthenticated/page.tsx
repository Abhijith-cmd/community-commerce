"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faCheckCircle, faBoxOpen, faTruck } from "@fortawesome/free-solid-svg-icons";
// import {  faChevronDown, faChevronUp, faEdit, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import './styles.css'
import Image from 'next/image';



// Define the types for the Cart and Cart Item
interface CartItem {
    productId: string;
    productName: string;
    productPrice: number;
    productColor: string;
    quantity: number;
    _id: string;
}

interface CartData {
    _id: string;
    userId: string;
    items: CartItem[];
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


// Define the types for the Order Data and Order Item
interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
    productName: string;
    productColor: string;
    _id: string;
}

interface OrderData {
    _id: string;
    userId: string;
    billingAddress: {
        line1: string;
        line2: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        _id: string;
    };
    shippingMethod: string;
    shippingEstimate: number;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export default function ProtectedConfirmOrderPage() {
    const router = useRouter();
    const { isAuthenticated, token, setToken } = useAuth();
    const [userId, setUserId] = useState<string | null>(null);
    const [fullname, setFullName] = useState<string>('');
    const [addressLine1, setAddressLine1] = useState<string>('');
    const [addressLine2, setAddressLine2] = useState<string>('');
    const [addressCity, setAddressCity] = useState<string>('');
    const [addressState, setAddressState] = useState<string>('');
    const [addressCountry, setAddressCountry] = useState<string>('');
    const [addressPincode, setAddressPincode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<number>(0)


    const [loading, setLoading] = useState<boolean>(true);
    const [userLoading, setUserLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState(true);
    const [orderLoading, setOrderLoading] = useState(true);

    //order item
    const [orderData, setOrderData] = useState<OrderData | null>(null);

    const [cartData, setCartData] = useState<CartData | null>(null);
    const [cartEmpty, setCartEmpty] = useState<boolean>(false);
    const [imageUrls, setImageUrls] = useState<{ [productId: string]: string }>({});
    const [ratings, setRatings] = useState<{ [productId: string]: number }>({});

    // States for billing address fields
    const [billingLine1, setBillingLine1] = useState<string>('');
    const [billingLine2, setBillingLine2] = useState<string>('');
    const [billingCity, setBillingCity] = useState<string>('');
    const [billingState, setBillingState] = useState<string>('');
    const [billingCountry, setBillingCountry] = useState<string>('');
    const [billingPincode, setBillingPincode] = useState<string>('');
    const [billingAddress, setBillingAddress] = useState<string>('');

    // const [copyAddress, setCopyAddress] = useState<boolean>(false);

    // States for dropdown visibility
    // const [showShippingAddress, setShowShippingAddress] = useState<boolean>(false);
    // const [showShippingMethod, setShowShippingMethod] = useState<boolean>(false);
    // const [showBillingAddress, setShowBillingAddress] = useState<boolean>(false);
    // const [showPaymentMethod, setShowPaymentMethod] = useState<boolean>(false);
    // const [showGiftCard, setShowGiftCard] = useState<boolean>(true);



    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
    const [editingQuantity, setEditingQuantity] = useState<{ [productId: string]: boolean }>({});

    useEffect(() => {
        const fetchProtectedData = async () => {
            if (!token) return;

            try {
                const response = await axios.get('/api/protectedRoutes', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { user } = response.data;
                if (user && user.userId) setUserId(user.userId);
                console.log(fullname, setToken);

            } catch (error) {
                console.error('Error fetching protected data:', error);
            }
        };
        fetchProtectedData();
    }, [token]);

    useEffect(() => {
        if (!userId) return;
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/loginRoutes/${userId}`);
                const data = response.data;
                setFullName(`${data.firstName} ${data.lastName}`);
                setAddressLine1(data.address.line1);
                setAddressLine2(data.address.line2);
                setAddressCity(data.address.city);
                setAddressState(data.address.state);
                setAddressCountry(data.address.country);
                setAddressPincode(data.address.pincode);
                setPhoneNumber(data.phoneNumber)
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                // setLoading(false);
                setUserLoading(false);
            }
        };
        fetchUserData();
    }, [userId]);



    useEffect(() => {
        if (!isAuthenticated) router.push('/');
    }, [isAuthenticated, router]);

    // Handle checkbox change to copy the shipping address to billing address
    // const handleCopyAddress = () => {
    //     setCopyAddress(!copyAddress);
    //     if (!copyAddress) {
    //         // Copy shipping address to billing address
    //         setBillingLine1(addressLine1);
    //         setBillingLine2(addressLine2);
    //         setBillingCity(addressCity);
    //         setBillingState(addressState);
    //         setBillingCountry(addressCountry);
    //         setBillingPincode(addressPincode);
    //         setBillingAddress(`${addressCity},${addressState},${addressCountry},${addressPincode}`)
    //     } else {
    //         // Clear billing address if unchecked
    //         setBillingLine1('');
    //         setBillingLine2('');
    //         setBillingCity('');
    //         setBillingState('');
    //         setBillingCountry('');
    //         setBillingPincode('');
    //         setBillingAddress('')
    //     }
    // };

    useEffect(() => {
        console.log('Billing Line 1:', billingLine1);
        console.log('Billing Line 2:', billingLine2);
        console.log('Billing City:', billingCity);
        console.log('Billing State:', billingState);
        console.log('Billing Country:', billingCountry);
        console.log('Billing Pincode:', billingPincode);
        console.log('Billing Address:', billingAddress);


        console.log(cartEmpty, imageUrls, ratings, setEditingQuantity, "testing purposes");
        console.log({
            addressLine1,
            addressLine2,
            addressCity,
            addressState,
            addressCountry,
            addressPincode
        });

        console.log({
            setBillingLine1,
            setBillingLine2,
            setBillingCity,
            setBillingState,
            setBillingCountry,
            setBillingPincode,
            setBillingAddress
        });



    }, [billingLine1, billingLine2, billingCity, billingState, billingCountry, billingPincode, billingAddress]);


    useEffect(() => {
        const fetchCartData = async () => {
            if (!userId) return;
            setLoading(true); // Start loading
            try {
                const response = await axios.get<CartData>(`/api/CartRoutes?userId=${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartData(response.data);
                setCartEmpty(response.data.items.length === 0);

                const productsData = await Promise.all(response.data.items.map(async (item) => {
                    const productResponse = await axios.get(`/api/getProductsDetailsByIdRoutes/${item.productId}`);
                    const imageUrl = productResponse.data.data.images[0]?.url || '';
                    const rating = productResponse.data.data.rating || 0;
                    return { [item.productId]: { imageUrl, rating } };
                }));

                // Set both image URLs and ratings
                setImageUrls(Object.assign({}, ...productsData.map((item) => ({ [Object.keys(item)[0]]: item[Object.keys(item)[0]].imageUrl }))));
                setRatings(Object.assign({}, ...productsData.map((item) => ({ [Object.keys(item)[0]]: item[Object.keys(item)[0]].rating }))));
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    setCartEmpty(true);
                } else {
                    console.error('Error fetching cart data:', error);
                }
            } finally {
                // setLoading(false); // Stop loading
                setCartLoading(false);
            }
        };

        fetchCartData();
    }, [userId, token,]);

    useEffect(() => {
        const fetchOrderData = async () => {
            if (userId != null) {
                try {
                    const response = await axios.get(`/api/ConfirmYourOrderRoutes/latest?userId=${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setOrderData(response.data);
                    console.log(response.data, "the order data");

                } catch (error) {
                    console.error("Error fetching order data:", error);
                } finally {
                    // setLoading(false);
                    setOrderLoading(false);
                }
            }
        };

        // if (isAuthenticated) {
        fetchOrderData();
        // }
    }, [userId, token]);

    // Combine loading states
    useEffect(() => {
        if (!userLoading && !cartLoading && !orderLoading) {
            setLoading(false); // Set main loading state to false only when all fetches are complete
        }
    }, [userLoading, cartLoading, orderLoading]);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const handlePlaceOrder = async () => {

        if (userId != null) {
            const mappedItems = cartData?.items.map((item) => ({
                productId: item.productId,
                productName: item.productName,
                quantity: quantities[item.productId] || item.quantity, // Use quantity from state if being edited, else default
                price: item.productPrice,
                image: {
                    url: imageUrls[item.productId],  // Default to placeholder if no URL available
                    altText: item.productName,  // Alt text based on product name
                    color: item.productColor
                }
            }));

            const orderDataForUser = {
                userId: `${userId}`,  // Example user ID, you can get it dynamically
                items: mappedItems,
                shippingAddress: {
                    fullName: `${fullname}`,
                    addressLine1: `${orderData?.billingAddress.line1}`,
                    addressLine2: `${orderData?.billingAddress.line2}`,
                    city: `${orderData?.billingAddress.city}`,
                    state: `${orderData?.billingAddress.state}`,
                    postalCode: `${orderData?.billingAddress.postalCode}`,
                    country: `${orderData?.billingAddress.country}`,
                    phone: `${phoneNumber}`
                },
                shippingMethod: `${orderData?.shippingMethod}`,
                shippingEstimate: `${orderData?.shippingEstimate}`,
                paymentMethod: "Credit Card",
                paymentStatus: "Pending",
                orderStatus: "Pending",
                totalAmount: `${cartData?.totalAmount.toFixed(2)}`
            };

            try {
                const response = await axios.post('api/CreateOrderRoutes', orderDataForUser, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 201) {
                    console.log('Order placed successfully:', response.data);
                    handleNavigation('/orderedSuccessfullyPageForAuthenticated')
                } else {
                    console.error('Error placing order:', response.statusText);
                }
            } catch (error) {
                console.error('Request failed:', error);
            }
        }
    };

    useEffect(() => {
        if (cartData && cartData.items.length===0) {
            handleNavigation('/shopPageForAuthenticated')
        }
    }, [cartData, router]);



    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
            {isAuthenticated ? (
                loading ? (
                    <div className="flex items-center justify-center h-full">
                        <FontAwesomeIcon icon={faCircleNotch} spin size="2x" className="text-gray-600" />
                    </div>
                ) :  (
                    cartData && cartData.items?.length > 0 ?  <div className="flex flex-col w-full gap-6 p-6 bg-white shadow-lg rounded-lg md:flex-row md:w-4/5 lg:w-3/5">

                   {/* Left Section: Order Summary */}
                   <div className="flex flex-col w-full gap-6 md:w-2/3">
                       <h2 className="text-2xl font-bold text-gray-800">Confirm Your Order</h2>

                       {/* Order Summary */}
                       <div className="border-b pb-4">
                           <h3 className="text-lg font-semibold text-gray-600 flex items-center gap-2">
                               <FontAwesomeIcon icon={faBoxOpen} /> Order Summary
                           </h3>

                           <div className="mt-4 space-y-3">
                               <div className="flex flex-col justify-between items-start text-gray-700">
                                   {/* <span>Product 1 - Elegant Lamp</span>
                                   <span className="font-medium">$29.99</span> */}
                                   {cartData?.items.map((item) => (
                                       <div key={item._id} className="flex flex-row md:flex-row items-center md:items-start border-b border-gray-200 py-4">
                                           <div className="w-24 h-24 mb-4 md:mb-0">
                                               {imageUrls[item.productId] ? (
                                                   <Image
                                                       src={imageUrls[item.productId]}
                                                       alt={item.productName}
                                                       width={96}
                                                       height={96}
                                                       className="object-cover rounded-lg shadow-sm"
                                                   />
                                               ) : (
                                                   <p>Loading image...</p>
                                               )}
                                           </div>
                                           <div className="flex flex-col flex-grow px-4 space-y-1">
                                               <h2 className="text-lg font-semibold">{item.productName}</h2>
                                               <p className="text-gray-500">Color: {item.productColor}</p>
                                               <p className="text-gray-700 font-semibold">${item.productPrice.toFixed(2)}</p>
                                               {/* <div className="text-bold">{renderStars(ratings[item.productId] || 0)}</div> */}
                                               <div className="flex items-center mt-2">
                                                   <span className="font-semibold">Qty:</span>

                                                   <input
                                                       type="number"
                                                       value={
                                                           editingQuantity[item.productId]
                                                               ? quantities[item.productId]?.toString() ?? item.quantity.toString()
                                                               : item.quantity.toString()
                                                       }
                                                       className=" w-16  rounded-lg p-1 text-center outline-none quantityNumberINputField"
                                                       style={{ border: "none" }}
                                                       readOnly
                                                       min="0"
                                                       // onFocus={() => handleInputClick(item.productId)}
                                                       onChange={(e) => {
                                                           let inputValue = e.target.value;

                                                           // Remove leading zeros directly on inputValue
                                                           if (inputValue.startsWith("0") && inputValue.length > 1) {
                                                               inputValue = inputValue.replace(/^0+/, "");
                                                           }

                                                           // Convert to number and update state
                                                           const numericValue = inputValue === '' ? undefined : parseInt(inputValue, 10);
                                                           setQuantities((prev) => ({
                                                               ...prev,
                                                               [item.productId]: numericValue !== undefined ? numericValue : 0
                                                           }));
                                                       }}
                                                       onBlur={(e) => {
                                                           const currentQuantity = quantities[item.productId];
                                                           console.log(e);


                                                           // Ensure no unintended leading zeros are present in the state
                                                           setQuantities((prev) => ({
                                                               ...prev,
                                                               [item.productId]: currentQuantity || 0  // Default to 0 if empty
                                                           }));
                                                       }}
                                                   />


                                               </div>
                                           </div>

                                       </div>
                                   ))}
                               </div>
                               <div className="flex justify-between items-center text-gray-700 border-b pb-4">
                                   <span>Sub Total</span>
                                   <span className="font-medium">${cartData?.totalAmount.toFixed(2)}</span>
                               </div>

                               <div className="flex justify-between items-center text-gray-700 border-b pb-4">
                                   <span>Shipping Method</span>
                                   <span className="font-medium">{orderData?.shippingMethod}</span>
                               </div>

                               <div className="flex justify-between items-center text-gray-700">
                                   <span>Shipping <FontAwesomeIcon icon={faTruck} className="ml-1" /></span>
                                   <span className="font-medium">${orderData?.shippingEstimate}</span>
                               </div>
                           </div>
                       </div>

                       {/* Total Cost */}
                       <div className="flex justify-between items-center pt-4 text-xl font-semibold text-gray-700">
                           <span>Total:</span>
                           {/* <span className="text-green-600">${cartData?.totalAmount.toFixed(2)}</span> */}
                           ${cartData?.totalAmount && orderData?.shippingEstimate
                               ? (cartData.totalAmount + orderData.shippingEstimate).toFixed(2)
                               : "0.00"}
                       </div>

                       {/* Billing and Shipping Address */}
                       <div className="pt-4 border-t mt-4">
                           <h3 className="text-lg font-semibold text-gray-600 flex items-center gap-2">
                               Billing Address
                           </h3>
                           <div className="mt-2 flex flex-row text-gray-700  items-start justify-between">
                               {/* <p>1234 Maple Street, Springfield, ST 12345</p> */}
                               <div className='flex flex-col'>
                                   <p>{orderData?.billingAddress.line1}</p>
                                   <p> {orderData?.billingAddress.line2}</p>
                                   <p>{orderData?.billingAddress.city}, {orderData?.billingAddress.state}, {orderData?.billingAddress.country}, {orderData?.billingAddress.postalCode}</p>
                               </div>
                               <div>

                               </div>
                           </div>
                       </div>
                   </div>

                   {/* Right Section: Place Order */}
                   <div className="flex flex-col items-center justify-between w-full md:w-1/3 space-y-6 md:space-y-0">
                       <div className="w-full p-6 rounded-lg flex flex-col gap-2 items-center">
                       </div>

                       <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                           // onClick={()=>handleNavigation('/orderedSuccessfullyPageForAuthenticated')}
                           // onClick={handlePlaceOrder}
                           onClick={() => {
                               if (cartData?.items && cartData.items.length > 0) {
                                   handlePlaceOrder();
                               }
                               else {
                                   handleNavigation('/shopPageForAuthenticated')
                               }
                           }}
                       >
                           <FontAwesomeIcon icon={faCheckCircle} />
                           Place Order
                       </button>
                   </div>
               </div>
               :
              null
                )
            ) : (
                <p className="text-center text-gray-600">Please log in to view your cart.</p>
            )}
        </div>
    );
}

