// /pages/pdpPage/[id].tsx
"use client";
// import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import './styles.css'


// interface MenuItem {
//     _id: string;
//     name: string;
//     sections?: {
//         [key: string]: string[]; // Each key can have an array of strings
//     };
// }

interface Product {
    _id: string;
    name: string;
    primaryCategory: string;
    subCategory: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    currency: string;
    images: { url: string; altText: string; color: string }[];
    colors: { colorName: string; price: number; inventory: number,  _id: string; }[];
    material: string;
    brand: string;
    available: boolean;
    isOnSale: boolean;
    salePrice?: number;
    tags: string[];
    rating: number;
    inventory: number;
}

// interface Category {
//     _id: string;
//     category: Product[];
// }


const ProductDetailPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantities,setQuantities]=useState<number>(1)

    const router = useRouter();

    useEffect(() => {
        const fetchProductDetails = async () => {
          try {
            const response = await axios.get(
              `/api/productsBasedOnIdRoutes/${id}`
            );
            setProduct(response.data);
            setLoading(false);
            console.log(setQuantities);
            
          } catch (error) {
            console.error('Error fetching product details:', error);
            setLoading(false);
          }
        };
    
        fetchProductDetails();
      }, [id]);

      const handleNavigation = (path: string) => {
        router.push(path);
      };
    
      if (loading) {
        return <div>Loading product details...</div>;
      }
    
      if (!product) {
        return <div>Product not found</div>;
      }
  
    if (!id) {
      return <div>Loading...</div>; // Loading state if id is missing
    }
  
        // Render the component
        // if (loading) return <p>Loading...</p>;

    return (
    <div className="container mx-auto px-4 py-10">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Image Gallery */}
      <div className="flex-1">
        {/* <div className="flex justify-center mb-4">
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt={image.altText}
              width={500}
              height={500}
              layout="responsive"
              className="rounded-lg shadow-lg"
            />
          ))}
        </div> */}

{product.images && product.images.length > 0 && (
  <div className="flex justify-center mb-4">
    {product.images.map((image, index) => (
      <Image
        key={index}
        src={image.url}
        alt={image.altText}
        width={500}
        height={500}
        layout="responsive"
        className="rounded-lg shadow-lg"
      />
    ))}
  </div>
)}

      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        {/* <h2 className="text-xl text-gray-600 mb-4">
          {product.primaryCategory} - {product.subCategory}
        </h2> */}
        <p className="text-lg font-medium text-gray-800 mb-6">{product.shortDescription}</p>
        <p className="text-sm text-gray-600 mb-6">{product.longDescription}</p>

        {/* Pricing */}
        <div className="flex items-center mb-6">
          <span className="text-2xl font-semibold text-green-600">
            {product.currency} {product.price.toFixed(2)}
          </span>
          {/* {product.isOnSale && (
            <span className="ml-4 text-lg text-red-600 line-through">
              Sale Price: {product.currency} {product.salePrice?.toFixed(2)}
            </span>
          )} */}
        </div>

        {/* Color Options */}
        {product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Available Colors:</h3>
            <ul className="flex space-x-4">
              {product.colors.map((color) => (
                <li
                  key={color._id}
                  className={`w-10 h-10 rounded-full border cursor-pointer ${
                    color.colorName === selectedColor ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.colorName }}
                  onClick={() => setSelectedColor(color.colorName)}
                ></li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Tags:</h3>
          <ul className="flex space-x-2">
            {product.tags.map((tag, index) => (
              <li
                key={index}
                className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center mb-6">
          <span className=" font-semibold">
            Quantity: 
            <input type="number"
             className='QuantityNumberForAddToCart w-1/6 px-2 py-1 outline-0 rounded-md flex flex-row justify-center items-center'
              style={{border:"2px solid black"}}
              onWheel={(e)=>e.preventDefault()}
              onKeyDown={(e)=>e.preventDefault()}
               value={quantities} />
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300" onClick={()=>handleNavigation('/cart')}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
    );
  };
  
  export default ProductDetailPage;