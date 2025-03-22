
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, School, Droplet, MapPin, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const NavItem = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:bg-primary/10 group",
          isActive
            ? "text-primary font-medium"
            : "text-foreground/80 hover:text-primary"
        )
      }
      onClick={closeMenu}
    >
      <Icon className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
      <span className="text-sm">{children}</span>
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <NavLink to="/" className="flex items-center flex-shrink-0" onClick={closeMenu}>
                <Droplet className="h-8 w-8 text-primary animate-float" />
                <span className="ml-2 text-xl font-semibold text-gray-900">SIDP</span>
              </NavLink>
              
              <nav className="hidden md:ml-10 md:flex md:space-x-2">
                <NavItem to="/" icon={Home}>Dashboard</NavItem>
                <NavItem to="/schools" icon={School}>Schools</NavItem>
                <NavItem to="/tap-connections" icon={Droplet}>Tap Connections</NavItem>
                <NavItem to="/map" icon={MapPin}>Map View</NavItem>
              </nav>
            </div>

            <button
              className="md:hidden flex items-center p-2 rounded-md text-gray-500 hover:text-primary focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isOpen ? "animate-scale-in" : "hidden"
          } md:hidden bg-white shadow-xl rounded-b-lg m-2`}
        >
          <div className="pt-2 pb-3 space-y-1 px-2">
            <NavItem to="/" icon={Home}>Dashboard</NavItem>
            <NavItem to="/schools" icon={School}>Schools</NavItem>
            <NavItem to="/tap-connections" icon={Droplet}>Tap Connections</NavItem>
            <NavItem to="/map" icon={MapPin}>Map View</NavItem>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
