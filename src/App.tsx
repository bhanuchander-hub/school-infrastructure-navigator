
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Schools from "./pages/Schools";
import SchoolDetails from "./pages/SchoolDetails";
import TapConnections from "./pages/TapConnections";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";
import { initializeFirestore } from "./lib/firestore";
import { 
  schools, 
  locations, 
  tapConnections, 
  infrastructureProjects, 
  registrations, 
  feedbacks, 
  recentActivities 
} from "./lib/data";
import { toast } from "./hooks/use-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  useEffect(() => {
    // Initialize Firestore with mock data
    const initDb = async () => {
      try {
        await initializeFirestore({
          locations,
          schools,
          tapConnections,
          infrastructureProjects,
          registrations,
          feedbacks,
          recentActivities
        });
      } catch (error) {
        console.error("Failed to initialize Firestore:", error);
        toast({
          title: "Database Error",
          description: "Failed to initialize the database. Some features may not work properly.",
          variant: "destructive",
        });
      }
    };

    initDb();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/schools/:id" element={<SchoolDetails />} />
            <Route path="/tap-connections" element={<TapConnections />} />
            <Route path="/map" element={<Map />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
