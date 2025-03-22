
import { Activity } from "@/lib/types";
import { Calendar, Droplet, FileText, MessageSquare, ClipboardList } from "lucide-react";

interface RecentActivityProps {
  activities: Activity[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "Registration":
      return <ClipboardList className="h-4 w-4" />;
    case "Connection":
      return <Droplet className="h-4 w-4" />;
    case "Inspection":
      return <FileText className="h-4 w-4" />;
    case "Project":
      return <Calendar className="h-4 w-4" />;
    case "Feedback":
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  if (status?.includes("Connected") || status?.includes("Completed") || status?.includes("Approved")) {
    return "bg-status-connected text-status-connected";
  } else if (status?.includes("Pending") || status?.includes("In Progress")) {
    return "bg-status-pending text-status-pending";
  } else if (status?.includes("Rejected") || status?.includes("Cancelled")) {
    return "bg-status-rejected text-status-rejected";
  } else {
    return "bg-gray-200 text-gray-700";
  }
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  // Format date to "Month Day, Year" format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-100 h-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-6">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent activities</p>
        ) : (
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200 z-0"></div>
            <ul className="space-y-6 relative z-10">
              {activities.map((activity) => (
                <li key={activity.id} className="animate-fade-in">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status || "")} bg-opacity-10 border`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                        <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <div className="mt-1 flex items-center">
                        <p className="text-xs text-gray-500">{activity.schoolName}</p>
                        {activity.status && (
                          <span className={`ml-auto text-xs font-medium ${getStatusColor(activity.status).split(" ")[1]}`}>
                            {activity.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
