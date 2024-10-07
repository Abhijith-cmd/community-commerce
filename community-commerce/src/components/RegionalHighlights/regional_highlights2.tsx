import React, { useEffect, useState } from 'react';

const Regional_Highlights2 = () => {
  //const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [userDistrict, setUserDistrict] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          //setLocation({ lat: latitude, lon: longitude });
          fetchUserDistrict(latitude, longitude); // Fetch district after getting coordinates
        },
        (error) => {
          console.error("Error getting location", error);
          setError("Unable to retrieve your location.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Fetch district from latitude and longitude
  const fetchUserDistrict = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      const district = data.address.district || data.address.county || "District not found";
      setUserDistrict(district);
    } catch (error) {
      console.error("Error fetching district:", error);
      setError("Could not determine your district.");
    }
  };

  useEffect(() => {
    getUserLocation(); // Fetch user's location on component mount
  }, []);

  return (
    <div>
      <h2>User District Finder</h2>
      {error && <p className="text-red-600">{error}</p>}
      {userDistrict ? (
        <p>User District: {userDistrict}</p>
      ) : (
        <p>Loading district...</p>
      )}
    </div>
  );
};

export default Regional_Highlights2;
