"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// import {  faChevronDown, faChevronUp, faEdit, faBoxOpen, faTruck, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import './styles.css'
// import Image from 'next/image';



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
        };

        // if (isAuthenticated) {
        fetchOrderData();
        // }
    }, [userId, token]);


    const handleNavigation = (path: string) => {
        router.push(path);
    };

    useEffect(() => {
        console.log({
          addressLine1,
          addressLine2,
          addressCity,
          addressState,
          addressCountry,
          addressPincode,
          orderData,
          cartData,
          cartEmpty,
          imageUrls,
          ratings,
          quantities,
          setQuantities,
          editingQuantity,
          setEditingQuantity,
        });
      }, []); // No dependency array to run only on mount
      


    // Combine loading states
    useEffect(() => {
        if (!userLoading && !cartLoading && !orderLoading) {
            setLoading(false); // Set main loading state to false only when all fetches are complete
        }
    }, [userLoading, cartLoading, orderLoading]);
    

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
            {isAuthenticated ? (
                loading ? (
                    <div className="flex items-center justify-center h-full">
                        <FontAwesomeIcon icon={faCircleNotch} spin size="2x" className="text-gray-600" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-gray-100">
                        <div className="flex flex-col items-center w-full max-w-md p-8 bg-white rounded-lg shadow-lg md:max-w-xl lg:max-w-2xl">

                            {/* Success Icon */}
                            <div className="text-green-500">
                                <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                            </div>

                            {/* Title */}
                            <h1 className="mt-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">Order Successful!</h1>

                            {/* Success Message */}
                            <p className="mt-2 text-gray-600 text-center text-sm md:text-base lg:text-lg">
                                Thank you for your purchase! Your order has been placed successfully.
                            </p>

                            <div className='w-full flex flex-col gap-1'>
                                {/* Continue Shopping Button */}
                                <button
                                    onClick={() => handleNavigation('/shopPageForAuthenticated')}
                                    className="mt-6 w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all md:w-auto md:px-10 lg:px-12"
                                >
                                    Continue Shopping
                                </button>

                                <button
                                    onClick={() => handleNavigation('/ordersPageForAuthenticated')}
                                    className="mt-6 w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all md:w-auto md:px-10 lg:px-12"
                                >
                                    View Your Orders
                                </button>
                            </div>


                            {/* Footer Help Link */}
                            <div className="w-full mt-6 p-4 border-t text-center text-gray-400 text-xs md:text-sm">
                                Need help? Contact our <a href="#" className="text-blue-500 hover:underline">support team</a>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <p className="text-center text-gray-600">Please log in to view your cart.</p>
            )}
        </div>
    );
}

