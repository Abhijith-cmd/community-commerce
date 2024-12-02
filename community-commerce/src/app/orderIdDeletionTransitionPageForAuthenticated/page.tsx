"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// import {  faChevronDown, faChevronUp, faEdit, faCheckCircle, faBoxOpen, faTruck, faDollarSign } from "@fortawesome/free-solid-svg-icons";
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

//The orders from the users format interface

interface UsersImageDetails {
    url: string;
    altText: string;
    color: string;
}

interface UserOrderItems {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: UsersImageDetails; // This is correct, multiple images might be there
}

interface UsersShippingAddress {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string; // Updated to match phone format
}

interface UsersOrderData {
    _id: string;
    userId: string;
    items: UserOrderItems[];
    shippingAddress: UsersShippingAddress; // Shipping address should be a single object
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}



//////////////////////////////

// interface OrderIdResponse {
//     _id: string;
//     userId: string;
//     items: OrderItem[];
//     shippingAddress: ShippingAddress;
//     shippingMethod: string;
//     shippingEstimate: string;
//     paymentMethod: string;
//     paymentStatus: string;
//     orderStatus: string;
//     totalAmount: number;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
// }

// interface OrderItem {
//     productId: string;
//     productName: string;
//     quantity: number;
//     price: number;
//     image: ProductImage;
// }

// interface ProductImage {
//     url: string;
//     altText: string;
//     color: string;
// }

// interface ShippingAddress {
//     fullName: string;
//     addressLine1: string;
//     addressLine2: string;
//     city: string;
//     state: string;
//     postalCode: string;
//     country: string;
//     phone: string;
// }


export default function ProtectedOrderIDPage() {
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

    // const { id } = params;

    // const [order, setOrder] = useState<OrderIdResponse | null>(null);


    const [loading, setLoading] = useState<boolean>(true);
    const [userLoading, setUserLoading] = useState(true);
    // const [cartLoading, setCartLoading] = useState(true);
    const [orderLoading, setOrderLoading] = useState(true);
    const [usersorderLoading, setUsersOrderLoading] = useState(true);
    // const [orderIdLoading, setOrderIdLoading] = useState(true)

    //order item
    const [orderData, setOrderData] = useState<OrderData | null>(null);

    const [cartData, setCartData] = useState<CartData | null>(null);
    const [cartEmpty, setCartEmpty] = useState<boolean>(false);
    const [imageUrls, setImageUrls] = useState<{ [productId: string]: string }>({});
    const [ratings, setRatings] = useState<{ [productId: string]: number }>({});

    // States for billing address fields

    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
    const [editingQuantity, setEditingQuantity] = useState<{ [productId: string]: boolean }>({});


    //get order details form the userId
    const [usersOrderData, setUsersOrderData] = useState<UsersOrderData[] | null>(null)


    useEffect(() => {




        console.log({
            setOrderLoading, setOrderData,
            setCartData,
            setCartEmpty,
            setImageUrls,
            setRatings,

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
            usersorderLoading,
            usersOrderData,
            orderLoading

        });
    }, []); // No dependency array to run only on mount


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

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    useEffect(() => {
        const fetchUsersOrderData = async () => {
            try {
                if (userId != null) {
                    const res = await axios.get(`/api/orderPlacedGetRoutes/?userId=${userId}`)
                    setUsersOrderData(res.data)
                    console.log(res.data, "the users order data");
                }

            } catch (error) {
                console.log("Fetching order details failed", error);

            } finally {
                setUsersOrderLoading(false)
            }

        }
        fetchUsersOrderData()
    }, [userId, token])

    // Combine loading states
    useEffect(() => {
        if (!userLoading) {
            setLoading(false);
        }
    }, [userLoading]);
    

    return (
        <div className="flex flex-col items-center w-full min-h-screen p-6 bg-gray-100">
            {isAuthenticated ? (
                loading ? (
                    <div className="flex items-center justify-center h-full">
                        <FontAwesomeIcon icon={faCircleNotch} spin size="2x" className="text-gray-600" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50 px-4">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
                          <FontAwesomeIcon icon={faTimesCircle} size="3x" />
                        </div>
                      </div>
                      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                        Your Order has Been Cancelled
                      </h1>
                      {/* <p className="text-gray-600 mb-6">
                        We're sorry to hear that. If you have any questions or need assistance, 
                        please contact our support team.
                      </p> */}
                      <button
                        onClick={() => handleNavigation('/home')}
                        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
                      >
                        Go Back to Home
                      </button>
                    </div>
                  </div>
                )
            ) : (
                <p className="text-center text-gray-600">Please log in to view your cart.</p>
            )}
        </div>
    );
}

