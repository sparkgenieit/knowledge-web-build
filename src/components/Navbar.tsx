
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GraduationCap, Menu, X, User, BookOpen, Settings, LogOut } from "lucide-react";

interface NavbarProps {
  user?: {
    name: string;
    role: 'student' | 'instructor' | 'admin';
  } | null;
  onLogout?: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (user?.role === 'student') navigate('/student-dashboard');
    else if (user?.role === 'instructor') navigate('/instructor-dashboard');
    else if (user?.role === 'admin') navigate('/admin-dashboard');
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">LearnHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">
              Browse Courses
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleDashboardClick}>
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/courses')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    My Courses
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              <Link
                to="/courses"
                className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Browse Courses
              </Link>
              {user ? (
                <>
                  <button
                    onClick={() => {
                      handleDashboardClick();
                      setIsOpen(false);
                    }}
                    className="px-3 py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onLogout?.();
                      setIsOpen(false);
                    }}
                    className="px-3 py-2 text-left text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-3">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
