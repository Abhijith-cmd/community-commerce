"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import LocalHighlights from "@/components/localhighlights";
import RegionalHighlights from "@/components/RegionalHighlights/regional_highlights";
import LoginPage from "./loginPage/page";

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

const cache = {
  menuData: null as any,
  bannersData: null as any,
  footerData: null as any,
};

export default function Home() {
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const bannersToShow = 4; // Number of banners to show at a time

  // Fetch data in parallel and cache it
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!cache.menuData || !cache.bannersData || !cache.footerData) {
          const [menuResponse, bannersResponse, footerResponse] = await Promise.all([
            fetch("/api/MenuListRoutes"),
            fetch("/api/promotionalBannerRoutes"),
            fetch("/api/footerRoutes"),
          ]);

          cache.menuData = await menuResponse.json();
          cache.bannersData = await bannersResponse.json();
          cache.footerData = await footerResponse.json();
        }

        setMenuItems(cache.menuData.map((item: { name: string }) => item.name));
        setBanners(cache.bannersData);
        setFooterData(cache.footerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Memoized callback functions to prevent re-renders
  const nextBanners = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + bannersToShow) % banners.length);
  }, [banners.length, bannersToShow]);

  const prevBanners = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - bannersToShow + banners.length) % banners.length);
  }, [banners.length, bannersToShow]);

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
            <div className="flex items-center"></div>
            <div className="flex flex-wrap justify-end gap-4 font-bold items-center">
              <div className="block hover:underline cursor-pointer" onClick={() => handleNavigation('/contactUs')}>Contact Us</div>
              <span className="flex flex-row">
                <span className="block hover:underline cursor-pointer" onClick={() => handleNavigation('/signUpPage')}>Sign Up</span>
              </span>
              <select className="block outline-none px-2 py-1 text-center rounded-md">
                <option value="Language">Select Language</option>
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
              <a href="#" className="block">Cart <FontAwesomeIcon icon={faShoppingCart} size="lg" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu Section */}
      <section className="flex flex-wrap justify-center w-full px-4 py-3 font-bold">
        <div className="flex flex-wrap gap-6 sm:gap-12">
          {menuItems.map((menuItem, index) => (
            <div key={index}>
              <a href="#">{menuItem}</a>
            </div>
          ))}
        </div>
      </section>

      {/* Local Highlights and Login Section */}
      <section className="flex flex-col sm:flex-row w-full h-full py-4 bg-white">
        <div className="w-full max-h-full flex justify-center items-center">
          <div className="px-4 py-4">
            <LocalHighlights />
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
                    priority // Use priority for critical images
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
