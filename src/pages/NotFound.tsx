
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full text-center p-8">
        <div className="relative">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <p className="text-2xl font-semibold text-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Page Not Found
          </p>
        </div>
        
        <p className="mt-6 text-lg text-muted-foreground">
          We couldn't find the page you were looking for.
        </p>
        
        <div className="mt-8">
          <Button asChild size="lg" className="animate-float">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
