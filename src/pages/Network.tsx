
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Users, 
  MessageSquare, 
  UserPlus,
  Building2,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

const Network = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const connections = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechCorp",
      location: "San Francisco, CA",
      mutualConnections: 15,
      status: "Open to opportunities"
    },
    {
      name: "Michael Johnson",
      role: "Senior Software Engineer at InnovateLabs",
      location: "New York, NY",
      mutualConnections: 23,
      status: "Recently changed jobs"
    },
    {
      name: "Emily Davis",
      role: "Technical Recruiter at StartupX",
      location: "Remote",
      mutualConnections: 8,
      status: "Hiring"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Dashboard>
        <div className="max-w-5xl mx-auto w-full space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Professional Network</h1>
            <div className="flex gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search network..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Grow Network
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {connections.map((connection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{connection.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Building2 className="h-4 w-4" />
                      <span>{connection.role}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{connection.location}</span>
                      <span>•</span>
                      <Users className="h-4 w-4" />
                      <span>{connection.mutualConnections} mutual connections</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                    {connection.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Network;
