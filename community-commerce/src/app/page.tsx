"use client";
import React, { useState, useEffect } from 'react';
import LoginPage from "./loginPage/page";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import RegionalHighlights from '@/components/RegionalHighlights/regional_highlights';
import Image from 'next/image';
import LocalHighlights2 from '@/components/localHighlightsForHome/Page';
import  styles from './Slideshow.module.css';


export default function Home() {
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const router = useRouter();

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

  const [banners, setBanners] = useState<Banner[]>([]);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannersToShow = 4; // Number of banners to show at a time
  // const [showProfileOptions, setShowProfileOptions] = useState(false);

  // const toggleProfileOptions = () => {
  //   setShowProfileOptions(!showProfileOptions);
  // };

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Set total slides to 2
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        if (prevSlide < totalSlides - 1) {
          return prevSlide + 1; // Go to the next slide
        } else {
          return 0; // Loop back to the first slide
        }
      });
    }, 5000); // Change slide every 5 seconds
 
    return () => clearInterval(interval); // Cleanup on unmount
  }, [totalSlides]);

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

  // Function to handle click and navigate to a specific page
  const handleNavigation = (path: string) => {
    router.push(path);
  };

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
    <div className="flex flex-col flex-shrink overflow-x-hidden text-black">
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
      {/* <div className="flex flex-wrap justify-center w-full px-4 py-3 font-bold bg-white">
        <div className="flex flex-wrap gap-6 sm:gap-12">
          {menuItems.map((menuItem, index) => (
            <div key={index}>
              <div>{menuItem}</div>
            </div>
          ))}
        </div>
      </div> */}

<div className="flex flex-wrap justify-center w-full px-4 py-3 font-bold bg-white">
  <div className="flex flex-wrap gap-6 sm:gap-12">
    {menuItems.map((menuItem, index) => (
      <div key={index}>
        {menuItem === "Shop" ? (
          <div className='cursor-pointer' onClick={() => handleNavigation('/shop')}>{menuItem}</div>
        ) :  menuItem === "Events" ? (
          <div className='cursor-pointer' onClick={() => handleNavigation('/events')}>
            {menuItem}
          </div>
        ) : (
          <div className='cursor-pointer'>{menuItem}</div>
        )}
      </div>
    ))}
  </div>
</div>

<div className={styles.banner}>
  <div className={styles.slides}>
    <div
      className={`${styles.slide} ${styles.slide1}`}
      style={{ display: currentSlide === 0 ? 'block' : 'none' }}
    >
      <div className={styles.content}>
        <div className={styles.topText}>Shopping Festival</div>
        <div className={styles.mainText}>Connect and Collect</div>
      </div>
      <div className={styles.offer}>
        <div className={styles.discount}>up to</div>
        <div className={styles.discountValue}>50% OFF</div>
      </div>
      <button className={styles.shopButton}>Shop now</button>
    </div>
 
    <div
      className={`${styles.slide} ${styles.slide2}`}
      style={{ display: currentSlide === 1 ? 'block' : 'none' }}
    >
      <div className={styles.content}>
        <div className={styles.topText}>Limited Time Deal</div>
        <div className={styles.mainText}>Buy 1 Get 1 Free</div>
      </div>
      <div className={styles.offer}>
        <div className={styles.discount}>Hurry!</div>
        <div className={styles.discountValue}>Only Today</div>
      </div>
      <button className={styles.shopButton}>Grab the Deal</button>
    </div>
 
    <div
      className={`${styles.slide} ${styles.slide3}`}
      style={{ display: currentSlide === 2 ? 'block' : 'none' }}
    >
      <div className={styles.content}>
        <div className={styles.topText}>Exclusive Collection</div>
        <div className={styles.mainText}>New Arrivals</div>
      </div>
      <div className={styles.offer}>
        <div className={styles.discount}>Offer</div>
        <div className={styles.discountValue}>30% OFF</div>
      </div>
      <button className={styles.shopButton}>Explore Collection</button>
    </div>
  </div>
 
  {/* Dots for slide navigation */}
  <div className={styles.dotsContainer}>
    {Array.from({ length: 3 }, (_, index) => (
      <span
        key={index}
        className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
        onClick={() => setCurrentSlide(index)} // Assuming you have a function to set the current slide
      ></span>
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
            {/* <LocalHighlights /> */}
            <LocalHighlights2/>
            </div>
        </div>

        {/* Login Page Section */}
        {/* <div className="w-full min-h-full  bg-white">
          <LoginPage />
        </div> */}
          <aside className="w-full sm:w-3/6 bg-white py-4">
          <LoginPage />
        </aside>
      </div>

      {/* Divider */}
      <div className="bg-white h-[2px]"></div>

      {/* Promotional Banners Section */}
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
      <div className="flex flex-row flex-grow justify-evenly items-center px-16 py-4 bg-white text-black">
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
      {/* <div className='flex flex-row justify-evenly bg-white text-black'>
        <div className='font-bold'>© 2024 Company Name. All Rights Reserved</div>
        <div>Privacy Policy</div>
        <div>Terms And Conditions</div>
      </div> */}
    </div>
  );
}
