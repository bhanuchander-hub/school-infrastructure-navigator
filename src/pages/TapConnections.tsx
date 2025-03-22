
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronDown, ArrowUpDown, School as SchoolIcon, MapPin, Droplet } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { tapConnections, schools, locations } from "@/lib/data";
import { TapConnection, TapConnectionStatus, WaterSourceType, School } from "@/lib/types";

// Define a simpler type for the school in EnhancedTapConnection
// that only includes the properties we need
interface SimplifiedSchool {
  id: string;
  name: string;
  location: {
    townName: string;
    districtName: string;
  };
}

// Enhanced tap connection with simplified school information
type EnhancedTapConnection = Omit<TapConnection, 'school'> & {
  school: SimplifiedSchool;
};

const TapConnections = () => {
  const [connections, setConnections] = useState<EnhancedTapConnection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConnections, setFilteredConnections] = useState<EnhancedTapConnection[]>([]);
  const [statusFilter, setStatusFilter] = useState<TapConnectionStatus[]>([]);
  const [sourceFilter, setSourceFilter] = useState<WaterSourceType[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof EnhancedTapConnection | "school.name" | "school.location.townName";
    direction: "asc" | "desc";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      setIsLoading(true);
      // Simulate API call with a delay
      setTimeout(() => {
        // Combine tap connections with school and location data
        const enhancedConnections: EnhancedTapConnection[] = tapConnections.map(connection => {
          const school = schools.find(s => s.id === connection.schoolId);
          const location = locations.find(l => l.id === school?.locationId);
          
          return {
            ...connection,
            school: {
              id: school?.id || "",
              name: school?.name || "",
              location: {
                townName: location?.townName || "",
                districtName: location?.districtName || ""
              }
            }
          };
        });
        
        setConnections(enhancedConnections);
        setFilteredConnections(enhancedConnections);
        setIsLoading(false);
      }, 500);
    };

    fetchConnections();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = connections;

      // Apply search filter
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(
          connection =>
            connection.school.name.toLowerCase().includes(lowerCaseQuery) ||
            connection.school.location.townName.toLowerCase().includes(lowerCaseQuery) ||
            connection.school.location.districtName.toLowerCase().includes(lowerCaseQuery)
        );
      }

      // Apply status filter
      if (statusFilter.length > 0) {
        filtered = filtered.filter(connection =>
          statusFilter.includes(connection.status)
        );
      }

      // Apply source filter
      if (sourceFilter.length > 0) {
        filtered = filtered.filter(connection =>
          connection.waterSourceType && sourceFilter.includes(connection.waterSourceType)
        );
      }

      // Apply sorting
      if (sortConfig) {
        filtered.sort((a, b) => {
          let valueA: any;
          let valueB: any;
          
          // Handle nested properties
          if (sortConfig.key === "school.name") {
            valueA = a.school.name;
            valueB = b.school.name;
          } else if (sortConfig.key === "school.location.townName") {
            valueA = a.school.location.townName;
            valueB = b.school.location.townName;
          } else {
            valueA = a[sortConfig.key];
            valueB = b[sortConfig.key];
          }
          
          // Handle null values
          if (valueA === null) return sortConfig.direction === "asc" ? -1 : 1;
          if (valueB === null) return sortConfig.direction === "asc" ? 1 : -1;
          
          // Sort based on direction
          if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
          if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        });
      }

      setFilteredConnections(filtered);
    };

    applyFilters();
  }, [searchQuery, statusFilter, sourceFilter, sortConfig, connections]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (status: TapConnectionStatus) => {
    setStatusFilter(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleSourceFilterChange = (source: WaterSourceType) => {
    setSourceFilter(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter([]);
    setSourceFilter([]);
    setSortConfig(null);
  };

  const handleSort = (key: keyof EnhancedTapConnection | "school.name" | "school.location.townName") => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    
    setSortConfig({ key, direction });
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <DashboardLayout title="Tap Connections">
      <div className="mb-8">
        <p className="text-gray-600 max-w-3xl">
          Manage tap water connections for schools in the infrastructure development programme.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search by school name or location"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Status
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("Connected")}
                onCheckedChange={() => handleStatusFilterChange("Connected")}
              >
                Connected
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("Pending")}
                onCheckedChange={() => handleStatusFilterChange("Pending")}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("Rejected")}
                onCheckedChange={() => handleStatusFilterChange("Rejected")}
              >
                Rejected
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("Not Required")}
                onCheckedChange={() => handleStatusFilterChange("Not Required")}
              >
                Not Required
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Source
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuCheckboxItem
                checked={sourceFilter.includes("Borewell")}
                onCheckedChange={() => handleSourceFilterChange("Borewell")}
              >
                Borewell
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sourceFilter.includes("Municipality")}
                onCheckedChange={() => handleSourceFilterChange("Municipality")}
              >
                Municipality
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sourceFilter.includes("Hand Pump")}
                onCheckedChange={() => handleSourceFilterChange("Hand Pump")}
              >
                Hand Pump
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {(searchQuery || statusFilter.length > 0 || sourceFilter.length > 0 || sortConfig) && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Connection Table */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden animate-pulse">
          <div className="h-12 bg-gray-100"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-50 border-t border-gray-100"></div>
          ))}
        </div>
      ) : filteredConnections.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-soft border border-gray-100">
          <p className="text-gray-500 mb-4">No tap connections found matching your criteria.</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="px-6 py-3 font-medium">
                    <button 
                      className="flex items-center" 
                      onClick={() => handleSort("school.name")}
                    >
                      School
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-6 py-3 font-medium">
                    <button 
                      className="flex items-center" 
                      onClick={() => handleSort("school.location.townName")}
                    >
                      Location
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-6 py-3 font-medium">
                    <button 
                      className="flex items-center" 
                      onClick={() => handleSort("status")}
                    >
                      Status
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-6 py-3 font-medium">
                    <button 
                      className="flex items-center" 
                      onClick={() => handleSort("waterSourceType")}
                    >
                      Water Source
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-6 py-3 font-medium">
                    <button 
                      className="flex items-center" 
                      onClick={() => handleSort("connectionDate")}
                    >
                      Connection Date
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                  <th className="px-6 py-3 font-medium">
                    <button 
                      className="flex items-center" 
                      onClick={() => handleSort("lastInspectionDate")}
                    >
                      Last Inspection
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredConnections.map(connection => (
                  <tr 
                    key={connection.id} 
                    className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link 
                        to={`/schools/${connection.school.id}`}
                        className="flex items-center text-primary hover:underline"
                      >
                        <SchoolIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {connection.school.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {connection.school.location.townName}, {connection.school.location.districtName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className={`status-indicator status-${connection.status.toLowerCase().replace(' ', '-')}`}></span>
                        {connection.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {connection.waterSourceType ? (
                          <>
                            <Droplet className="h-4 w-4 mr-2 text-gray-400" />
                            {connection.waterSourceType}
                          </>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{formatDate(connection.connectionDate)}</td>
                    <td className="px-6 py-4">{formatDate(connection.lastInspectionDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TapConnections;
