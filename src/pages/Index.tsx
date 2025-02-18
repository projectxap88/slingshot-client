
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Users,
  FileText,
  TrendingUp,
  Zap,
} from "lucide-react";

const Index = () => {
  const stats = [
    {
      icon: Briefcase,
      label: "Job Applications",
      value: "12",
      change: "+3 this week",
      trend: "up"
    },
    {
      icon: GraduationCap,
      label: "Courses Completed",
      value: "4",
      change: "+1 this month",
      trend: "up"
    },
    {
      icon: Users,
      label: "Network Growth",
      value: "247",
      change: "+15 this week",
      trend: "up"
    },
    {
      icon: FileText,
      label: "Documents Updated",
      value: "8",
      change: "Last updated 2d ago",
      trend: "neutral"
    }
  ];

  const quickActions = [
    {
      icon: Zap,
      label: "Quick Apply",
      description: "Apply to matched jobs with one click"
    },
    {
      icon: TrendingUp,
      label: "Skill Assessment",
      description: "Take a quick assessment to showcase your skills"
    }
  ];

  return (
    <Dashboard>
      <div className="max-w-5xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-600">Here's what's happening with your job search</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-semibold">{stat.value}</span>
                <span className={`text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-gray-600"
                }`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <action.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{action.label}</h3>
                  <p className="text-gray-600 mt-1">{action.description}</p>
                  <Button className="mt-4">Get Started</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
