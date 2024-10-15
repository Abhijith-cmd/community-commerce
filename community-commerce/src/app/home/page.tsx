"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import LocalHighlights from '@/components/localhighlights';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import RegionalHighlights from '@/components/RegionalHighlights/regional_highlights';
import Image from 'next/image';
import LocalHighlights2 from '@/components/localHighlightsForHome/Page';


export default function Home() {
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // State to store userId
  // const [username, setUsername] = useState<string>(''); // To store the username
  // const [firstName, setFirstName] = useState<string>(''); // To store the username
  // const [lastName, setLastName] = useState<string>(''); // To store the username
  const [fullname, setFullName] = useState<string>('');
  const router = useRouter();
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const { token } = useAuth() // Use the token from AuthContext
  const { isAuthenticated } = useAuth();
  const { setToken } = useAuth();
  const [countryName,setCountryName] = useState<string>('');


  interface Banner {
    _id: string;
    imageUrl: string;
    description: string;
    link: string;
  }

  interface FooterData {
    section_1: string[];
    section_2: string[];
    section_3: string[];
    section_4: string[];
  }

  const countryAbbreviations: { [key: string]: string } = {
    "United States": "US",
    "Canada": "CA",
    "Australia": "AU",
    "Germany": "DE",
    "France": "FR",
    "United Kingdom": "GB",
    "India": "IN",
    // Add more countries as needed
  };

  // Function to convert country name to uppercase abbreviation
const getCountryAbbreviation = (country: string): string => {
  const abbreviation = countryAbbreviations[country] || country; // Default to country name if not found
  return abbreviation.toUpperCase();
};


  const [banners, setBanners] = useState<Banner[]>([]);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannersToShow = 4; // Number of banners to show at a time
   const [countryAbbreviation, setCountryAbbreviation] = useState<string>('');
   const [abbreviation, setAbbreviation] = useState<string>(''); 

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  // Fetch menu items from the API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/MenuListRoutes');
        const data = await response.json();
        const menuNames = data.map((item: { name: string }) => item.name); // Extract names from the data
        setMenuItems(menuNames);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Fetch protected data when token is available
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

        //  // Fetch the username using the userId
        //  try {
        //   console.log("the user ID 2nd one",userId);
        //   const userResponse = await axios.get(`/api/loginRoutes/${userId}`);
        //   setUsername(userResponse.data.userId); // Assuming the API returns a 'username' field
        //   console.log(userResponse.data.userId);

        // } catch (error) {
        //   console.error('Error fetching username:', error);
        // }

        // Handle the response data here
        console.log('Protected Data:', response.data);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };

    fetchProtectedData();
  }, [token, userId]);

   // Effect to update abbreviation when countryName changes
   useEffect(() => {
    if (countryName) {
      getCountryAbbreviation(countryName);
      console.log(countryAbbreviation);
      
    }
  }, [countryName]);

  // Fetch username once the userId is set
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
        setCountryName(userResponse.data.address.country)
        setCountryAbbreviation(userResponse.data.address.country); 
        console.log(userResponse.data.address.country,"the name of the user's country");
        

      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [userId]); // Only runs when userId changes

  useEffect(()=>{
console.log("the user country name in useEffect",countryName);

  },[countryName])

    // Update abbreviation whenever the country changes
    useEffect(() => {
      setAbbreviation(getCountryAbbreviation(countryName));
    }, [countryName]); 

  // const handleLogout = async () => {
  //   try {
  //       await axios.post('/api/logoutRoutes', { token });
  //       setToken(null); // Clear token from context
  //       router.push('/loginPage'); // Redirect to home or login page
  //   } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //           // Handle known Axios error
  //           console.error('Error logging out:', error.response?.data?.error || error.message);
  //       } else {
  //           // Handle other unknown errors
  //           console.error('Error logging out:', error);
  //       }
  //   }
  // };

  const handleLogout = async () => {
    if (!token) {
      console.error('No token available for logout.');
      return; // Exit early if token is not available
    }
    console.log('Token during logout:', token); // Check the token value

    try {
      await axios.post('/api/logoutRoutes', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToken(null); // Clear token from context
      router.push('/'); // Redirect to home or login page
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error logging out:', error.response?.data?.error || error.message);
      } else {
        console.error('Error logging out:', error);
      }
    }
  };




  // Function to handle click and navigate to a specific page
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);


  // Fetch promotional banners from the API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/promotionalBannerRoutes'); // Ensure your API route matches
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
    // Set an interval to fetch every X seconds (e.g., 10 seconds)
    // const intervalId = setInterval(fetchBanners, 3000);

    // Cleanup function to clear the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, []);

  const nextBanners = () => {
    setCurrentIndex((prevIndex) => (prevIndex + bannersToShow) % banners.length);
  };

  const prevBanners = () => {
    setCurrentIndex((prevIndex) => (prevIndex - bannersToShow + banners.length) % banners.length);
  };

  useEffect(() => {
    const fetchFooterData = async () => {
      const response = await fetch('/api/footerRoutes'); // Adjust the API route as needed
      const data = await response.json();
      setFooterData(data);
    };

    fetchFooterData();
  }, []);

  return (
    <div>
      {/* Display login page if not authenticated */}
      {isAuthenticated && (
        <div className="flex flex-col flex-shrink overflow-x-hidden text-black">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row h-auto w-full">
            {/* Logo Section */}
            <div className="w-full sm:w-2/5 md:w-1/5 bg-white flex justify-center items-center p-2">
              <div className="flex justify-center items-center  cursor-pointer" onClick={() => handleNavigation('/home')}>Logo</div>
            </div>

            {/* Navigation Links */}
            <div className="w-full sm:w-3/5 md:w-4/5 bg-white flex flex-wrap">
              <div className="flex justify-between px-3 py-2 w-full">
                <div className="flex items-center">
                  {/* Header navigation */}
                </div>

                <div className="flex flex-wrap justify-end gap-4 font-bold items-center">
                  <div className="block">{fullname}</div>
                  <a href="" className="block">Contact Us</a>
                  {/* <a href="" className="block">Login/Sign Up/Logout</a> */}
                  <span className='flex flex-row'><span className='block hover:underline cursor-pointer' onClick={handleLogout} >Logout</span>
                    {/* /<span className='block hover:underline cursor-pointer' onClick={()=>handleNavigation('/signUpPage')}>Sign Up</span> */}
                  </span>
                  {/* <select className="block outline-none px-2 py-1 text-center rounded-md">
                  <option value="Language">Select Language</option>
                  <option value="English">English</option>
                  <option value="French">French</option>
                </select> */}
                  {/* <a href="#" className="block" onClick={() => handleNavigation('/Profile')}>Profile</a> */}
                  {/* <div className='block hover:underline cursor-pointer' onClick={() => handleNavigation('/profile')}>Profile</div>
                 */}
                  <div className="relative bg-white">
                    <div
                      className='block hover:underline cursor-pointer'
                      onClick={toggleProfileOptions}
                    >
                      Profile
                    </div>

                    {/* Dropdown Menu */}
                    {showProfileOptions && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md text-center">
                        {/* <a href="/view-profile" className="block px-4 py-2 hover:bg-gray-100">View Profile</a> */}
                        <div className='block hover:underline cursor-pointer' onClick={() => handleNavigation('/')}>Name</div>
                        {/* <a href="/edit-profile" className="block px-4 py-2 hover:bg-gray-100">Edit Profile</a> */}
                        <div className='block hover:underline cursor-pointer' onClick={() => handleNavigation('/profile')}>Edit Profile</div>
                        {/* <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</a> */}
                        <div className='block hover:underline cursor-pointer' onClick={handleLogout}>Logout</div>
                      </div>
                    )}
                  </div>
                  <a href="" className="block">Cart <FontAwesomeIcon icon={faShoppingCart} size="lg" /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="bg-white h-[2px]"></div>

          {/* Main Menu Section */}
          <div className="flex flex-wrap justify-center w-full px-4 py-3 font-bold bg-white">
            <div className="flex flex-wrap gap-6 sm:gap-12">
              {menuItems.map((menuItem, index) => (
                <div key={index}>
                  <a href="">{menuItem}</a>
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
                {/* <LocalHighlights country={abbreviation} countryName={countryName} />
                <LocalHighlights2/> */}
                   {countryName  ? ( 
          <LocalHighlights country={abbreviation} countryName={countryName} />
        ) : (
          <LocalHighlights2 /> 
        )}
                </div>
            </div>

            {/* Login Page Section */}
            <div className="w-full bg-white">
              {/* <LoginPage /> */}
            </div>
          </div>

          {/* Divider */}
          <div className="bg-white h-[2px]"></div>

          {/* Promotional Banners Section */}
          {/* <div className="flex justify-center bg-white h-16">
          <div>Promotional Banners</div>
        </div> */}
          <div className="flex justify-center bg-white">
            <div className='flex items-center'>
              <button onClick={prevBanners} className="p-2 transition-transform duration-300 transform hover:scale-110">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </div>
            <div className='flex flex-row px-4 py-2 scroll-smooth items-center w-full'>
              {banners.length > 0 ? (
                banners.slice(currentIndex, currentIndex + bannersToShow).map((banner) => (
                  <div key={banner._id} className="w-full sm:w-1/3 p-2 relative group"> {/* Added relative for absolute positioning */}
                    <a
                      href={banner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block" // Make the entire div clickable
                    >
                      {/* <img
                    src={banner.imageUrl}
                    alt={banner.description} // Better accessibility
                    className="w-full h-auto rounded"
                    style={{ maxHeight: '200px', objectFit: 'cover' }} // Maintain aspect ratio and prevent overflow
                  /> */}
                      <Image
                        src={banner.imageUrl}
                        alt={banner.description}
                        layout="responsive"
                        width={500} // These values define the aspect ratio
                        height={300} // Adjust the width and height ratio to fit your needs
                        className="w-full h-auto rounded"
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                      <div className="absolute bottom-4 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"> {/* Hover effect */}
                        <h3 className="font-semibold px-6 py-2">
                          <div className='description px-2 py-2 rounded-md text-black bg-white'>
                            {banner.description}
                          </div>
                        </h3>
                      </div>
                    </a>
                  </div>
                ))
              ) : (
                <p>No promotional banners available.</p>
              )}
            </div>
            <div className='flex items-center'>
              <button onClick={nextBanners} className="p-2 transition-transform duration-300 transform hover:scale-110">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>


          {/* Divider */}
          <div className="bg-white h-[2px]"></div>

          {/* Regional Highlights Section */}
          <div className="flex flex-col sm:flex-row w-full h-auto">
            <div className="w-full sm:w-3/5 px-4 py-2 bg-white"><RegionalHighlights /></div>
            <div className="bg-white"></div>
            <div className="w-full sm:w-2/5 bg-white"></div>
          </div>

          {/* Divider */}
          <div className="bg-white"></div>

          {/* Footer */}
          <div className="flex flex-row flex-grow justify-evenly items-center px-16 py-4 bg-white">
            <div className='flex flex-col px-2 py-2'>
              {footerData && footerData.section_1 && (
                <ul>
                  {footerData.section_1.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>)}
            </div>
            <div className='px-2 py-2'>
              {footerData && footerData.section_2 && (
                <ul>
                  {footerData.section_2.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>)}
            </div>
            <div className='px-2 py-2'>
              {footerData && footerData.section_3 && (
                <ul>
                  {footerData.section_3.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>)}
            </div>
            <div className='px-2 py-2'>
              {footerData && footerData.section_4 && (
                <ul>
                  {footerData.section_4.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>)}
            </div>
          </div>
        </div>
      
  )
}
    </div >

  )
}