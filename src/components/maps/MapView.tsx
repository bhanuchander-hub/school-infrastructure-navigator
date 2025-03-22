
import { useEffect, useRef, useState } from "react";
import { School, TapConnectionStatus } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface MapViewProps {
  schools: (School & { location: any })[];
  height?: string;
}

interface MarkerData {
  lat: number;
  lng: number;
  status: TapConnectionStatus;
  name: string;
  id: string;
}

// Using a temporary dummy component for now that simulates a map
// In a real application, use a proper map library here
const MapView = ({ schools, height = "600px" }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  useEffect(() => {
    // Process schools data into markers
    const markerData = schools
      .filter(school => school.location && school.location.latitude && school.location.longitude)
      .map(school => ({
        lat: school.location.latitude,
        lng: school.location.longitude,
        status: school.tapConnectionStatus,
        name: school.name,
        id: school.id
      }));
    
    setMarkers(markerData);
    
    // Simulate loading a real map
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [schools]);

  const getStatusClass = (status: TapConnectionStatus) => {
    switch (status) {
      case "Connected":
        return "map-marker-connected";
      case "Pending":
        return "map-marker-pending";
      case "Rejected":
        return "map-marker-rejected";
      case "Not Required":
        return "map-marker-not-required";
      default:
        return "";
    }
  };

  const handleMarkerClick = (id: string) => {
    const school = schools.find(s => s.id === id) || null;
    setSelectedSchool(school);
  };

  return (
    <div className="relative rounded-lg overflow-hidden" style={{ height }}>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-2 text-gray-600">Loading map...</span>
        </div>
      ) : (
        <>
          <div 
            ref={mapRef} 
            className="w-full h-full bg-gray-100 relative"
            style={{
              backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=20.5937,78.9629&zoom=4&size=800x600&scale=2&maptype=roadmap&style=feature:all|element:labels|visibility:off&key=YOUR_KEY_HERE')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            {/* Simulated markers */}
            {markers.map((marker, index) => (
              <div
                key={index}
                className={`map-marker ${getStatusClass(marker.status)} cursor-pointer absolute animate-float`}
                style={{
                  top: `${(100 - ((marker.lat - 8) / 20) * 100)}%`,
                  left: `${((marker.lng - 68) / 20) * 100}%`,
                }}
                onClick={() => handleMarkerClick(marker.id)}
              >
                <span className="w-1 h-1 bg-white rounded-full"></span>
              </div>
            ))}
            
            {/* Map overlay gradient */}
            <div className="absolute inset-0 bg-gradient-map opacity-10 pointer-events-none"></div>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 p-4 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-lg shadow-soft">
            <h3 className="text-sm font-medium mb-2">Tap Connection Status</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="status-indicator status-connected"></span>
                <span className="text-xs">Connected</span>
              </div>
              <div className="flex items-center">
                <span className="status-indicator status-pending"></span>
                <span className="text-xs">Pending</span>
              </div>
              <div className="flex items-center">
                <span className="status-indicator status-rejected"></span>
                <span className="text-xs">Rejected</span>
              </div>
              <div className="flex items-center">
                <span className="status-indicator status-not-required"></span>
                <span className="text-xs">Not Required</span>
              </div>
            </div>
          </div>
          
          {/* Selected school info */}
          {selectedSchool && (
            <div className="absolute top-4 right-4 p-4 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-lg shadow-soft max-w-xs">
              <button 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedSchool(null)}
              >
                ×
              </button>
              <h3 className="text-sm font-medium mb-2">{selectedSchool.name}</h3>
              <div className="space-y-1 text-xs">
                <p>
                  <span className="text-gray-500">Status: </span>
                  <span className={`font-medium ${
                    selectedSchool.tapConnectionStatus === "Connected" ? "text-status-connected" :
                    selectedSchool.tapConnectionStatus === "Pending" ? "text-status-pending" :
                    selectedSchool.tapConnectionStatus === "Rejected" ? "text-status-rejected" :
                    "text-status-notRequired"
                  }`}>
                    {selectedSchool.tapConnectionStatus}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Students: </span>
                  <span>{selectedSchool.numberOfStudents}</span>
                </p>
                <p>
                  <span className="text-gray-500">Category: </span>
                  <span>{selectedSchool.category}</span>
                </p>
                {selectedSchool.location && (
                  <p>
                    <span className="text-gray-500">Location: </span>
                    <span>{selectedSchool.location.townName}, {selectedSchool.location.districtName}, {selectedSchool.location.stateName}</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MapView;
