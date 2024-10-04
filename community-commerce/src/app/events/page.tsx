"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
//import router from "next/router";
//import Image from "next/image";
//import Local_Highlights from "@/components/local_highlights";
import { usePathname } from 'next/navigation';


const Local_Highlights = dynamic(() => import('@/components/local_highlights'), { ssr: false });
const Regional_Highlights = dynamic(() => import('@/components/RegionalHighlights/regionalhighlights'), { ssr: false });



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

export default function Events() {

    const [footerData, setFooterData] = useState<FooterData | null>(null);
    //const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();
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
const [footerResponse] = await Promise.all([

          //fetch("/api/MenuListRoutes"),
          //fetch("/api/promotionalBannerRoutes"),
          fetch("/api/footerRoutes")
        ]);

        const footerData = await footerResponse.json();
        setFooterData(footerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
        };
      
        fetchData();
      }, []);
      
      const handleNavigation = useCallback((path: string) => {
        router.push(path);
      }, [router]);
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

    
          {/* Local Highlights */}
            <div className="w-full max-h-full">
              <div className="px-4 py-4">
                {/* <LocalHighlights /> */}
                <Local_Highlights/>
              </div>
            </div>

            {/* Regional Highlights Section */}
            <div className="w-full max-h-full flex">
              <div className="px-4 py-4">
          <Regional_Highlights/>
            </div>
         </div>
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