import DashboardLayout from "@/components/layout/DashboardLayout";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const GOOGLE_MAPS_API_KEY = "AIzaSyC-YJ3ogAyNI4ZQkCQZhhTnKopOf8bCc0E"; // Replace with your API key
const MAP_CENTER = { lat: 20.5937, lng: 78.9629 }; // Default center (India)
const MAP_ZOOM = 5; // Default zoom level

const Map = () => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });
  const [schools, setSchools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/schools"); // Replace with actual API endpoint
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error("Error fetching school data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <DashboardLayout title="Map View">
      <div className="mb-8">
        <p className="text-gray-600 max-w-3xl">
          Geographical view of schools and their tap connection status across regions.
        </p>
      </div>

      {isLoading || !isLoaded ? (
        <div className="h-[600px] bg-white rounded-lg shadow-soft border border-gray-100 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-2 text-gray-600">Loading map data...</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden">
          <GoogleMap
            mapContainerStyle={{ height: "600px", width: "100%" }}
            center={MAP_CENTER}
            zoom={MAP_ZOOM}
          >
            {schools.map((school) => (
              <Marker
                key={school.id}
                position={{ lat: school.latitude, lng: school.longitude }}
                onClick={() => setSelectedSchool(school)}
                icon={{
                  url:
                    school.tap_connection_status === "Connected"
                      ? "/icons/green-marker.png"
                      : school.tap_connection_status === "Pending"
                      ? "/icons/red-marker.png"
                      : "/icons/gray-marker.png",
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ))}

            {selectedSchool && (
              <InfoWindow
                position={{ lat: selectedSchool.latitude, lng: selectedSchool.longitude }}
                onCloseClick={() => setSelectedSchool(null)}
              >
                <div className="text-sm">
                  <strong>{selectedSchool.school_name}</strong>
                  <p>Status: {selectedSchool.tap_connection_status}</p>
                  <p>Students: {selectedSchool.no_of_students}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Map;
