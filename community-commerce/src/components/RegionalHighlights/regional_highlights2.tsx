import React, { useEffect, useState } from "react";

const LocationFinder = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

  // Function to fetch location name based on latitude and longitude using Nominatim
  const fetchLocationName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      if (data.error) {
        setError("Could not determine the location name.");
        return;
      }
      const name = data.display_name || "Location not found";
      setLocationName(name);
    } catch (error) {
      console.error("Error fetching location name:", error);
      setError("Could not determine the location name.");
    }
  };

  // Get user's location using Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          fetchLocationName(latitude, longitude); // Fetch location name after getting coordinates
        },
        (error) => {
          console.error("Error getting location", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("Permission denied. Please enable location services.");
              setPermissionDenied(true);
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            default:
              setError("An error occurred while retrieving location.");
          }
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 10000, // Set timeout (in milliseconds)
          maximumAge: 0, // Disable cache
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation(); // Fetch user's location on component mount
  }, []);

  return (
    <div>
      <h2>User Location</h2>
      {error && <p className="text-red-600">{error}</p>}
      {permissionDenied && (
        <p>
          To access your location, please enable location services in your browser settings.
        </p>
      )}
      {location ? (
        <p>
          Latitude: {location.lat}, Longitude: {location.lon}, Location: {locationName}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default LocationFinder;
