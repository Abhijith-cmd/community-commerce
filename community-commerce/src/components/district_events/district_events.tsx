import { useCallback, useEffect, useState } from "react";
 
interface Highlight {
  title: string;
  description: string;
  link: string;
  date:string
}
 
interface DistrictEvents {
  _id: string;
  district:string;
  city: string;
  highlights: Highlight[];
}
 
const District_Events = () => {
  //const [regions, setRegions] = useState<string[]>([]); // List of regions
  //const [searchTerm, setSearchTerm] = useState<string>(''); // The search input value
  //const [filteredRegions, setFilteredRegions] = useState<string[]>([]); // List of regions matching search term
  const [districtEvents, setDistrictEvents] = useState<DistrictEvents | null>(null); // Highlights for the selected region
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userDistrict, setUserDistrict] = useState<string>(''); // Default region based on user location
  //const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false); // To control dropdown visibility
 
//   // Fetch regions from the database
//   const fetchRegions = async () => {
//     try {
//       const res = await fetch('/api/regionRoutes');
//       if (!res.ok) {
//         throw new Error("Failed to fetch regions");
//       }
//       const data: string[] = await res.json();
//       setRegions(data);
//       setFilteredRegions(data); // Initially, show all regions in the dropdown
//     } catch (error) {
//       console.error('Error fetching regions:', error);
//       setError("Failed to fetch regions");
//     }
//   };
 
  // Fetch highlights based on the selected region
  const fetchHighlights = async (city: string) => {
    try {
      const res = await fetch(`/api/districtEvents?city=${city}`);
      if (!res.ok) {
        throw new Error("Failed to fetch highlights");
      }
      const data: DistrictEvents[] = await res.json();
      setDistrictEvents(data[0]);
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
const fetchUserDistrictAndHighlights = useCallback(async () => {
    try {
      const res = await fetch('https://ipinfo.io?token=e22317b476e9fb');
      const locationData = await res.json();
      const city = locationData.city || 'Unknown';
      setUserDistrict(city);
      //setSearchTerm(region); // Set the user location as the initial value for the input field
      fetchHighlights(city); // Fetch the highlights based on user's region
    } catch (error) {
      console.error("Error fetching user location:", error);
      setError("Could not determine your location.");
      setLoading(false);
    }
  }, []);
 
//   // Handle search term input changes
//   const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const term = event.target.value;
//     setSearchTerm(term);
 
//     // Filter the list of regions based on the input value
//     if (term === '') {
//       setFilteredRegions(regions); // Show all regions if input is cleared
//     } else {
//       const filtered = regions.filter(region =>
//         region.toLowerCase().includes(term.toLowerCase())
//       );
//       setFilteredRegions(filtered); // Show only matching regions
//     }
//   };
 
//   // Handle region selection from dropdown
//   const handleSelectRegion = (region: string) => {
//     setSearchTerm(region); // Update input with the selected region
//     setDropdownVisible(false); // Hide dropdown after selection
//     fetchHighlights(region); // Fetch highlights for the selected region
//   };
 
  // Fetch regions on component mount
  useEffect(() => {
    // fetchRegions();
    fetchUserDistrictAndHighlights(); // Get user region and fetch highlights on load
  },[fetchUserDistrictAndHighlights]);
 
  return (
    <div className="local-highlights px-6 py-4 bg-gradient-to-r from-orange-100 to-pink-700 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Major Events in your region</h2>
 
      {error && <p className="text-red-600 mb-4">{error}</p>}
 
 
 
      {/* Display the regional highlights */}
      {districtEvents && (
        <>
          <h3 className="text-lg font-semibold mb-2 text-green-700">
            Events in {districtEvents.district || userDistrict}
          </h3>
 
          {districtEvents.highlights.length === 0 && !loading && !error ? (
            <p className="text-gray-600">No local news or events available for this region.</p>
          ) : (
            <ul className="space-y-4">
              {districtEvents.highlights.map((highlight, index) => (
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
                    <p className="text-pink-700 text-lg">
                      {highlight.date}
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
 
export default District_Events;