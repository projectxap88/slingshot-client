
import { AiAssistant } from "./AiAssistant";
import { UpcomingInterviews } from "./UpcomingInterviews";
import { motion } from "framer-motion";

export const DashboardSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-96 border-l pl-8 bg-white/50 backdrop-blur-sm"
    >
      <div className="sticky top-4 space-y-8 py-4">
        <AiAssistant />
        <UpcomingInterviews />
      </div>
    </motion.div>
  );
};
