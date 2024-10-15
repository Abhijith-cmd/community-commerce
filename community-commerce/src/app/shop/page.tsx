"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './styles.css'


// Define the interface for menu items
// interface MenuItem {
//     name: string; // or other properties if needed
// }

// interface MenuItem {
//     _id: string;
//     name: string;
//     sections: {
//         [key: string]: string[]; // This indicates sections will have string keys and array of strings as values
//     };
// }

// interface MenuItem {
//     _id: string;
//     name: string;
//     createdAt: string;
//     __v: number;
//     sections?: {
//         [key: string]: { // This can be a dynamic key
//             [key: string]: string[]; // Each section key maps to an array of strings
//         };
//     };
// }


interface MenuItem {
    _id: string;
    name: string;
    sections?: {
        [key: string]: string[]; // Each key can have an array of strings
    };
}




export default function Shop() {
    const [menuItems, setMenuItems] = useState<string[]>([]);


    //shop Menu Items
    const [shopMenuItems, setShopMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const router = useRouter();

    // Function to handle dropdown toggle
    const toggleDropdown = (id: string) => {
        setOpenDropdown(openDropdown === id ? null : id); // Toggle the dropdown
    };


    // interface Banner {
    //     _id: string;
    //     imageUrl: string;
    //     description: string;
    //     link: string;
    // }

    // interface FooterData {
    //     section_1: string[];
    //     section_2: string[];
    //     section_3: string[];
    //     section_4: string[];
    // }

    // const [banners, setBanners] = useState<Banner[]>([]);
    // const [footerData, setFooterData] = useState<FooterData | null>(null);
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const bannersToShow = 4; // Number of banners to show at a time
    // const [showProfileOptions, setShowProfileOptions] = useState(false);

    // const toggleProfileOptions = () => {
    //   setShowProfileOptions(!showProfileOptions);
    // };

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

    // Render the component
    if (loading) return <p>Loading...</p>;

    // Fetch promotional banners from the API
    // useEffect(() => {
    //     const fetchBanners = async () => {
    //         try {
    //             const response = await fetch('/api/promotionalBannerRoutes'); // Ensure your API route matches
    //             const data = await response.json();
    //             setBanners(data);
    //         } catch (error) {
    //             console.error('Error fetching banners:', error);
    //         }
    //     };

    //     fetchBanners();

    // }, []);

    // const nextBanners = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + bannersToShow) % banners.length);
    // };

    // const prevBanners = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex - bannersToShow + banners.length) % banners.length);
    // };

    // useEffect(() => {
    //     const fetchFooterData = async () => {
    //         const response = await fetch('/api/footerRoutes'); // Adjust the API route as needed
    //         const data = await response.json();
    //         setFooterData(data);
    //     };

    //     fetchFooterData();
    // }, []);



    return (
        <div className="flex flex-col flex-shrink overflow-x-hidden min-h-screen  text-black">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row h-auto w-full">
                {/* Logo Section */}
                <div className="w-full sm:w-2/5 md:w-1/5 bg-white flex justify-center items-center p-2">
                    <div className="flex justify-center items-center cursor-pointer" onClick={() => handleNavigation('/')}>Logo</div>
                </div>

                {/* Navigation Links */}
                <div className="w-full sm:w-3/5 md:w-4/5 bg-white flex flex-wrap">
                    <div className="flex justify-between px-3 py-2 w-full">
                        <div className="flex items-center">
                            {/* Header navigation */}
                        </div>

                        <div className="flex flex-wrap justify-end gap-4 font-bold items-center">
                            {/* <a href="" className="block">Contact Us</a> */}
                            <div><div className="flex flex-wrap justify-center w-full px-4 py-3 font-bold bg-white">
                                <div className="flex flex-wrap gap-6 sm:gap-12">
                                    {["Home", "Support", "Community"].map((menuItem, index) => (
                                        <div
                                            key={index}
                                            className="cursor-pointer"
                                            onClick={menuItem === "Home" ? () => handleNavigation('/') : undefined} // Add the onClick handler here
                                        >
                                            {menuItem}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            </div>
                            <div className="block hover:underline cursor-pointer" onClick={() => handleNavigation('/contactUs')}>Contact Us</div>
                            {/* <a href="" className="block">Login/Sign Up/Logout</a> */}
                            <span className='flex flex-row'>
                                {/* <span className='block hover:underline cursor-pointer' onClick={()=>handleNavigation('/loginPage')}>Login</span>/ */}
                                <span className='block hover:underline cursor-pointer' onClick={() => handleNavigation('/signUpPage')}>Sign Up</span></span>
                            <select className="block outline-none px-2 py-1 text-center rounded-md">
                                <option value="Language">Select Language</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                            </select>
                            {/* <a href="#" className="block" onClick={() => handleNavigation('/Profile')}>Profile</a> */}
                            {/* <div className='block hover:underline cursor-pointer' onClick={() => handleNavigation('/profile')}>Profile</div>
               */}
                            <div className="relative bg-white">
                            </div>
                            <a href="" className="block">Cart <FontAwesomeIcon icon={faShoppingCart} size="lg" /></a>
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
                                <div className="absolute left-0 top-11 bg-black text-black w-full flex flex-col px-8 py-4 dropdown" style={{ border: "2px solid white" }}>
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
            <div className="flex flex-col sm:flex-row w-full h-full">
                {/* Local Highlights Section */}
                <div className="w-full max-h-full bg-white flex justify-center items-center py-4">
                    <div className='px-4 py-4'>
                    </div>
                </div>

                {/* Login Page Section */}
                {/* <div className="w-full min-h-full  bg-white">
          <LoginPage />
        </div> */}
                <aside className="w-full sm:w-3/6 bg-white py-4">

                </aside>
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
    )
}