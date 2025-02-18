
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  GraduationCap, 
  PlayCircle, 
  Clock,
  BookOpen,
  Timer
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Learning = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      title: "Advanced Interview Preparation",
      duration: "2 hours",
      lessons: 12,
      progress: 75,
      category: "Career Development"
    },
    {
      title: "Technical Skills for Product Managers",
      duration: "4 hours",
      lessons: 24,
      progress: 30,
      category: "Product Management"
    },
    {
      title: "AI and Machine Learning Fundamentals",
      duration: "6 hours",
      lessons: 36,
      progress: 0,
      category: "Technology"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Dashboard>
        <div className="max-w-5xl mx-auto w-full space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Learning Hub</h1>
            <div className="flex gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <GraduationCap className="mr-2 h-4 w-4" />
                Browse All Courses
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-primary font-medium mb-1">
                      {course.category}
                    </div>
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <div className="flex items-center gap-4 text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                  <Button variant={course.progress > 0 ? "outline" : "default"}>
                    {course.progress > 0 ? (
                      <>
                        <Timer className="mr-2 h-4 w-4" />
                        Continue ({course.progress}%)
                      </>
                    ) : (
                      <>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Start Course
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Learning;
