"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
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

    const [copyAddress, setCopyAddress] = useState<boolean>(false);

    // States for dropdown visibility
    const [showShippingAddress, setShowShippingAddress] = useState<boolean>(false);
    const [showShippingMethod, setShowShippingMethod] = useState<boolean>(false);
    const [showBillingAddress, setShowBillingAddress] = useState<boolean>(false);
    const [showPaymentMethod, setShowPaymentMethod] = useState<boolean>(false);
    // const [showGiftCard, setShowGiftCard] = useState<boolean>(true);

    const [shippingCost, setShippingCost] = useState(0);
    const [shippingMethod, setShippingMethod] = useState('');

    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

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
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userId]);

    useEffect(() => {
        if (!isAuthenticated) router.push('/');
    }, [isAuthenticated, router]);

    // Handle checkbox change to copy the shipping address to billing address
    const handleCopyAddress = () => {
        setCopyAddress(!copyAddress);
        if (!copyAddress) {
            // Copy shipping address to billing address
            setBillingLine1(addressLine1);
            setBillingLine2(addressLine2);
            setBillingCity(addressCity);
            setBillingState(addressState);
            setBillingCountry(addressCountry);
            setBillingPincode(addressPincode);
            setBillingAddress(`${addressCity},${addressState},${addressCountry},${addressPincode}`)
        } else {
            // Clear billing address if unchecked
            setBillingLine1('');
            setBillingLine2('');
            setBillingCity('');
            setBillingState('');
            setBillingCountry('');
            setBillingPincode('');
            setBillingAddress('')
        }
    };

    useEffect(() => {
        console.log('Billing Line 1:', billingLine1);
        console.log('Billing Line 2:', billingLine2);
        console.log('Billing City:', billingCity);
        console.log('Billing State:', billingState);
        console.log('Billing Country:', billingCountry);
        console.log('Billing Pincode:', billingPincode);
        console.log('Billing Address:', billingAddress);
        console.log("the set Quantities value",setQuantities);
        

        // console.log('Shipping cost:', shippingCost);
        // console.log('Shipping method:', shippingMethod);


        console.log(cartEmpty, imageUrls, ratings, "testing purposes");

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
                setLoading(false); // Stop loading
            }
        };

        fetchCartData();
    }, [userId, token,]);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    // Update the shipping cost based on selected value
    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const shippingEstimate = parseFloat(e.target.value);
        setShippingCost(shippingEstimate);
        setShippingMethod(e.target.id)
        console.log('Updated Shipping Cost:', shippingEstimate);
        console.log('Updated Shipping Method:', e.target.id);
    };


    // const handleOrderSubmit = async () => {
    //     const orderData = {
    //       userId: `${userId}`,
    //       billingAddress: {
    //         line1: `${billingLine1}`,
    //         line2: `${billingLine2}`,
    //         city: `${billingCity}`,
    //         state: `${billingState}`,
    //         country: `${billingCountry}`,
    //         postalCode: `${billingPincode}`,
    //       },
    //       shippingMethod: 'UPS',
    //       shippingEstimate: `${shippingCost ? shippingCost.toFixed(2):''}`,
    //       items: [
    //         {
    //           productId: '670fc90b8ed1bbd87bc2d76c',
    //           productName: 'Leather Sofa',
    //           price: 1499.99,
    //           productColor: 'Dark Brown',
    //           quantity: 1,
    //         },
    //       ],
    //       totalAmount: 1499.99,
    //     };
      
    //     try {
    //       const response = await axios.post('/api/ConfirmYourOrderRoutes', orderData, {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       });
      
    //       console.log('Awaiting Order Confirmation', response.data);
    //     } catch (error) {
    //       console.error('Error submitting order:', error);
    //     }
    //   };


    const handleOrderSubmit = async () => {
        // Constructing order data from `cartData` and other values
        const orderData = {
            userId: `${userId}`, // Assuming `userId` is available in the component scope
            billingAddress: {
                line1: `${billingLine1}`,   // Set these billing fields as per your state or props
                line2: `${billingLine2}`,
                city: `${billingCity}`,
                state: `${billingState}`,
                country: `${billingCountry}`,
                postalCode: `${billingPincode}`,
            },
            shippingMethod: `${shippingMethod}`,  // or dynamically set the shipping method if needed
            shippingEstimate: `${shippingCost ? shippingCost.toFixed(2) : ''}`,
            items: cartData?.items.map(item => ({
                productId: item.productId,
                productName: item.productName,
                price: item.productPrice,
                productColor: item.productColor,
                quantity: quantities[item.productId] || item.quantity, // quantity based on user input or default item quantity
            })),
            totalAmount: cartData?.totalAmount,
        };
    
        try {
            const response = await axios.post('/api/ConfirmYourOrderRoutes', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    console.log('the data in the response body',orderData);
    
            console.log('Awaiting Order Confirmation', response.data);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };
    

    //   useEffect(()=>{
    //     console.log('Shipping cost:', shippingCost);
    //     console.log('Shipping method:', shippingMethod);

    //   },[shippingCost,shippingMethod])

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
            {isAuthenticated ? (
                loading ? (
                    <div className="flex items-center justify-center h-full">
                        <FontAwesomeIcon icon={faCircleNotch} spin size="2x" className="text-gray-600" />
                    </div>
                ) : (
                    <div className='flex flex-col w-full gap-4 md:flex-row'>
                        <form action="#"
                            className="w-full"
                            // onSubmit={(e) => { e.preventDefault();  e.stopPropagation(); handleNavigation('/confirmOrderPageForAuthenticated'); }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                        
                                // Add validation checks here
                                if (!addressLine1 || !billingLine1 || !billingLine2 || !billingCity || !billingState || !billingCountry || !billingPincode || !shippingCost ) {
                                    alert("Please fill in all required fields.");
                                    return;
                                }
                        
                                // Proceed to navigation if all validations pass
                                handleNavigation('/confirmOrderPageForAuthenticated');
                            }}
                            >
                            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-6 checkoutPage">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h2>

                                {/* Billing Address Dropdown */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center"  onClick={(e) => {e.stopPropagation(); setShowShippingAddress(!showShippingAddress)}}>
                                        <h3 className="text-lg font-semibold text-gray-700">Shipping Address</h3>
                                        <button type='button' onClick={(e) => {e.stopPropagation(); setShowShippingAddress(!showShippingAddress)}}>
                                            <FontAwesomeIcon icon={showShippingAddress ? faChevronUp : faChevronDown} />
                                        </button>
                                    </div>
                                    {showShippingAddress && (
                                        <div className="pl-4 space-y-2 text-gray-600 font-semibold flex flex-col justify-center items-center w-full" >
                                            <div className='w-full'>
                                                <input type="text" className='rounded-md px-2 py-1 w-full' value={addressLine1} style={{ border: "2px solid black" }} />
                                            </div>
                                            <div className='w-full'>
                                                <input type="text" className='rounded-md px-2 py-1 w-full' value={addressLine2} style={{ border: "2px solid black" }} />
                                            </div>
                                            <div className='w-full'>
                                                <input type="text" className='rounded-md px-2 py-1 w-full' value={`${addressCity}, ${addressState}, ${addressCountry}, ${addressPincode}`} style={{ border: "2px solid black" }} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Shipping Method Dropdown */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center" onClick={(e) =>{e.stopPropagation(); setShowShippingMethod(!showShippingMethod)}}>
                                        <h3 className="text-lg font-semibold text-gray-700">Shipping Method</h3>
                                        <button type='button' onClick={(e) =>{e.stopPropagation(); setShowShippingMethod(!showShippingMethod)}}>
                                            <FontAwesomeIcon icon={showShippingMethod ? faChevronUp : faChevronDown} />
                                        </button>
                                    </div>
                                    {showShippingMethod && (
                                        <div className="pl-4 space-y-2 font-semibold">
                                            <div className="flex items-center gap-2">
                                                <input type="radio" id="FedEx" value='6' name="shipping" className="mr-2" onChange={handleShippingChange} required />
                                                <label htmlFor="fedEx" className="text-gray-600">FedEx</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input type="radio" id="UPS" value='7' name="shipping" className="mr-2" onChange={handleShippingChange} required />
                                                <label htmlFor="UPS" className="text-gray-600">UPS</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input type="radio" id="BlueDart" value='6.5' name="shipping" className="mr-2" onChange={handleShippingChange} required />
                                                <label htmlFor="BlueDart" className="text-gray-600">BlueDart</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input type="radio" id="DHL" value='8' name="shipping" className="mr-2" onChange={handleShippingChange} required />
                                                <label htmlFor="DHL" className="text-gray-600">DHL</label>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Billing Address Dropdown */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center" onClick={(e) =>{e.stopPropagation(); setShowBillingAddress(!showBillingAddress)}}>
                                        <h3 className="text-lg font-semibold text-gray-700">Billing Address</h3>
                                        <button type='button' onClick={(e) =>{e.stopPropagation(); setShowBillingAddress(!showBillingAddress)}}>
                                            <FontAwesomeIcon icon={showBillingAddress ? faChevronUp : faChevronDown} />
                                        </button>
                                    </div>
                                    {showBillingAddress && (
                                        <div className="pl-4 space-y-2 text-gray-600 font-semibold flex flex-col" >
                                            <span><input type="checkbox" checked={copyAddress} onChange={handleCopyAddress} name="" id="" /> Use the Shipping Address</span>
                                            <div>
                                                <input
                                                    type="text"
                                                    className='rounded-md px-2 py-1 w-full'
                                                    value={billingLine1}
                                                    onChange={(e) => setBillingLine1(e.target.value)}
                                                    style={{ border: "2px solid black" }}
                                                    placeholder='Enter Address Line 1'
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className='rounded-md px-2 py-1 w-full'
                                                    value={billingLine2}
                                                    onChange={(e) => setBillingLine2(e.target.value)}
                                                    style={{ border: "2px solid black" }}
                                                    placeholder='Enter Address Line 2'
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className='rounded-md px-2 py-1 w-full'
                                                    value={billingCity}
                                                    onChange={(e) => setBillingCity(e.target.value)}
                                                    style={{ border: "2px solid black" }}
                                                    placeholder='Enter City'
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    className='rounded-md px-2 py-1 w-full'
                                                    value={billingState}
                                                    onChange={(e) => setBillingState(e.target.value)}
                                                    style={{ border: "2px solid black" }}
                                                    placeholder='Enter State'
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    className='rounded-md px-2 py-1 w-full'
                                                    value={billingCountry}
                                                    onChange={(e) => setBillingCountry(e.target.value)}
                                                    style={{ border: "2px solid black" }}
                                                    placeholder='Enter Country'
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <input
                                                    type="text"
                                                    className='rounded-md px-2 py-1 w-full'
                                                    value={billingPincode}
                                                    onChange={(e) => setBillingPincode(e.target.value)}
                                                    style={{ border: "2px solid black" }}
                                                    placeholder='Enter Postcode'
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Payment Method Dropdown */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center" onClick={(e) =>{e.stopPropagation(); setShowPaymentMethod(!showPaymentMethod)}}>
                                        <h3 className="text-lg font-semibold text-gray-700">Payment Method</h3>
                                        <button type='button' onClick={(e) =>{e.stopPropagation(); setShowPaymentMethod(!showPaymentMethod)}}>
                                            <FontAwesomeIcon icon={showPaymentMethod ? faChevronUp : faChevronDown} />
                                        </button>
                                    </div>
                                    {showPaymentMethod && (
                                        <div className="pl-4 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <input type="radio" id="credit" name="payment" className="mr-2" />
                                                <label htmlFor="credit" className="text-gray-600">Credit Card</label>
                                            </div>

                                            {/* Gift Card Dropdown */}
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center"
                                                // onClick={() => setShowGiftCard(!showGiftCard)}
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-700">Gift Card</h3>
                                                    {/* <button onClick={() => setShowGiftCard(!showGiftCard)}>
                                                    <FontAwesomeIcon icon={showGiftCard ? faChevronUp : faChevronDown} />
                                                </button> */}
                                                </div>
                                                {/* {showGiftCard && ( */}
                                                <div className="pl-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter gift card code"
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                </div>
                                                {/* )} */}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button type='submit' onClick={handleOrderSubmit} className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200" >
                                    Complete Purchase
                                </button>
                            </div>
                        </form>

                        <div className="md:w-1/3 h-fit bg-white p-6 rounded-xl shadow-md border border-gray-200">
                            <h2 className="text-xl font-bold mb-6 text-gray-700">Order Summary</h2>
                            {cartData && (
                                <>
                                    <div className="flex justify-between text-lg py-2 border-b border-gray-200">
                                        <span>Subtotal</span>
                                        <span>${cartData.totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg py-2 border-b border-gray-200">
                                        <span>Shipping Estimate</span>
                                        <span className="text-blue-600 font-semibold">${shippingCost ? shippingCost.toFixed(2) : 'FREE'}</span>
                                    </div>
                                    <div className="flex justify-between text-lg py-2 font-semibold">
                                        <span>Total</span>
                                        <span>${(cartData.totalAmount + shippingCost).toFixed(2)}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )
            ) : (
                <p className="text-center text-gray-600">Please log in to view your cart.</p>
            )}
        </div>
    );
}

