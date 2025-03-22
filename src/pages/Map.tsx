
import DashboardLayout from "@/components/layout/DashboardLayout";
import MapView from "@/components/maps/MapView";
import { getSchoolsWithLocations } from "@/lib/data";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const Map = () => {
  const [schools, setSchools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      // Simulate API call with a delay
      setTimeout(() => {
        const schoolsData = getSchoolsWithLocations();
        setSchools(schoolsData);
        setIsLoading(false);
      }, 500);
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

      {isLoading ? (
        <div className="h-[600px] bg-white rounded-lg shadow-soft border border-gray-100 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-2 text-gray-600">Loading map data...</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden">
          <MapView schools={schools} height="600px" />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Map;
