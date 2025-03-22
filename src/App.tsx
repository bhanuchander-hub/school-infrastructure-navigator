
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Schools from "./pages/Schools";
import SchoolDetails from "./pages/SchoolDetails";
import TapConnections from "./pages/TapConnections";
import Map from "./pages/Map";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { initializeFirestore, ensureCollectionsExist } from "./lib/firestore";
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
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const { currentUser } = useAuth();
  
  useEffect(() => {
    // Initialize Firestore with mock data
    const initDb = async () => {
      try {
        // First ensure all collections exist
        await ensureCollectionsExist();
        
        // Then initialize with mock data if needed
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
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register />} />
      
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/schools" element={<ProtectedRoute><Schools /></ProtectedRoute>} />
      <Route path="/schools/:id" element={<ProtectedRoute><SchoolDetails /></ProtectedRoute>} />
      <Route path="/tap-connections" element={<ProtectedRoute><TapConnections /></ProtectedRoute>} />
      <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Create a new QueryClient instance inside the component
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
