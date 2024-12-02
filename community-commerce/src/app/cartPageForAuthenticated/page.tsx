"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as farStar, faTrash, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import './styles.css'


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


export default function ProtectedCartPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const { token } = useAuth() // Use the token from AuthContext
    const { setToken } = useAuth();

    const [cartData, setCartData] = useState<CartData | null>(null);



    const [userId, setUserId] = useState<string | null>(null); // State to store userId
    // const [username, setUsername] = useState<string>(''); // To store the username
    // const [firstName, setFirstName] = useState<string>(''); // To store the username
    // const [lastName, setLastName] = useState<string>(''); // To store the username
    const [fullname, setFullName] = useState<string>('');
    const [cartEmpty, setCartEmpty] = useState<boolean>(false);
    const [imageUrls, setImageUrls] = useState<{ [productId: string]: string }>({});
    const [ratings, setRatings] = useState<{ [productId: string]: number }>({});
    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
    const [editingQuantity, setEditingQuantity] = useState<{ [productId: string]: boolean }>({});
    const [loading, setLoading] = useState<boolean>(true);


     // Calculate total amount locally whenever cart items change
     const totalAmount = useMemo(() => {
        if (!cartData) return 0;
        return cartData.items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
    }, [cartData]);

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
                    console.log(fullname, setFullName, setToken);

                }
                console.log('Protected Data:', response.data);
            } catch (error) {
                console.error('Error fetching protected data:', error);
            }
        };

        fetchProtectedData();
    }, [token, userId]);

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
                setLoading(false); // Stop loading
            }
        };

        fetchCartData();
    }, [userId, token,]);

    const handleDelete = async (productId: string) => {
        try {
            await axios.delete('/api/CartRoutes', {
                data: { userId, productId },
                headers: { Authorization: `Bearer ${token}` },
            });

            setCartData((prevCartData) => {
                if (!prevCartData) return null;
                const updatedItems = prevCartData.items.filter(item => item.productId !== productId);
                return { ...prevCartData, items: updatedItems };
            });

            setCartEmpty(cartData?.items.length === 1); // Set cart empty if last item is deleted
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleClearAll = async () => {
        try {
            await axios.delete('/api/CartClearRoutes', {
                data: { userId },
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartData({ ...cartData!, items: [] }); // Clear the local state
            setCartEmpty(true);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };


    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
                ))}
                {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={farStar} className="text-gray-300" />
                ))}
            </div>
        );
    };

    const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return; // Prevent updating to a quantity less than 1
        try {
            await axios.put('/api/UpdateCartQuantityRoutes', {
                userId,
                productId,
                quantity: newQuantity,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Update local cart data after successful update
            setCartData((prevCartData) => {
                if (!prevCartData) return null;
                const updatedItems = prevCartData.items.map(item =>
                    item.productId === productId ? { ...item, quantity: newQuantity } : item
                );
                return { ...prevCartData, items: updatedItems };
            });
            // Update local quantities state
            setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));

            // Hide the editing buttons after update
            setEditingQuantity((prev) => ({ ...prev, [productId]: false }));
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleInputClick = (productId: string) => {
        setEditingQuantity((prev) => ({ ...prev, [productId]: true }));
    };

    // const handleCancelQuantity = (productId: string) => {
    //     setQuantities((prev) => ({ ...prev, [productId]: cartData?.items.find(item => item.productId === productId)?.quantity || 1 }));
    // };

    const handleCancelQuantity = (productId: string) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: cartData?.items.find(item => item.productId === productId)?.quantity || 1
        }));
        // Set the editing state for this product to false
        setEditingQuantity((prev) => ({
            ...prev,
            [productId]: false
        }));
    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            router.push('/'); // Redirect to homepage or login page if not authenticated
        }
    }, [isAuthenticated, router]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100 text-gray-900">
            {isAuthenticated ? (
                <div className="flex flex-col md:flex-row w-full max-w-7xl gap-6">
                    {/* Cart Items Section */}
                    {loading ? (
                        <div className='w-full h-full flex flex-row justify-center items-center'>
                            <FontAwesomeIcon icon={faCircleNotch} className='animate-spin' spin size="2x" />
                        </div>
                    ) : (
                        <>
                            <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                                {cartEmpty ? (
                                    <p className="text-center font-bold text-lg">Your cart is empty.</p>
                                ) : cartData ? (
                                    <div className='flex flex-col justify-center items-center w-full gap-2'>
                                        <div className='text-xl font-bold w-full'>My Cart</div>
                                        <div className="space-y-6 w-full">
                                            {cartData.items.map((item) => (
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
                                                        <div className="text-bold">{renderStars(ratings[item.productId] || 0)}</div>
                                                        <div className="flex items-center mt-2">
                                                            <span className="font-semibold">Qty:</span>
                                                            {/* <input
                                                                type="number"
                                                                value={editingQuantity[item.productId] ? quantities[item.productId] ?? item.quantity : item.quantity}
                                                                className="ml-2 w-16 border border-gray-300 rounded-lg p-1 text-center focus:ring-2 focus:ring-blue-400 quantityNumberINputField"
                                                                style={{border:"2px solid black"}}
                                                                min="0"
                                                                onFocus={() => handleInputClick(item.productId)}
                                                                onChange={(e) => {
                                                                    const inputValue = e.target.value;
                                                                    const numericValue = inputValue === '' ? undefined : parseInt(inputValue, 10);
                                                                    setQuantities((prev) => ({
                                                                        ...prev,
                                                                        [item.productId]: numericValue !== undefined ? numericValue : 0
                                                                    }));
                                                                }}
                                                                onWheel={(e) => e.preventDefault()}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                                                        e.preventDefault();
                                                                    }
                                                                }}
                                                            /> */}
                                                            <input
                                                                type="number"
                                                                value={
                                                                    editingQuantity[item.productId]
                                                                        ? quantities[item.productId]?.toString() ?? item.quantity.toString()
                                                                        : item.quantity.toString()
                                                                }
                                                                className="ml-2 w-16 border border-gray-300 rounded-lg p-1 text-center focus:ring-2 focus:ring-blue-400 quantityNumberINputField"
                                                                style={{ border: "2px solid black" }}
                                                                min="0"
                                                                onFocus={() => handleInputClick(item.productId)}
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

                                                            {editingQuantity[item.productId] && quantities[item.productId] > 0 && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleUpdateQuantity(item.productId, quantities[item.productId])}
                                                                        className="ml-4 bg-blue-500 text-white rounded-lg px-2 py-1"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleCancelQuantity(item.productId)}
                                                                        className="ml-2 bg-red-500 text-white rounded-lg px-2 py-1"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDelete(item.productId)}
                                                        className="mt-4 px-4 py-2 text-red-600 hover:text-red-800 group"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="px-2 py-2 rounded-md" size='xl' />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='w-full h-full flex flex-row justify-center items-center'>
                                        <FontAwesomeIcon icon={faCircleNotch} spin size="2x" />
                                    </div>
                                )}
                                {cartData && cartData.items.length > 0 && (
                                    <button
                                        onClick={handleClearAll}
                                        className="mt-4 w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                            <div className="md:w-1/3 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                                <h2 className="text-xl font-bold mb-6 text-gray-700">Order Summary</h2>
                                {cartData && (
                                    <>
                                        <div className="flex justify-between text-lg py-2 border-b border-gray-200">
                                            <span>Subtotal</span>
                                            <span>${totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-lg py-2 border-b border-gray-200">
                                            <span>Shipping Estimate</span>
                                            <span className="text-blue-600 font-semibold">FREE</span>
                                        </div>
                                        <div className="flex justify-between text-lg py-2 font-semibold">
                                            <span>Total</span>
                                            <span>${totalAmount.toFixed(2)}</span>
                                        </div>
                                        <button className="w-full mt-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                                        onClick={()=>cartData && cartData.items.length>0? handleNavigation('/checkoutPageForAuthenticated'):alert("Please Add Products in the Cart")}
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    )}

                </div>
            ) : (
                <p className="text-center">Please log in to view your cart.</p>
            )}
        </div>
    );
}
