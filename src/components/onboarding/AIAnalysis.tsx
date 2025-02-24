
import { motion } from "framer-motion";
import { Brain, Target, Sparkles } from "lucide-react";

interface AIAnalysisProps {
  userData: any;
}

export const AIAnalysis = ({ userData }: AIAnalysisProps) => {
  const analysisTasks = [
    {
      icon: Brain,
      title: "Analyzing Profile",
      description: "Understanding your professional background and goals",
    },
    {
      icon: Target,
      title: "Processing CV Data",
      description: "Extracting key information and achievements",
    },
    {
      icon: Sparkles,
      title: "Evaluating Skills",
      description: "Matching your expertise with market demands",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        {analysisTasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
            className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl"
          >
            <div className="p-3 bg-white rounded-lg">
              <task.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <motion.div
              className="ml-auto"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              <div className="h-2 w-2 bg-primary rounded-full" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="p-6 bg-white rounded-xl border"
      >
        <h3 className="font-medium mb-4">AI Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-lg">
            <h4 className="text-sm font-medium">Profile Strength</h4>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 1, delay: 2.5 }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/20 rounded-lg">
              <h4 className="text-sm font-medium">Skills Match</h4>
              <p className="text-2xl font-semibold mt-1">92%</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="text-sm font-medium">Market Relevance</h4>
              <p className="text-2xl font-semibold mt-1">88%</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
