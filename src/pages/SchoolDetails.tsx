
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Users, 
  Building, 
  MapPin, 
  Droplet, 
  Calendar, 
  FileText, 
  ArrowLeft,
  CheckCircle,
  Clock,
  X,
  Calendar as CalendarIcon,
  Info
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { getSchoolWithLocation, getSchoolWithTapConnection, getProjectsForSchool, getFeedbackForSchool, getActivitiesForSchool } from "@/lib/data";
import { School, Location, TapConnection, InfrastructureProject, Feedback, Activity } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type SchoolWithDetails = School & { 
  location?: Location; 
  tapConnection?: TapConnection;
};

const SchoolDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [school, setSchool] = useState<SchoolWithDetails | null>(null);
  const [projects, setProjects] = useState<InfrastructureProject[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSchoolData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const schoolWithLocation = getSchoolWithLocation(id);
        const schoolWithTap = getSchoolWithTapConnection(id);
        
        if (schoolWithLocation && schoolWithTap) {
          setSchool({
            ...schoolWithLocation,
            tapConnection: schoolWithTap.tapConnection
          });
          
          setProjects(getProjectsForSchool(id));
          setFeedback(getFeedbackForSchool(id));
          setActivities(getActivitiesForSchool(id));
        }
        
        setIsLoading(false);
      }, 500);
    };

    fetchSchoolData();
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout title="School Details">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!school) {
    return (
      <DashboardLayout title="School Details">
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">School not found.</p>
          <Button asChild variant="outline">
            <Link to="/schools">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Schools
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusIcon = (status: string) => {
    if (status.includes("Connected") || status.includes("Completed") || status.includes("Approved")) {
      return <CheckCircle className="h-5 w-5 text-status-connected" />;
    } else if (status.includes("Pending") || status.includes("In Progress")) {
      return <Clock className="h-5 w-5 text-status-pending" />;
    } else if (status.includes("Rejected") || status.includes("Cancelled")) {
      return <X className="h-5 w-5 text-status-rejected" />;
    } else {
      return <Info className="h-5 w-5 text-gray-400" />;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout title="School Details">
      <div className="mb-6 flex items-center">
        <Button asChild variant="ghost" className="mr-4">
          <Link to="/schools">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Schools
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{school.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-sm">
                <Building className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium">{school.category}</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm">
                <Users className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-gray-500">Students</p>
                  <p className="font-medium">{school.numberOfStudents}</p>
                </div>
              </div>
              
              <div className="flex items-center text-sm">
                <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-gray-500">Last Updated</p>
                  <p className="font-medium">{formatDate(school.updateDate)}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {school.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium">
                      {school.location.streetName}, {school.location.townName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {school.location.districtName}, {school.location.stateName}, {school.location.pincode}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center text-sm">
                <Droplet className="h-5 w-5 mr-3 text-gray-400" />
                <div>
                  <p className="text-gray-500">Tap Connection Status</p>
                  <div className="flex items-center">
                    <span className={`status-indicator status-${school.tapConnectionStatus.toLowerCase().replace(' ', '-')}`}></span>
                    <p className="font-medium">{school.tapConnectionStatus}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {school.tapConnection && (
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <CalendarIcon className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Connection Date</p>
                    <p className="font-medium">{formatDate(school.tapConnection.connectionDate)}</p>
                  </div>
                </div>
                
                {school.tapConnection.waterSourceType && (
                  <div className="flex items-center text-sm">
                    <Droplet className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="text-gray-500">Water Source</p>
                      <p className="font-medium">{school.tapConnection.waterSourceType}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center text-sm">
                  <FileText className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <p className="text-gray-500">Last Inspection</p>
                    <p className="font-medium">{formatDate(school.tapConnection.lastInspectionDate)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="projects" className="text-sm">
            Infrastructure Projects
          </TabsTrigger>
          <TabsTrigger value="feedback" className="text-sm">
            Feedback
          </TabsTrigger>
          <TabsTrigger value="activities" className="text-sm">
            Activities
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="mt-0">
          <div className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Infrastructure Projects</h3>
              
              {projects.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No projects found for this school.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 border-b">
                        <th className="pb-3 pl-4">Project Type</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Start Date</th>
                        <th className="pb-3 pr-4">Completion Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map(project => (
                        <tr key={project.id} className="border-b last:border-b-0 hover:bg-gray-50">
                          <td className="py-4 pl-4">{project.projectType}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              {getStatusIcon(project.status)}
                              <span className="ml-2">{project.status}</span>
                            </div>
                          </td>
                          <td className="py-4">{formatDate(project.startDate)}</td>
                          <td className="py-4 pr-4">{formatDate(project.completionDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-0">
          <div className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Feedback</h3>
              
              {feedback.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No feedback submitted for this school.</p>
              ) : (
                <div className="space-y-6">
                  {feedback.map(item => (
                    <div key={item.id} className="p-4 border border-gray-100 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={cn(
                                "text-lg",
                                i < item.rating ? "text-yellow-400" : "text-gray-300"
                              )}
                            >
                              ★
                            </span>
                          ))}
                          <span className="ml-2 text-sm text-gray-500">
                            Rating: {item.rating}/5
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(item.submittedDate)}
                        </span>
                      </div>
                      <p className="text-gray-700">{item.feedbackText}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activities" className="mt-0">
          <div className="bg-white rounded-lg shadow-soft border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Activity Timeline</h3>
              
              {activities.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No activities recorded for this school.</p>
              ) : (
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                  <ul className="space-y-6">
                    {activities.map(activity => (
                      <li key={activity.id} className="relative z-10">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20">
                            {getStatusIcon(activity.status || "")}
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">
                                {activity.type}
                              </p>
                              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100">
                                {formatDate(activity.date)}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {activity.description}
                            </p>
                            {activity.status && (
                              <p className="mt-1 text-xs text-gray-500">
                                Status: {activity.status}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SchoolDetails;
