// import { useEffect, useState } from "react";
 
// interface Highlight {
//   title: string;
//   description: string;
//   date: string;
//   link: string;
// }
 
// interface CountryHighlights {
//   _id: string;
//   abbreviation: string;
//   country_name: string; 
//   highlights: Highlight[];
// }
 
// const Local_Highlights = () => {
//   const [countryHighlights, setCountryHighlights] = useState<CountryHighlights | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
 
//   const fetchHighlights = async (abbreviation: string) => {
//     try {
//       const res = await fetch(`/api/highlights?abbreviation=${abbreviation}`); // Update the endpoint to use country abbreviation
//       if (!res.ok) {
//         throw new Error("Failed to fetch highlights");
//       }
//       const data: CountryHighlights[] = await res.json(); // Expecting an array
//       setCountryHighlights(data[0]); // Set the first country's highlights
//     } catch (error) {
//       console.error("Error fetching highlights:", error);
//       setError("Failed to fetch local highlights");
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   useEffect(() => {
//     const getLocationAndFetchHighlights = async () => {
//       try {
//         const res = await fetch("https://ipinfo.io?token=e22317b476e9fb");
//         const locationData = await res.json();
//         const country = locationData.country || "Unknown"; // Get the country abbreviation
 
//         fetchHighlights(country); // Fetch highlights for the country
//       } catch (error) {
//         console.error("Error fetching location:", error);
//         setError("Could not determine your location.");
//         setLoading(false);
//       }
//     };
 
//     getLocationAndFetchHighlights();
//   }, []);
 
//   return (
//     <div className="local-highlights px-6 py-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg border border-gray-200">
//       <h2 className="text-2xl font-bold mb-4 text-blue-800">Local Highlights</h2>
 
//       {error && <p className="text-red-600 mb-4">{error}</p>}
 
//       {countryHighlights && (
//         <>
//           <h3 className="text-lg font-semibold mb-2 text-purple-700">
//             Highlights for {countryHighlights.country_name}
//           </h3>
 
//           {countryHighlights.highlights.length === 0 && !loading && !error ? (
//             <p className="text-gray-600">No local news or events available for your location.</p>
//           ) : (
//             <ul className="space-y-4">
//               {countryHighlights.highlights.map((highlight, index) => (
//                 <li
//                   key={index}
//                   className="bg-white p-4 rounded-md shadow-md hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-105">
//                   <div className="flex items-center">
//                     <h3 className="text-lg font-semibold text-blue-800 mr-2">
//                       {highlight.title}
//                     </h3>
//                     <p className="text-gray-700 text-lg">
//                       {highlight.description}
//                     </p>
//                   </div>
//                   <a href={highlight.link} className="text-purple-600 hover:underline">
//                     Read more
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </>
//       )}
//     </div>
//   );
// };
 
// export default Local_Highlights;
 
// import { useEffect, useState } from "react";
 
// interface Highlight {
//   title: string;
//   description: string;
//   date: string;
//   link: string;
//   isActive: boolean;
//   priority: number;
//   _id: string;
// }
 
// interface CountryHighlights {
//   _id: string;
//   abbreviation: string;
//   country_name: string;
//   highlights: Highlight[];
// }
 
// const Local_Highlights = () => {
//   const [countryHighlights, setCountryHighlights] = useState<CountryHighlights>({
//     _id: "",
//     abbreviation: "",
//     country_name: "",
//     highlights: [],
//   });
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
 
 
// const fetchHighlights = async (abbreviation: string) => {
//     try {
//       const res = await fetch(`/api/highlights?abbreviation=${abbreviation}`);
//       if (!res.ok) {
//         throw new Error("Failed to fetch highlights");
//       }
 
//       const data: CountryHighlights = await res.json(); // Change to reflect the actual structure
 
//       console.log("Fetched highlights data:", data); // Debugging log
 
//       // Set country highlights based on the response
//       setCountryHighlights(data);
 
//     } catch (error) {
//       console.error("Error fetching highlights:", error);
//       setError("Failed to fetch local highlights");
//     } finally {
//       setLoading(false);
//     }
//   };
 
 
 
//   useEffect(() => {
//     const getLocationAndFetchHighlights = async () => {
//       try {
//         const res = await fetch("https://ipinfo.io?token=e22317b476e9fb");
//         const locationData = await res.json();
//         const country = locationData.country || "Unknown";
 
//         fetchHighlights(country); // Fetch highlights for the country
//       } catch (error) {
//         console.error("Error fetching location:", error);
//         setError("Could not determine your location.");
//         setLoading(false);
//       }
//     };
 
//     getLocationAndFetchHighlights();
//   }, []);
 
//   return (
//     <div className="local-highlights px-6 py-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg border border-gray-200">
//            <h2 className="text-2xl font-bold mb-4 text-blue-800">Local Highlights</h2>
     
//            {error && <p className="text-red-600 mb-4">{error}</p>}
     
//            {countryHighlights && (
//             <>
//               <h3 className="text-lg font-semibold mb-2 text-purple-700">
//                 Highlights for {countryHighlights.country_name}
//               </h3>
     
//               {countryHighlights.highlights.length === 0 && !loading && !error ? (
//                 <p className="text-gray-600">No local news or events available for your location.</p>
//               ) : (
//                 <ul className="space-y-4">
//                   {countryHighlights.highlights.map((highlight, index) => (
//                     <li
//                       key={index}
//                       className="bg-white p-4 rounded-md shadow-md hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-105">
//                       <div className="flex items-center">
//                         <h3 className="text-lg font-semibold text-blue-800 mr-2">
//                           {highlight.title}
//                         </h3>
//                         <p className="text-gray-700 text-lg">
//                           {highlight.description}
//                         </p>
//                       </div>
//                       <a href={highlight.link} className="text-purple-600 hover:underline">
//                         Read more
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </>
//           )}
//         </div>
//   );
// };
 
// export default Local_Highlights;
import { useEffect, useState } from "react";
 
interface Highlight {
  title: string;
  description: string;
  date: string;
  link: string;
  isActive: boolean;
  priority: number;
  _id: string;
}
 
interface CountryHighlights {
  _id: string;
  abbreviation: string;
  country_name: string;
  highlights: Highlight[];
}
 
const Local_Highlights = () => {
  const [countryHighlights, setCountryHighlights] = useState<CountryHighlights>({
    _id: "",
    abbreviation: "",
    country_name: "",
    highlights: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 
 
const fetchHighlights = async (abbreviation: string) => {
    try {
      const res = await fetch(`/api/highlights?abbreviation=${abbreviation}`);
      if (!res.ok) {
        throw new Error("Failed to fetch highlights");
      }
 
      const data: CountryHighlights = await res.json(); // Change to reflect the actual structure
 
      console.log("Fetched highlights data:", data); // Debugging log
 
      // Set country highlights based on the response
      setCountryHighlights(data);
 
    } catch (error) {
      console.error("Error fetching highlights:", error);
      setError("Failed to fetch local highlights");
    } finally {
      setLoading(false);
    }
  };
 
 
 
  useEffect(() => {
    const getLocationAndFetchHighlights = async () => {
      try {
        const res = await fetch("https://ipinfo.io?token=e22317b476e9fb");
        const locationData = await res.json();
        const country = locationData.country || "Unknown";
 
        fetchHighlights(country); // Fetch highlights for the country
      } catch (error) {
        console.error("Error fetching location:", error);
        setError("Could not determine your location.");
        setLoading(false);
      }
    };
 
    getLocationAndFetchHighlights();
  }, []);
 
  return (
    <div className="local-highlights px-6 py-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg border border-gray-200">
           <h2 className="text-2xl font-bold mb-4 text-blue-800">Local Highlights</h2>
     
           {error && <p className="text-red-600 mb-4">{error}</p>}
     
           {countryHighlights && (
            <>
              <h3 className="text-lg font-semibold mb-2 text-purple-700">
                Highlights for {countryHighlights.country_name}
              </h3>
     
              {countryHighlights.highlights.length === 0 && !loading && !error ? (
                <p className="text-gray-600">No local news or events available for your location.</p>
              ) : (
                <ul className="space-y-4">
                  {countryHighlights.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="bg-white p-4 rounded-md shadow-md hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-105">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-blue-800 mr-2">
                          {highlight.title}
                        </h3>
                        <p className="text-gray-700 text-lg">
                          {highlight.description}
                        </p>
                      </div>
                      <a href={highlight.link} className="text-purple-600 hover:underline">
                        Read more
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
  );
};
 
export default Local_Highlights;