"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import Image from "next/image";
//import Local_Highlights from "@/components/local_highlights";
import { usePathname } from 'next/navigation';
import  styles from './Slideshow.module.css';

const Local_Highlights = dynamic(() => import('@/components/local_highlights'), { ssr: false });
const RegionalHighlights = dynamic(() => import('@/components/RegionalHighlights/regional_highlights'), { ssr: false });
const LoginPage = dynamic(() => import("./loginPage/page"), { ssr: false });

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

// Define the type for menu items
interface MenuItem {
  label: string;
  link: string;
}



export default function Home() {
  //const [menuItems, setMenuItems] = useState<string[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const bannersToShow = 4; // Number of banners to show at a time
  const menuItems:MenuItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Support', link: '/support' },
    { label: 'Community', link: '/community' },
    { label: 'Events', link: '/events' },
    { label: 'Blog', link: '/blog' },
    { label: 'About us', link: '/about_us' },
    { label: 'Shop', link: '/shop' }
  ];
  const currentRoute = usePathname();
  

  // Fetch data in parallel using Promise.all to reduce load time
  useEffect(() => {
    const fetchData = async () => {
      try {
//const [menuResponse, bannersResponse, footerResponse] = await Promise.all([
const [ bannersResponse, footerResponse] = await Promise.all([

          //fetch("/api/MenuListRoutes"),
          fetch("/api/promotionalBannerRoutes"),
          fetch("/api/footerRoutes")
        ]);

        //const menuData = await menuResponse.json();
        const bannersData = await bannersResponse.json();
        const footerData = await footerResponse.json();

        //menuItems(menuData.map((mitem: { name: string }) => item.name));
        setBanners(bannersData);
        setFooterData(footerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nextBanners = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + bannersToShow) % banners.length);
  }, [banners.length, bannersToShow]);

  const prevBanners = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - bannersToShow + banners.length) % banners.length);
  }, [banners.length, bannersToShow]);

  const handleNavigation = useCallback((path: string) => {
    router.push(path);
  }, [router]);
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

      <section className="flex flex-wrap justify-center w-full px-4 py-3 font-bold bg-black text-white">
  <div className="flex flex-wrap gap-6 sm:gap-12">
    {menuItems.map((menuItem, index) => (
      <div key={index}>
        <a
          href={menuItem.link}
          className={`hover:text-blue-400 transition duration-300 px-3 py-1 rounded-md ${
            currentRoute === menuItem.link
              ? 'bg-blue-500 text-white font-bold shadow-lg border-b-2 border-blue-700'
              : ''
          }`}
        >
          {menuItem.label}
        </a>
      </div>
    ))}
  </div>
</section>

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


      {/* Local Highlights and Login Section */}
      <section className="flex flex-col sm:flex-row w-full h-full py-4 bg-white">
        <div className="w-full max-h-full flex justify-center items-center">
          <div className="px-4 py-4">
            {/* <LocalHighlights /> */}
            <Local_Highlights/>
          </div>
        </div>
        <aside className="w-full sm:w-3/6 py-4">
          <LoginPage />
        </aside>
      </section>


      {/* Promotional Banners Section */}
      <section className="flex justify-center bg-white py-4">
        <button onClick={prevBanners} className="p-2 transition-transform duration-300 transform hover:scale-110">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="flex flex-row px-4 py-2 items-center w-full">
          {banners.length > 0 ? (
            banners.slice(currentIndex, currentIndex + bannersToShow).map((banner) => (
              <div key={banner._id} className="w-full sm:w-1/3 p-2 relative group">
                <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.description}
                    layout="responsive"
                    width={500}
                    height={300}
                    className="w-full h-auto rounded"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <div className="absolute bottom-4 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="font-semibold px-6 py-2 bg-white rounded-md">{banner.description}</h3>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p>No promotional banners available.</p>
          )}
        </div>
        <button onClick={nextBanners} className="p-2 transition-transform duration-300 transform hover:scale-110">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </section>

      {/* Regional Highlights Section */}
      <section className="flex flex-col sm:flex-row w-full h-auto bg-white py-4">
        <div className="w-full sm:w-3/5 px-4">
          <RegionalHighlights />
        </div>
      </section>

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
    </div>
  );
}
