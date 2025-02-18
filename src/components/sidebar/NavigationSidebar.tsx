import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Users,
  FileText,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", path: "/" },
  { icon: Briefcase, label: "Job Search", id: "jobs", path: "/jobs" },
  { icon: GraduationCap, label: "Learning", id: "learning", path: "/learning" },
  { icon: Users, label: "Network", id: "network", path: "/network" },
  { icon: FileText, label: "Documents", id: "documents", path: "/documents" },
  { icon: Settings, label: "Settings", id: "settings", path: "/settings" },
];

export const NavigationSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const activeItem = navItems.find(item => item.path === location.pathname)?.id || "dashboard";

  return (
    <motion.div
      initial={{ width: 240 }}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="h-screen bg-white border-r sticky top-0 z-40"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <img 
                src="/lovable-uploads/c82971a4-b8bb-4499-8eb2-de40acc879d8.png" 
                alt="Slingshot" 
                className="h-8 w-8"
              />
              <span className="text-xl font-semibold text-gray-900">slingshot</span>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="shrink-0 hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.id} to={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start transition-all duration-200 ${
                  activeItem === item.id
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-2"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
