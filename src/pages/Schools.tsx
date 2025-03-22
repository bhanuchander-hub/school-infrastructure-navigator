
import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SchoolCard from "@/components/schools/SchoolCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSchoolsWithLocations } from "@/lib/data";
import { School, TapConnectionStatus, SchoolCategory } from "@/lib/types";

const Schools = () => {
  const [schools, setSchools] = useState<(School & { location: any })[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchools, setFilteredSchools] = useState<(School & { location: any })[]>([]);
  const [statusFilter, setStatusFilter] = useState<TapConnectionStatus[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<SchoolCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoading(true);
      // Simulate API call with a delay
      setTimeout(() => {
        const schoolsData = getSchoolsWithLocations();
        setSchools(schoolsData);
        setFilteredSchools(schoolsData);
        setIsLoading(false);
      }, 500);
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = schools;

      // Apply search filter
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(
          school =>
            school.name.toLowerCase().includes(lowerCaseQuery) ||
            school.location.townName.toLowerCase().includes(lowerCaseQuery) ||
            school.location.districtName.toLowerCase().includes(lowerCaseQuery)
        );
      }

      // Apply status filter
      if (statusFilter.length > 0) {
        filtered = filtered.filter(school =>
          statusFilter.includes(school.tapConnectionStatus)
        );
      }

      // Apply category filter
      if (categoryFilter.length > 0) {
        filtered = filtered.filter(school =>
          categoryFilter.includes(school.category)
        );
      }

      setFilteredSchools(filtered);
    };

    applyFilters();
  }, [searchQuery, statusFilter, categoryFilter, schools]);

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

  const handleCategoryFilterChange = (category: SchoolCategory) => {
    setCategoryFilter(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter([]);
    setCategoryFilter([]);
  };

  return (
    <DashboardLayout title="Schools">
      <div className="mb-8">
        <p className="text-gray-600 max-w-3xl">
          View and manage all schools registered in the School Infrastructure Development Programme.
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
                Category
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuCheckboxItem
                checked={categoryFilter.includes("Primary")}
                onCheckedChange={() => handleCategoryFilterChange("Primary")}
              >
                Primary
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={categoryFilter.includes("Secondary")}
                onCheckedChange={() => handleCategoryFilterChange("Secondary")}
              >
                Secondary
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={categoryFilter.includes("Higher Secondary")}
                onCheckedChange={() => handleCategoryFilterChange("Higher Secondary")}
              >
                Higher Secondary
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {(searchQuery || statusFilter.length > 0 || categoryFilter.length > 0) && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* School Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-48"></div>
          ))}
        </div>
      ) : filteredSchools.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No schools found matching your criteria.</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map(school => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Schools;
