
import { School } from "@/lib/types";
import { MapPin, Users, Droplet } from "lucide-react";
import { Link } from "react-router-dom";

interface SchoolCardProps {
  school: School & { location?: any };
}

const SchoolCard = ({ school }: SchoolCardProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Connected":
        return "status-connected";
      case "Pending":
        return "status-pending";
      case "Rejected":
        return "status-rejected";
      case "Not Required":
        return "status-not-required";
      default:
        return "";
    }
  };

  return (
    <Link 
      to={`/schools/${school.id}`}
      className="block bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{school.name}</h3>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full bg-opacity-10 border ${getStatusClass(school.tapConnectionStatus)}`}>
            <Droplet className="h-4 w-4" />
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span>{school.numberOfStudents} Students</span>
            <span className="ml-3 px-2 py-0.5 text-xs rounded-full bg-gray-100">
              {school.category}
            </span>
          </div>
          
          {school.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span className="truncate">{school.location.townName}, {school.location.districtName}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="flex items-center">
              <span className={`status-indicator ${getStatusClass(school.tapConnectionStatus)}`}></span>
              <span>{school.tapConnectionStatus}</span>
            </div>
            <span className="text-xs text-gray-500">
              Updated: {new Date(school.updateDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SchoolCard;
