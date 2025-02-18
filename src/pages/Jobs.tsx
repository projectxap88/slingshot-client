
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, Building2, MapPin, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$150,000 - $180,000",
      type: "Full-time",
      description: "Join our innovative team building next-generation software solutions...",
      match: "95%"
    },
    {
      title: "Product Manager",
      company: "InnovateLabs",
      location: "New York, NY",
      salary: "$130,000 - $160,000",
      type: "Full-time",
      description: "Lead product strategy and development for our AI-powered platform...",
      match: "92%"
    },
    {
      title: "Full Stack Developer",
      company: "StartupX",
      location: "Remote",
      salary: "$120,000 - $150,000",
      type: "Full-time",
      description: "Build and maintain scalable web applications using modern technologies...",
      match: "88%"
    }
  ];

  return (
    <Dashboard>
      <div className="max-w-5xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Job Search</h1>
          <div className="flex gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Briefcase className="mr-2 h-4 w-4" />
              Post a Job
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Building2 className="h-4 w-4" />
                    <span>{job.company}</span>
                    <span>•</span>
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                    <span>•</span>
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-primary font-medium">{job.match} match</div>
                  <Button>Apply Now</Button>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{job.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default Jobs;
