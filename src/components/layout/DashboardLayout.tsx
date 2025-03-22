
import { useEffect } from "react";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  // Update document title when the component mounts or title changes
  useEffect(() => {
    document.title = `SIDP - ${title}`;
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <div className="h-1 w-20 bg-primary mt-2 rounded-full"></div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
