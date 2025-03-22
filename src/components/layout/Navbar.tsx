
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Home, 
  School, 
  Droplet, 
  Map, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus,
  UserRound 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
    { path: "/schools", label: "Schools", icon: <School className="w-4 h-4" /> },
    { path: "/tap-connections", label: "Tap Connections", icon: <Droplet className="w-4 h-4" /> },
    { path: "/map", label: "Map", icon: <Map className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getInitials = (email: string | null) => {
    if (!email) return "U";
    const parts = email.split("@");
    return parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Droplet className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">SIDP</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || "User"} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(currentUser.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    Signed in as<br />
                    <span className="font-medium">{currentUser.email}</span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/schools" className="cursor-pointer flex w-full">
                      <School className="mr-2 h-4 w-4" />
                      <span>My Schools</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavigationMenu className="hidden sm:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/login">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <LogIn className="h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/register">
                      <Button size="sm" className="gap-1">
                        <UserPlus className="h-4 w-4" />
                        Register
                      </Button>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="sm:hidden border-t">
        <div className={`grid ${currentUser ? 'grid-cols-4' : 'grid-cols-5'} gap-1`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </Link>
          ))}
          {!currentUser && (
            <Link
              to="/login"
              className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
                isActive("/login")
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              <UserRound className="w-4 h-4" />
              <span className="mt-1">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
