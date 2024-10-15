// import {  useState } from 'react';
 
// interface Highlight {
//   title: string;
//   description: string;
//   link: string;
// }
 
// interface RegionHighlights {
//   _id: string;
//   region: string;
//   highlights: Highlight[];
// }
 
// const RegionalHighlights = () => {
//   const [region, setRegion] = useState<string>(''); // User can input region
//   const [regionHighlights, setRegionHighlights] = useState<RegionHighlights | null>(null);
//   const [loading, setLoading] = useState<boolean>(false); // Loading set to false initially
//   const [error] = useState<string | null>(null);
 
//   const fetchHighlights = async (region: string) => {
//     setLoading(true); // Set loading to true when fetching data
//     try {
//       const res = await fetch(`/api/regionalHighlightsRoutes?region=${region}`);
//     //   if (!res.ok) {
//     //     throw new Error('Failed to fetch highlights');
//     //   }
//       const data: RegionHighlights[] = await res.json();
//       setRegionHighlights(data[0]);
//     } catch (error) {
//       console.error('Error fetching highlights:', error);
//     //   setError('Failed to fetch regional highlights');
//     } finally {
//       setLoading(false); // Set loading to false after fetching is complete
//     }
//   };
 
//   // Handle region submit on button click
//   const handleRegionSubmit = () => {
//     if (region) {
//       fetchHighlights(region);
//     } else {
//     //   setError('Please enter a valid region');
//     }
//   };
 
//   return (
//     <div className="regional-highlights px-6 py-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg border border-gray-200">
//       <h2 className="text-2xl font-bold mb-4 text-blue-800">Enter Your Region</h2>
 
//       {/* Input box for region */}
//       <div className="mb-4">
//         <input
//           type="text"
//           value={region}
//           onChange={(e) => setRegion(e.target.value)}
//           placeholder="Enter region"
//           className="p-2 border border-gray-300 rounded mr-2"
//         />
//         <button
//           onClick={handleRegionSubmit}
//           className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
//           Get Highlights
//         </button>
//       </div>
 
//       {error && <p className="text-red-600 mb-4">{error}</p>}
 
//       {loading ? (
//         <p className="text-gray-600">Loading...</p>
//       ) : (
//         regionHighlights && (
//           <>
//             <h3 className="text-lg font-semibold mb-2 text-purple-700">
//               Highlights for {regionHighlights.region}
//             </h3>
 
//             {regionHighlights.highlights.length === 0 && !loading && !error ? (
//               <p className="text-gray-600">No local news or events available for this region.</p>
//             ) : (
//               <ul className="space-y-4">
//                 {regionHighlights.highlights.map((highlight, index) => (
//                   <li
//                     key={index}
//                     className="bg-white p-4 rounded-md shadow-md hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-105">
//                     <div className="flex items-center">
//                       <h3 className="text-lg font-semibold text-blue-800 mr-2">
//                         {highlight.title}
//                       </h3>
//                       <p className="text-gray-700 text-lg">{highlight.description}</p>
//                     </div>
//                     <a href={highlight.link} className="text-purple-600 hover:underline">
//                       Read more
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </>
//         )
//       )}
//     </div>
//   );
// };
 
// export default RegionalHighlights;

import { useCallback, useEffect, useState } from "react";
 
interface Highlight {
  title: string;
  description: string;
  link: string;
}
 
interface RegionHighlights {
  _id: string;
  region: string;
  highlights: Highlight[];
}
 
