import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Bell,
  UserCircle,
  Settings,
} from "lucide-react";
import { DashboardSidebar } from "./sidebar/DashboardSidebar";
import { NavigationSidebar } from "./sidebar/NavigationSidebar";
import { FloatingChat } from "./chat/FloatingChat";
import { motion } from "framer-motion";

interface DashboardProps {
  children: ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      <NavigationSidebar />
      
      <div className="flex-1 flex flex-col">
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center h-16 justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <img 
                    src="/lovable-uploads/c82971a4-b8bb-4499-8eb2-de40acc879d8.png" 
                    alt="Slingshot" 
                    className="h-8 w-8"
                  />
                  <span className="text-xl font-semibold text-gray-900">slingshot</span>
                </div>
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search jobs, skills, companies..."
                    className="pl-10 bg-gray-100 border-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 ">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-6 w-6 text-primary" />
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex gap-8">
            <div className="flex-1">
              {children}
            </div>
            <DashboardSidebar />
          </div>
        </main>

        <FloatingChat />
      </div>
    </div>
  );
};
