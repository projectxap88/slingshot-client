
import { CheckCircle2, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export const UpcomingInterviews = () => {
  const interviews = [
    {
      company: "InnovateLabs",
      role: "Full Stack Developer",
      date: "Tomorrow, 2:00 PM",
      prepStatus: "ready"
    },
    {
      company: "TechVision",
      role: "Senior Engineer",
      date: "Feb 28, 11:00 AM",
      prepStatus: "pending"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium text-gray-500">UPCOMING INTERVIEWS</h3>
      </div>
      <div className="space-y-3">
        {interviews.map((interview, index) => (
          <motion.div
            key={`${interview.company}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <div className="p-4 bg-secondary/30 rounded-lg group-hover:bg-secondary/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-primary">{interview.company}</h4>
                <span className="text-sm text-gray-500">{interview.date}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{interview.role}</p>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className={`h-4 w-4 ${
                  interview.prepStatus === "ready" ? "text-primary" : "text-gray-400"
                }`} />
                <span className={interview.prepStatus === "ready" ? "text-primary" : "text-gray-500"}>
                  {interview.prepStatus === "ready" ? "Prep materials ready" : "Preparing materials..."}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