const RegionalHighlights = () => {
  const [regions, setRegions] = useState<string[]>([]); // List of regions
  const [searchTerm, setSearchTerm] = useState<string>(''); // The search input value
  const [filteredRegions, setFilteredRegions] = useState<string[]>([]); // List of regions matching search term
  const [regionHighlights, setRegionHighlights] = useState<RegionHighlights | null>(null); // Highlights for the selected region
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userRegion, setUserRegion] = useState<string>(''); // Default region based on user location
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false); // To control dropdown visibility
 
  // Fetch regions from the database
  const fetchRegions = async () => {
    try {
      const res = await fetch('/api/regionRoutes');
      console.log(res);
      
      if (!res.ok) {
        throw new Error("Failed to fetch regions");
      }
      const data: string[] = await res.json();
      setRegions(data);
      console.log("data from regional highlights",data);
      
      setFilteredRegions(data); // Initially, show all regions in the dropdown
    } catch (error) {
      console.error('Error fetching regions:', error);
      setError("Failed to fetch regions");
    }
  };
 
  // Fetch highlights based on the selected region
  const fetchHighlights = async (region: string) => {
    try {
      const res = await fetch(`/api/regionalHighlightsRoutes?region=${region}`);
      if (!res.ok) {
        throw new Error("Failed to fetch highlights");
      }
      const data: RegionHighlights[] = await res.json();
      setRegionHighlights(data[0]);
    } catch (error) {
      console.error("Error fetching highlights:", error);
      setError("Failed to fetch local highlights");
    } finally {
      setLoading(false);
    }
  };
 
  // Get user's region and fetch default highlights based on location
//   const fetchUserRegionAndHighlights = async () => {
//     try {
//       const res = await fetch('https://ipinfo.io?token=e22317b476e9fb');
//       const locationData = await res.json();
//       const region = locationData.region || 'Unknown';
//       setUserRegion(region);
//       setSearchTerm(region); // Set the user location as the initial value for the input field
//       fetchHighlights(region); // Fetch the highlights based on user's region
//     } catch (error) {
//       console.error("Error fetching user location:", error);
//       setError("Could not determine your location.");
//       setLoading(false);
//     }
//   };

// Get user's region and fetch default highlights based on location
const fetchUserRegionAndHighlights = useCallback(async () => {
    try {
      const res = await fetch('https://ipinfo.io?token=e22317b476e9fb');
      const locationData = await res.json();
      const region = locationData.region || 'Unknown';
      console.log(locationData,region,"the location data");
      
      setUserRegion(region);
      setSearchTerm(region); // Set the user location as the initial value for the input field
      fetchHighlights(region); // Fetch the highlights based on user's region
    } catch (error) {
      console.error("Error fetching user location:", error);
      setError("Could not determine your location.");
      setLoading(false);
    }
  }, []);
 
  // Handle search term input changes
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
 
    // Filter the list of regions based on the input value
    if (term === '') {
      setFilteredRegions(regions); // Show all regions if input is cleared
    } else {
      const filtered = regions.filter(region =>
        region.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredRegions(filtered); // Show only matching regions
    }
  };
 
  // Handle region selection from dropdown
  const handleSelectRegion = (region: string) => {
    setSearchTerm(region); // Update input with the selected region
    setDropdownVisible(false); // Hide dropdown after selection
    fetchHighlights(region); // Fetch highlights for the selected region
  };
 
  // Fetch regions on component mount
  useEffect(() => {
    fetchRegions();
    fetchUserRegionAndHighlights(); // Get user region and fetch highlights on load
  },[fetchUserRegionAndHighlights]);
 
  return (
    <div className="local-highlights px-6 py-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Regional Highlights</h2>
 
      {error && <p className="text-red-600 mb-4">{error}</p>}
 
      {/* Input with dropdown suggestion */}
      <div className="mb-4 relative">
        <label className="block mb-2 font-medium text-gray-700">Select or Enter a Region:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          onFocus={() => setDropdownVisible(true)} // Show dropdown when input is focused
          placeholder="Start typing a region..."
          className="p-2 border border-gray-300 rounded w-full"
        />
 
        {/* Display dropdown if there are filtered regions and input is focused */}
        {isDropdownVisible && filteredRegions.length > 0 && (
          <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
            {filteredRegions.map((region, index) => (
              <li
                key={index}
                onClick={() => handleSelectRegion(region)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {region}
              </li>
            ))}
          </ul>
        )}
      </div>
 
      {/* Display the regional highlights */}
      {regionHighlights && (
        <>
          <h3 className="text-lg font-semibold mb-2 text-purple-700">
            Highlights for {regionHighlights.region || userRegion}
          </h3>
 
          {regionHighlights.highlights.length === 0 && !loading && !error ? (
            <p className="text-gray-600">No local news or events available for this region.</p>
          ) : (
            <ul className="space-y-4">
              {regionHighlights.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded-md shadow-md hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-105"
                >
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
 
export default RegionalHighlights;