
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusChart from "@/components/dashboard/StatusChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { School, Droplet, CheckCircle, Clock, X, BarChart3 } from "lucide-react";
import { getDashboardStats, getConnectionStatusCounts, recentActivities } from "@/lib/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const stats = getDashboardStats();
  const connectionStatusCounts = getConnectionStatusCounts();

  return (
    <DashboardLayout title="Dashboard">
      <div className="mb-6">
        <p className="text-gray-600 max-w-3xl">
          Welcome to the School Infrastructure Development Programme Management System. 
          Monitor and manage tap connections and infrastructure development across schools.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Schools"
          value={stats.totalSchools}
          icon={<School className="h-6 w-6 text-primary" />}
          description="Registered in the system"
        />
        <StatCard
          title="Connected Taps"
          value={stats.connectedTaps}
          icon={<CheckCircle className="h-6 w-6 text-status-connected" />}
          description={`${Math.round((stats.connectedTaps / stats.totalSchools) * 100)}% of all schools`}
        />
        <StatCard
          title="Pending Connections"
          value={stats.pendingTaps}
          icon={<Clock className="h-6 w-6 text-status-pending" />}
          description="Awaiting installation"
        />
        <StatCard
          title="Completed Projects"
          value={stats.completedProjects}
          icon={<BarChart3 className="h-6 w-6 text-status-connected" />}
          description={`${Math.round((stats.completedProjects / stats.totalProjects) * 100)}% completion rate`}
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button asChild className="group">
          <Link to="/schools">
            <School className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            View Schools
          </Link>
        </Button>
        <Button asChild variant="outline" className="group">
          <Link to="/tap-connections">
            <Droplet className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Manage Tap Connections
          </Link>
        </Button>
        <Button asChild variant="secondary" className="group">
          <Link to="/map">
            <School className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Open Map View
          </Link>
        </Button>
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          <StatusChart 
            data={connectionStatusCounts} 
            title="Tap Connection Status" 
          />
        </div>
        <div className="h-full">
          <RecentActivity activities={recentActivities.slice(0, 5)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
