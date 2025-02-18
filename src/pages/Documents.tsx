
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  FileText, 
  Upload,
  Clock,
  File,
  MoreVertical,
  Download
} from "lucide-react";
import { motion } from "framer-motion";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const documents = [
    {
      name: "Technical Resume - Updated",
      type: "Resume",
      lastModified: "2 hours ago",
      size: "245 KB"
    },
    {
      name: "Cover Letter - Product Manager",
      type: "Cover Letter",
      lastModified: "1 day ago",
      size: "125 KB"
    },
    {
      name: "Portfolio Presentation",
      type: "Presentation",
      lastModified: "3 days ago",
      size: "4.2 MB"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Dashboard>
        <div className="max-w-5xl mx-auto w-full space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Documents</h1>
            <div className="flex gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {documents.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{doc.name}</h3>
                      <div className="flex items-center gap-4 text-gray-600 mt-2">
                        <div className="flex items-center gap-1">
                          <File className="h-4 w-4" />
                          <span>{doc.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Modified {doc.lastModified}</span>
                        </div>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Documents;
