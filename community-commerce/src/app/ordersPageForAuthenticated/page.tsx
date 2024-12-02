"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import {  faChevronDown, faChevronUp, faEdit, faCheckCircle, faBoxOpen, faTruck, faDollarSign } from "@fortawesome/free-solid-svg-icons";
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


export default function ProtectedOrderPage() {
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
    // const [cartLoading, setCartLoading] = useState(true);
    const [orderLoading, setOrderLoading] = useState(true);
    const [usersorderLoading, setUsersOrderLoading] = useState(true);

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
        if (!userLoading && !usersorderLoading) {
            setLoading(false);
        }
    }, [userLoading, usersorderLoading]);

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
            {isAuthenticated ? (
                loading ? (
                    <div className="flex items-center justify-center h-full">
                        <FontAwesomeIcon icon={faCircleNotch} spin size="2x" className="text-gray-600" />
                    </div>
                ) : (
                    !usersorderLoading && usersOrderData && usersOrderData.length > 0 ? (<div className="w-full mx-auto p-10  rounded-lg">
                        <p className="text-4xl font-bold text-gray-800 mb-8 text-center">My Orders</p>

                        <div className="space-y-8">
                            {usersOrderData?.map((order) => (
                                <div key={order._id} className="bg-white bgforOrders p-6 rounded-lg shadow-md border border-gray-200" onClick={() => handleNavigation(`/orderIdPageForAuthenticated/${order._id}`)}>
                                    {/* Order Summary Header */}
                                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                                        <div>
                                            <p className="text-lg font-semibold text-gray-800">Order ID: {order._id}</p>
                                            {/* <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p> */}
                                        </div>
                                        <div className="text-right">

                                            <p className="text-lg font-bold text-gray-800">Total: ${order.totalAmount.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-4">
                                        {order.items.map((item) => (
                                            <div key={item.productId} className="flex items-center space-x-4">
                                                <Image
                                                    src={item.image.url} // Make sure the image URL exists
                                                    alt={item.productName}
                                                    width={100}
                                                    height={100}
                                                    className="mr-4"
                                                />
                                                <div className="flex-grow">
                                                    <h4 className="text-lg font-medium text-gray-800">{item.productName}</h4>
                                                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                                                    <p className="text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                                    <p className="text-gray-500">Color: {item.image.color}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Shipping Address and Payment Info */}
                                    {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                     
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>) : !usersorderLoading &&(
                      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 text-center">
                      <div className="bg-white rounded-lg shadow-md p-12 max-w-md">
                          <FontAwesomeIcon icon={faShoppingCart} size="3x" className="text-gray-500 mb-4" />
                          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
                          <p className="text-gray-600 font-semibold mb-6">
                              It looks like you haven&apos;t placed any orders yet. Start exploring our collection to find something you love!
                          </p>
                          <button
                              onClick={()=>handleNavigation('/shopPageForAuthenticated')}
                              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                          >
                              Start Shopping
                          </button>
                      </div>
                  </div>)
                )
            ) : (
                <p className="text-center text-gray-600">Please log in to view your cart.</p>
            )}
        </div>
    );
}

